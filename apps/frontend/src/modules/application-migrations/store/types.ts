import { ServerData } from '@api-assistant/commons-be';
import { ApplicationMigration } from '../types';

export interface MigrationsList extends ServerData<ApplicationMigration[]> {}

export interface MigrationDetails
  extends ServerData<ApplicationMigration & { logic: string }> {}

export interface ApplicationMigrationsState {
  list: MigrationsList;
  details: MigrationDetails;
}

export const APPLICATION_MIGRATION_SLICE_NAME = 'migration';
