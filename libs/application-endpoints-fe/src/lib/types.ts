import { CRUDEngineHttpMethods } from "@api-assistant/application-endpoints-core";

export interface Endpoint {
  _id: string;
  name: string;
  description: string;
  url: string;
  crud: Object[];
  response: Object;
  createdBy: string;
  createdOn: Date;
  applicationId: string;
  validations: Object;
  method: CRUDEngineHttpMethods;
  isAuthenticated: boolean;
  useCloudCode: boolean;
  requestHandler: string;
}

export interface MinimalEndpointInfo
  extends Pick<
    Endpoint,
    | "_id"
    | "name"
    | "description"
    | "createdOn"
    | "url"
    | "applicationId"
    | "method"
    | "isAuthenticated"
    | "useCloudCode"
  > {}

export enum ALLOWED_DB_OPERATIONS_IN_ENDPOINT {
  findOne = "findOne",
  find = "find",
  insertOne = "insertOne",
  insertMany = "insertMany",
  updateOne = "updateOne",
  updateMany = "updateMany",
  deleteOne = "deleteOne",
  deleteMany = "deleteMany",
}
