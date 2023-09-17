export interface Project {
    id: number;
    name: string;
    createOps: number;
    readOps: number;
    updateOps: number;
    deleteOps: number;
    storageSize: number;
}

export interface DashboardState {
    isLoading: boolean;
    data: Project[];
    error: string;
}

export const DASHBOARD_STATE: DashboardState = {
    isLoading: false,
    data: [],
    error: ''
}