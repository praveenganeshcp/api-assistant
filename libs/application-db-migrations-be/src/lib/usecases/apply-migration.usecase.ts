import { Usecase } from '@api-assistant/commons-be';
import { dbConfig } from '@api-assistant/configuration-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ObjectId } from 'mongodb';
import { config, database, status, up } from 'migrate-mongo';
import { buildMigrationConfig } from '../utils';
import { applicationDbName } from '@api-assistant/applications-crud-engine-core';

interface ApplyMigrationUsecaseInput {
  applicationId: ObjectId;
}

@Injectable()
export class ApplyMigrationUsecase
  implements Usecase<ApplyMigrationUsecaseInput, void>
{
  private readonly logger = new Logger(ApplyMigrationUsecase.name);

  constructor(
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  async execute(data: ApplyMigrationUsecaseInput): Promise<void> {
    this.logger.log('applying migration');
    const migrationConfig = buildMigrationConfig({
      dbName: applicationDbName(data.applicationId),
      dbUrl: this.databaseConfig.DB_URL,
      applicationId: data.applicationId,
    });
    config.set(migrationConfig);
    this.logger.log('migration config ready');
    const { db, client } = await database.connect();
    this.logger.log('connected to db');
    await up(db, client);
    this.logger.log('migration applied');
    const migrationStatus = await status(db);
    migrationStatus.forEach(({ fileName, appliedAt }) =>
      this.logger.log(fileName + ':' + appliedAt)
    );
    client.close();
    this.logger.log('db connection closed');
    return;
  }
}
