import { ServerData } from '@api-assistant/commons-be';

export interface ApplicationDatabaseState {
  collections: ServerData<string[]>;
  result: ServerData<unknown>;
}

export const APPLICATION_DATABASE_SLICE_NAME = 'applicationDatabase';
