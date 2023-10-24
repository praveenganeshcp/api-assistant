import { AccountState } from '../accounts/store/state';
import { DashboardState } from '../dashboard/store/dashboard.state';

export interface AppState {
  accounts: AccountState;
  dashboard: DashboardState;
}
