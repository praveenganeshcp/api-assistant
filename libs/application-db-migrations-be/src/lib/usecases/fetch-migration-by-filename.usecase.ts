import { Usecase } from '@api-assistant/commons-be';
import { MongoClient, ObjectId } from 'mongodb';
import { readFile } from 'fs/promises';
import {
  ApplicationMigration,
  applicationMigrationFolder,
  MIGRATIONS_COLLECTION,
} from '@api-assistant/application-migrations-core';
import path = require('path');
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CRUD_DB_CONNECTION } from '@api-assistant/application-crud-engine-be';
import { applicationDbName } from '@api-assistant/applications-crud-engine-core';

interface FetchMigrationByFileNameUsecaseInput {
  applicationId: ObjectId;
  fileName: string;
}

interface FetchMigrationByFileNameUsecaseOutput extends ApplicationMigration {
  logic: string;
}

@Injectable()
export class FetchMigrationByFileNameUsecase
  implements
    Usecase<
      FetchMigrationByFileNameUsecaseInput,
      FetchMigrationByFileNameUsecaseOutput
    >
{
  private readonly logger = new Logger(FetchMigrationByFileNameUsecase.name);

  constructor(
    @Inject(CRUD_DB_CONNECTION) private readonly connection: MongoClient
  ) {}

  async execute(
    data: FetchMigrationByFileNameUsecaseInput
  ): Promise<FetchMigrationByFileNameUsecaseOutput> {
    this.logger.log('fetching migration for file name ' + data.fileName);
    const appDb = this.connection.db(applicationDbName(data.applicationId));
    this.logger.log('connected to app db');
    const migrationsCollection = appDb.collection(MIGRATIONS_COLLECTION);
    const appliedMigrationFromDb = (await migrationsCollection.findOne({
      fileName: data.fileName,
    })) as unknown as ApplicationMigration;
    this.logger.log('found migration from db', appliedMigrationFromDb);
    const logic = await readFile(
      path.join(applicationMigrationFolder(data.applicationId), data.fileName),
      'utf-8'
    );
    return {
      logic,
      fileName: data.fileName,
      status: appliedMigrationFromDb ? 'APPLIED' : 'PENDING',
      appliedAt: appliedMigrationFromDb
        ? appliedMigrationFromDb.appliedAt
        : null,
    };
  }
}
