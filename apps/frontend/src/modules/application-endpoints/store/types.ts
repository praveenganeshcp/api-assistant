import { ServerData } from '@api-assistant/commons-be';
import {
  Endpoint,
  MinimalEndpointInfo,
} from '@api-assistant/application-endpoints-fe';

export const APPLICATION_ENDPOINTS_SLICE_NAME = 'endpoints';

interface EndpointsListViewState extends ServerData<MinimalEndpointInfo[]> {}

interface EndpointDetailState extends ServerData<Endpoint> {}

export interface ApplicationEndpointsState {
  list: EndpointsListViewState;
  detail: EndpointDetailState;
}
