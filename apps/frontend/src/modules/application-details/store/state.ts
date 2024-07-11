import { ServerData } from '@api-assistant/commons-be';
import { MinimalEndpointInfo } from '@api-assistant/endpoints-fe';
import { ApplicationDetails, FileObject } from '@api-assistant/project-core-fe';

interface ApplicationEndpointsState extends ServerData<MinimalEndpointInfo[]> {}

interface ApplicationInfoState extends ServerData<ApplicationDetails> {}

interface ApplicationFilesState extends ServerData<FileObject[]> {
  currentPath: string;
}

export interface ApplicationDetailsState {
  application: ApplicationInfoState;
  files: ApplicationFilesState;
  endpoints: {
    list:  ApplicationEndpointsState;
  }
}

export const APPLICATION_DETAILS_SLICE_NAME = 'applicationDetails';
