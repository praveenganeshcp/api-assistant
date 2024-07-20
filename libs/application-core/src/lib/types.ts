import { ObjectId } from 'mongodb';

export interface Application {
  _id: ObjectId;
  name: string;
  createdBy: ObjectId;
  createdOn: Date;
}

export interface ApplicationDashboardView extends Application {
  endpointsCount: number;
  usersCount: number;
}
