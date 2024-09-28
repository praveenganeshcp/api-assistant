import { CRUDActionDefinition, CRUDActionResponse } from '@api-assistant/crud-engine-core';
import { ObjectId } from 'mongodb';

export interface Endpoint {
  _id: ObjectId;
  name: string;
  description: string;
  url: string;
  crud: CRUDActionDefinition[];
  response: CRUDActionResponse;
  createdBy: ObjectId;
  createdOn: Date;
  applicationId: ObjectId;
}
