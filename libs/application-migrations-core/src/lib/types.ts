import { CanBeNull } from '@api-assistant/commons-be';

export const MIGRATIONS_FOLDER = 'app_migrations';

export const MIGRATIONS_COLLECTION = 'changelog';

export interface ApplicationMigration {
  fileName: string;
  appliedAt: CanBeNull<Date>;
  status: ApplicationMigrationStatus;
}

export type ApplicationMigrationStatus = 'APPLIED' | 'PENDING';
