import {
  PROFILE_STATE_SLICE_NAME,
  ProfileState,
} from '../accounts/store/state';
import {
  APPLICATION_DETAILS_SLICE_NAME,
  ApplicationDetailsState,
} from '../application-details/store/state';
import { DASHBOARD_SLICE_NAME, DashboardState } from '../dashboard/store/state';

export interface AppState {
  [PROFILE_STATE_SLICE_NAME]: ProfileState;
  [DASHBOARD_SLICE_NAME]: DashboardState;
  [APPLICATION_DETAILS_SLICE_NAME]: ApplicationDetailsState;
}
