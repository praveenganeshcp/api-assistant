import { Usecase } from '@api-assistant/commons-be';
import { dbConfig } from '@api-assistant/configuration-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ObjectId } from 'mongodb';
import { config, database, status, down } from 'migrate-mongo';
import { buildMigrationConfig } from '../utils';
import { applicationDbName } from '@api-assistant/applications-crud-engine-core';

interface RevertMigrationUsecaseInput {
  applicationId: ObjectId;
}

@Injectable()
export class RevertMigrationUsecase
  implements Usecase<RevertMigrationUsecaseInput, void>
{
  private readonly logger = new Logger(RevertMigrationUsecase.name);

  constructor(
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  async execute(data: RevertMigrationUsecaseInput): Promise<void> {
    this.logger.log('reverting migration');
    const migrationConfig = buildMigrationConfig({
      dbName: applicationDbName(data.applicationId),
      dbUrl: this.databaseConfig.DB_URL,
      applicationId: data.applicationId,
    });
    config.set(migrationConfig);
    this.logger.log('migration config ready');
    const { db, client } = await database.connect();
    this.logger.log('connected to db');
    await down(db, client);
    this.logger.log('migration reverted');
    const migrationStatus = await status(db);
    migrationStatus.forEach(({ fileName, appliedAt }) =>
      this.logger.log(fileName + ':' + appliedAt)
    );
    client.close();
    this.logger.log('db connection closed');
    return;
  }
}
