import { Application } from '@api-assistant/application-core';

export interface DashboardState {
  isLoading: boolean;
  data: Application[];
  error: string;
}

export const DASHBOARD_SLICE_NAME = 'dashboard';
