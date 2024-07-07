export interface Endpoint {
  _id: string;
  name: string;
  description: string;
  url: string;
  crud: Object[];
  response: unknown;
  createdBy: string;
  createdOn: Date;
  projectId: string;
}

export interface MinimalEndpointInfo
  extends Pick<
    Endpoint,
    '_id' | 'name' | 'description' | 'createdOn' | 'url' | 'projectId'
  > {}
