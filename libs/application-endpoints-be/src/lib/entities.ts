import {
  CRUDActionDefinition,
  CRUDActionResponse,
  CRUDEngineHttpMethods,
  RequestDataValidation,
} from '@api-assistant/applications-crud-engine-core';
import { ObjectId } from 'mongodb';

export interface Endpoint {
  _id: ObjectId;
  name: string;
  description: string;
  url: string;
  method: CRUDEngineHttpMethods;
  crud: CRUDActionDefinition[];
  response: CRUDActionResponse;
  validations: RequestDataValidation;
  createdBy: ObjectId;
  createdOn: Date;
  applicationId: ObjectId;
  isAuthenticated: boolean;
}
