import { AccountState, ACCOUNTS_STATE_SLICE_NAME } from '@api-assistant/auth-fe';
import { DASHBOARD_SLICE_NAME, DashboardState } from '@api-assistant/dashboard-fe';
import { PROJECT_DETAILS_SLICE_NAME, ProjectDetailsState } from '@api-assistant/project-core-fe';

export interface AppState {
  [ACCOUNTS_STATE_SLICE_NAME]: AccountState;
  [DASHBOARD_SLICE_NAME]: DashboardState;
  [PROJECT_DETAILS_SLICE_NAME]: ProjectDetailsState,
}
