import { CanBeNull } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import path = require('path');

export const MIGRATIONS_FOLDER = 'app_migrations';

export const MIGRATIONS_COLLECTION = 'changelog';

export function applicationMigrationFolder(application: ObjectId): string {
  return path.join(process.cwd(), MIGRATIONS_FOLDER, application.toString());
}

export interface ApplicationMigration {
  fileName: string;
  appliedAt: CanBeNull<Date>;
  status: ApplicationMigrationStatus;
}

export type ApplicationMigrationStatus = 'APPLIED' | 'PENDING';
