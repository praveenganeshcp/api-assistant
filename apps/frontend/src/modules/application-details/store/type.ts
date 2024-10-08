import { ServerData } from '@api-assistant/commons-be';

export interface ApplicationDetailsState
  extends ServerData<{
    _id: string;
    name: string;
    key: string;
  }> {}

export const APPLICATION_DETAILS_SLICE_NAME = 'details';
