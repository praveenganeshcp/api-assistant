import { ObjectId } from 'mongodb';

export interface Project {
  _id: ObjectId;
  name: string;
  createdBy: ObjectId;
  createdOn: Date;
}
