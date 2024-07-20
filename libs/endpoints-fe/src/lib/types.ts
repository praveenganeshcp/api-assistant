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
}

export interface MinimalEndpointInfo
  extends Pick<
    Endpoint,
    '_id' | 'name' | 'description' | 'createdOn' | 'url' | 'applicationId'
  > {}
