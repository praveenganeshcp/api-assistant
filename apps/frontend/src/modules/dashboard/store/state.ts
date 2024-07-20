import { ApplicationDashboardView } from '@api-assistant/application-core';

export interface DashboardState {
  isLoading: boolean;
  data: ApplicationDashboardView[];
  error: string;
}

export const DASHBOARD_SLICE_NAME = 'dashboard';
