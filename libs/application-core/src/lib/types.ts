import { ObjectId } from 'mongodb';

export interface Application {
  _id: ObjectId;
  name: string;
  createdBy: ObjectId;
  createdOn: Date;
  port: number
  apiKey: string
}

export interface ApplicationDashboardView extends Omit<Application, '_id' | 'port' | 'apiKey'> {
  _id: string;
  endpointsCount: number;
}
