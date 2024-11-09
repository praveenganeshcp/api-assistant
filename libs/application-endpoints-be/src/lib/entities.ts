import {
  CRUDActionDefinition,
  CRUDActionResponse,
  CRUDEngineHttpMethods,
  RequestDataValidation,
} from "@api-assistant/application-endpoints-core";
import { ObjectId } from "mongodb";

export interface Endpoint {
  _id: ObjectId;
  name: string;
  description: string;
  url: string;
  method: CRUDEngineHttpMethods;
  crud: CRUDActionDefinition[];
  response: CRUDActionResponse;
  requestHandler: string;
  useCloudCode: boolean;
  validations: RequestDataValidation;
  createdBy: ObjectId;
  createdOn: Date;
  applicationId: ObjectId;
  isAuthenticated: boolean;
}
