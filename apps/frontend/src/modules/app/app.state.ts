import { AccountState } from '@api-assistant/auth-fe';
import { DashboardState } from '../dashboard/store/dashboard.state';

export interface AppState {
  accounts: AccountState;
  dashboard: DashboardState;
}
