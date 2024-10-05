import { applicationMigrationFolder } from '@api-assistant/migrations-core';
import { config } from 'migrate-mongo';
import { ObjectId } from 'mongodb';

export function buildMigrationConfig(config: {
  dbUrl: string;
  dbName: string;
  applicationId: ObjectId;
}): config.Config {
  return {
    mongodb: {
      url: config.dbUrl,
      databaseName: config.dbName,
    },
    migrationsDir: applicationMigrationFolder(config.applicationId),
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
  };
}
