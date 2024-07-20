import { ServerData } from '@api-assistant/commons-be';
import { Endpoint, MinimalEndpointInfo } from '@api-assistant/endpoints-fe';

interface EndpointsListViewState extends ServerData<MinimalEndpointInfo[]> {}

interface ApplicationInfoState extends ServerData<any> {}

interface FilesState extends ServerData<any[]> {
  currentPath: string;
}

interface EndpointDetailState extends ServerData<Endpoint> {}

export interface ApplicationDetailsState {
  application: ApplicationInfoState;
  files: FilesState;
  endpoints: {
    list: EndpointsListViewState;
    detail: EndpointDetailState;
  };
}

export const APPLICATION_DETAILS_SLICE_NAME = 'applicationDetails';
