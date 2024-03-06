import { CanBeNull } from "ngx-simple-widgets";

interface ProjectMetadata {
    _id: string;
    projectId: string;
    count: {
      createAction: number;
      readAction: number;
      updateAction: number;
      deleteAction: number;
      aggregate: number;
    };
    apiKey: string;
    apiKeyLastGeneratedOn: Date;
    noOfFiles: number;
    storage: number;
    users: number;
  }

  interface Project {
    _id: string;
    name: string;
    createdBy: string;
    createdOn: Date;
  }

  export type ProjectDetails = Project & { metadata: ProjectMetadata }
  
  export interface ProjectDetailsState {
    data: CanBeNull<ProjectDetails>;
    isLoading: boolean;
    error: string
  }
  