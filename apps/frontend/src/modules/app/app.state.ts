import { AccountState, ACCOUNTS_STATE_SLICE_NAME } from '@api-assistant/auth-fe';
import { DashboardState } from '../dashboard/store/dashboard.state';
import { ProjectDetailsState } from '../project-details/store/state';

export interface AppState {
  [ACCOUNTS_STATE_SLICE_NAME]: AccountState;
  dashboard: DashboardState;
  projectDetails: ProjectDetailsState
}
