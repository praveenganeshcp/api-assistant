import { ObjectId } from 'mongodb';
import { Project } from './project.entity';

export interface ProjectMetadata {
  _id: ObjectId;
  projectId: ObjectId;
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

export type ProjectWithMetadata = Project & { metadata: ProjectMetadata };
