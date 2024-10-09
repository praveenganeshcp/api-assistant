import { Application } from '@api-assistant/application-core';
import { ServerData } from '@api-assistant/commons-be';

export interface ApplicationDetailsState extends ServerData<Application> {}

export const APPLICATION_DETAILS_SLICE_NAME = 'details';
