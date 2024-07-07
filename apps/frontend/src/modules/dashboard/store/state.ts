import { Application } from '@api-assistant/dashboard-fe';

export interface DashboardState {
  isLoading: boolean;
  data: Application[];
  error: string;
}

export const DASHBOARD_SLICE_NAME = 'dashboard';
