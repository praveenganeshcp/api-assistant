import { Endpoint, MinimalEndpointInfo } from '@api-assistant/endpoints-fe';
import {
  ActionCreatorProps,
  createAction as ngrxAction,
  NotAllowedCheck,
  props,
} from '@ngrx/store';

const APPLICATION_DETAILS_ENDPOINT_PREFIX = '[Application Endpoints]';

/**
 * Create application endpoint related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createActionWithProps<T extends string, P extends Object>(
  type: T,
  config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
  return ngrxAction(`${APPLICATION_DETAILS_ENDPOINT_PREFIX} ${type}`, config);
}

/**
 * Create application endpoint related actions. Attaches a common prefix in action names
 * @param type Action type
 * @returns Action that can be dispatched to store
 */
function createAction<T extends string>(type: T) {
  return ngrxAction(`${APPLICATION_DETAILS_ENDPOINT_PREFIX} ${type}`);
}

export const fetchAllEndpointsAction = createActionWithProps(
  'Fetch All Endpoints',
  props<{ applicationId: string }>()
);

export const allEndpointsLoadedAction = createActionWithProps(
  `All endpoints fetched`,
  props<{ endpoints: MinimalEndpointInfo[] }>()
);

export const errorInFetchingEndpointsAction = createActionWithProps(
  `Error in fetching endpoints`,
  props<{ error: string }>()
);

export const fetchEndpointDetailsAction = createActionWithProps(
  'Fetch Endpoint details',
  props<{ applicationId: string; endpointId: string }>()
);

export const endpointDetailsFetchedAction = createActionWithProps(
  `Endpoint details fetched`,
  props<{ endpoint: Endpoint }>()
);

export const errorInFetchingEndpointDetailsAction = createActionWithProps(
  `Endpoint details fetch failed`,
  props<{ error: string }>()
);

export const resetEndpointDetailsStateAction = createAction(
  'Reset Endpoint details state'
);

export const deleteEndpointActionAction = createActionWithProps(
  'Delete Endpoint',
  props<{ endpointId: string; applicationId: string }>()
);

export const endpointDeletedAction = createAction(`Endpoint deleted`);

export const errorInDeletingEndpointAction = createActionWithProps(
  'Error in deleteing endpoints',
  props<{ error: string }>()
);

export const createEndpointAction = createActionWithProps(
  'Create Endpoint',
  props<{
    endpoint: Pick<
      Endpoint,
      | 'name'
      | 'description'
      | 'crud'
      | 'response'
      | 'url'
      | 'validations'
      | 'method'
      | 'isAuthenticated'
    >;
    applicationId: string;
  }>()
);

export const endpointCreatedAction = createActionWithProps(
  'Endpoint created',
  props<{ endpoint: Endpoint }>()
);

export const errorInCreatingEndpointAction = createActionWithProps(
  'Error in creating endpoint',
  props<{ error: string }>()
);

export const editEndpointAction = createActionWithProps(
  'Edit Endpoint',
  props<{
    endpoint: Pick<
      Endpoint,
      | 'name'
      | 'description'
      | 'crud'
      | 'response'
      | 'url'
      | 'validations'
      | 'method'
      | 'isAuthenticated'
    >;
    applicationId: string;
    endpointId: string;
  }>()
);

export const endpointUpdateSuccessAction = createActionWithProps(
  'Endpoint updated',
  props<{ endpoint: Endpoint }>()
);

export const errorInUpdatingEndpointAction = createActionWithProps(
  'Error in updating endpoint',
  props<{ error: string }>()
);
