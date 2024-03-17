import { AccountState, ACCOUNTS_STATE_SLICE_NAME } from '@api-assistant/auth-fe';
import { ProjectDetailsState, FileExplorerState } from '../project-details/store/state';
import { DASHBOARD_SLICE_NAME, DashboardState } from '@api-assistant/dashboard-fe';

export interface AppState {
  [ACCOUNTS_STATE_SLICE_NAME]: AccountState;
  [DASHBOARD_SLICE_NAME]: DashboardState;
  projectDetails: ProjectDetailsState,
  fileExplorer: FileExplorerState
}
