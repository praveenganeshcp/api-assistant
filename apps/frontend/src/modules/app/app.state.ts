import {
  PROFILE_STATE_SLICE_NAME,
  ProfileState,
} from '../accounts/store/state';
import {
  APPLICATION_DATABASE_SLICE_NAME,
  ApplicationDatabaseState,
} from '../application-database/store/types';
import {
  APPLICATION_ENDPOINTS_SLICE_NAME,
  ApplicationEndpointsState,
} from '../application-endpoints/store/types';
import { DASHBOARD_SLICE_NAME, DashboardState } from '../dashboard/store/state';
import {
  APPLICATION_MIGRATION_SLICE_NAME,
  ApplicationMigrationsState,
} from '../application-migrations/store/types';
import {
  APPLICATION_DETAILS_SLICE_NAME,
  ApplicationDetailsState,
} from '../application-details/store/type';
import { APPLICATION_CLOUD_CODE_SLICE_NAME } from '../application-cloud-code/store/reducers';
import { ApplicationCloudCodeState } from '../application-cloud-code/store/state';

export interface AppState {
  [PROFILE_STATE_SLICE_NAME]: ProfileState;
  [DASHBOARD_SLICE_NAME]: DashboardState;
  application: {
    [APPLICATION_DETAILS_SLICE_NAME]: ApplicationDetailsState;
    [APPLICATION_MIGRATION_SLICE_NAME]: ApplicationMigrationsState;
    [APPLICATION_DATABASE_SLICE_NAME]: ApplicationDatabaseState;
    [APPLICATION_ENDPOINTS_SLICE_NAME]: ApplicationEndpointsState;
    [APPLICATION_CLOUD_CODE_SLICE_NAME]: ApplicationCloudCodeState
  };
}
