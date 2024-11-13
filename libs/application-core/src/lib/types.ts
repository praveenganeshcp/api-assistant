import { ObjectId } from 'mongodb';

export interface Application {
  _id: ObjectId;
  name: string;
  createdBy: ObjectId;
  createdOn: Date;
  port: number
}

export interface ApplicationDashboardView extends Omit<Application, '_id' | 'port'> {
  _id: string;
  endpointsCount: number;
}
