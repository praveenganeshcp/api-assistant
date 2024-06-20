import { Filter, FindOptions, UpdateFilter } from 'mongodb';

export enum ALLOWED_DB_OPERATIONS_IN_ENDPOINT {
  findOne = 'findOne',
  find = 'find',
  insertOne = 'insertOne',
  insertMany = 'insertMany',
  updateOne = 'updateOne',
  updateMany = 'updateMany',
  deleteOne = 'deleteOne',
  deleteMany = 'deleteMany',
}

export interface EndpointCreateActionQuery {
  [key: string]: unknown;
}

export interface EndpointReadActionQuery {
  filter: Filter<unknown>;
  options: FindOptions;
}

export interface EndpointUpdateActionQuery {
  filter: Filter<unknown>;
  patch: UpdateFilter<unknown>;
}

export interface EndpointDeleteActionQuery {
  filter: Filter<unknown>;
}

export type EndpointActionQuery =
  | EndpointCreateActionQuery
  | EndpointReadActionQuery
  | EndpointUpdateActionQuery
  | EndpointDeleteActionQuery;

export interface EndpointActionDefinition {
  action: ALLOWED_DB_OPERATIONS_IN_ENDPOINT;
  collectionName: string;
  payload: EndpointActionQuery;
}

export type EndpointResponse = unknown;
