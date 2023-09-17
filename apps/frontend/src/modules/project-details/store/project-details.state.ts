export interface ProjectDetail {
    id: number;
    name: string;
    createOps: number;
    readOps: number;
    updateOps: number;
    deleteOps: number;
    storage: number;
    authKey: string;
    createdOn: Date;
    updatedOn: Date;
    users: number;
}

export interface ProjectDetailsState {
    isLoading: boolean;
    data: ProjectDetail;
    error: string;
}