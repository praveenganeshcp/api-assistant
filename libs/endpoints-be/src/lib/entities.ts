import { ObjectId } from 'mongodb';
import { EndpointActionDefinition, EndpointResponse } from './models';

export interface Endpoint {
  _id: ObjectId;
  name: string;
  description: string;
  url: string;
  crud: EndpointActionDefinition[];
  response: EndpointResponse;
  createdBy: ObjectId;
  createdOn: Date;
  projectId: ObjectId;
}
