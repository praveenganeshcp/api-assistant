import { AccountState, ACCOUNTS_STATE_SLICE_NAME } from '@api-assistant/auth-fe';
import { DashboardState } from '../dashboard/store/dashboard.state';

export interface AppState {
  [ACCOUNTS_STATE_SLICE_NAME]: AccountState;
  dashboard: DashboardState;
}
