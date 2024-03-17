export interface Project {
  id: string;
  name: string;
  totalOperations: number;
  storageSize: number;
  activeUsers: number;
  createdOn: Date;
  status: boolean;
}

export interface DashboardState {
  isLoading: boolean;
  data: Project[];
  error: string;
}

export type GlobalState = {[DASHBOARD_SLICE_NAME]: DashboardState}

export const DASHBOARD_SLICE_NAME = "dashboard";