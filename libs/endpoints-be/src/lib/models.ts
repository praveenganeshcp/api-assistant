import { Endpoint } from "./entities";

export interface MinimalEndpointInfo
  extends Pick<
    Endpoint,
    '_id' | 'name' | 'description' | 'createdOn' | 'url' | 'applicationId'
  > {}
