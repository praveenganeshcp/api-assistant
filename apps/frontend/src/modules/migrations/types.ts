import { CanBeNull } from 'ngx-simple-widgets';

export interface ApplicationMigration {
  fileName: string;
  appliedAt: CanBeNull<Date>;
  status: ApplicationMigrationStatus;
}

export type ApplicationMigrationStatus = 'APPLIED' | 'PENDING';
