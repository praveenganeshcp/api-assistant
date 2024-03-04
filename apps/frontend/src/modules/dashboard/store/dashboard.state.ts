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
  projects: {
    isLoading: boolean;
    data: Project[];
    error: string;
  };
}
