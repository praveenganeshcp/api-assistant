import { Usecase } from '@api-assistant/commons-be';
import { CRUD_DB_CONNECTION } from '@api-assistant/application-crud-engine-be';
import { applicationDbName } from '@api-assistant/crud-engine-core';
import {
  ApplicationMigration,
  applicationMigrationFolder,
  MIGRATIONS_COLLECTION,
} from '@api-assistant/application-migrations-core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { readdir } from 'fs/promises';

interface FetchApplicationMigrationsUsecaseInput {
  applicationId: ObjectId;
}

@Injectable()
export class FetchApplicationMigrationsUsecase
  implements
    Usecase<FetchApplicationMigrationsUsecaseInput, ApplicationMigration[]>
{
  private readonly logger = new Logger(FetchApplicationMigrationsUsecase.name);

  constructor(
    @Inject(CRUD_DB_CONNECTION) private readonly connection: MongoClient
  ) {}

  async execute(
    data: FetchApplicationMigrationsUsecaseInput
  ): Promise<ApplicationMigration[]> {
    this.logger.log('fetching migrations');
    const appDb = this.connection.db(applicationDbName(data.applicationId));
    this.logger.log('connected to app db');
    const migrationsCollection = appDb.collection(MIGRATIONS_COLLECTION);
    const appliedMigrationsFromDb = (await migrationsCollection
      .find({})
      .toArray()) as unknown as ApplicationMigration[];
    this.logger.log('found migrations from db', appliedMigrationsFromDb);
    const allMigrationsFileNames: string[] = await readdir(
      applicationMigrationFolder(data.applicationId)
    );
    this.logger.log('migration file names', allMigrationsFileNames);
    const migrationsResponse: ApplicationMigration[] =
      allMigrationsFileNames.map((migrationFileName) => {
        const appliedMigration = appliedMigrationsFromDb.find(
          (migration) => migration.fileName === migrationFileName
        );
        const migration: ApplicationMigration = {
          fileName: migrationFileName,
          status: appliedMigration ? 'APPLIED' : 'PENDING',
          appliedAt: appliedMigration ? appliedMigration.appliedAt : null,
        };
        return migration;
      });
    return migrationsResponse;
  }
}
