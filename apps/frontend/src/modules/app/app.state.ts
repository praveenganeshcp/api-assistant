import {
  PROFILE_STATE_SLICE_NAME,
  ProfileState,
} from '../accounts/store/state';
import {
  APPLICATION_DATABASE_SLICE_NAME,
  ApplicationDatabaseState,
} from '../application-database/store/types';
import {
  APPLICATION_DETAILS_SLICE_NAME,
  ApplicationDetailsState,
} from '../application-details/store/state';
import { DASHBOARD_SLICE_NAME, DashboardState } from '../dashboard/store/state';
import {
  APPLICATION_MIGRATION_SLICE_NAME,
  MigrationsState,
} from '../migrations/store/types';

export interface AppState {
  [PROFILE_STATE_SLICE_NAME]: ProfileState;
  [DASHBOARD_SLICE_NAME]: DashboardState;
  [APPLICATION_DETAILS_SLICE_NAME]: ApplicationDetailsState;
  [APPLICATION_MIGRATION_SLICE_NAME]: MigrationsState;
  [APPLICATION_DATABASE_SLICE_NAME]: ApplicationDatabaseState;
}
