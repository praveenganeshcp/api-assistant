import { Endpoint, MinimalEndpointInfo } from '@api-assistant/endpoints-fe';
import {
  ActionCreatorProps,
  NotAllowedCheck,
  createAction,
  props,
} from '@ngrx/store';

/**
 * Prefix to be included in user account action names
 */
const APPLICATION_DETAILS_ACTION_PREFIX = '[Application Details]';

/**
 * Create application details related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createApplicationDetailsActionWithProps<
  T extends string,
  P extends Object
>(type: T, config: ActionCreatorProps<P> & NotAllowedCheck<P>) {
  return createAction(`${APPLICATION_DETAILS_ACTION_PREFIX} ${type}`, config);
}

/**
 * Create application details related actions. Attaches a common prefix in action names
 * @param type Action type
 * @returns Action that can be dispatched to store
 */
function createApplicationDetailsAction<T extends string>(type: T) {
  return createAction(`${APPLICATION_DETAILS_ACTION_PREFIX} ${type}`);
}

export const loadApplicationDetailsAction =
  createApplicationDetailsActionWithProps(
    'Load data',
    props<{ applicationId: string }>()
  );

export const applicationDetailsLoadedAction =
  createApplicationDetailsActionWithProps(
    'Loaded data',
    props<{ applicationDetails: any }>()
  );

export const errorInLoadingApplicationDetailsAction =
  createApplicationDetailsActionWithProps(
    'Error occured',
    props<{ error: string }>()
  );

export const goInsideFolderAction = createApplicationDetailsActionWithProps(
  'Go inside folder',
  props<{ folderPath: string }>()
);

export const explorerObjectsLoadedAction =
  createApplicationDetailsActionWithProps(
    'Explorer objects loaded',
    props<{ objects: any[] }>()
  );

export const errorInLoadingExplorerObjectsAction =
  createApplicationDetailsActionWithProps(
    'Error in loading explorer objects',
    props<{ error: string }>()
  );

export const fetchAllEndpoints = createApplicationDetailsActionWithProps(
  'Fetch All Endpoints',
  props<{ applicationId: string }>()
);

export const allEndpointsLoaded = createApplicationDetailsActionWithProps(
  `All endpoints fetched`,
  props<{ endpoints: MinimalEndpointInfo[] }>()
);

export const errorInFetchingEndpoints = createApplicationDetailsActionWithProps(
  `Error in fetching endpoints`,
  props<{ error: string }>()
);

export const fetchEndpointDetails = createApplicationDetailsActionWithProps(
  'Fetch Endpoint details',
  props<{ applicationId: string; endpointId: string }>()
);

export const endpointDetailsFetched = createApplicationDetailsActionWithProps(
  `Endpoint details fetched`,
  props<{ endpoint: Endpoint }>()
);

export const errorInFetchingEndpointDetails =
  createApplicationDetailsActionWithProps(
    `Endpoint details fetch failed`,
    props<{ error: string }>()
  );

export const resetEndpointDetailsState = createApplicationDetailsAction(
  'Reset Endpoint details state'
);

export const deleteEndpointAction = createApplicationDetailsActionWithProps(
  'Delete Endpoint',
  props<{ endpointId: string; applicationId: string }>()
);

export const endpointDeletedAction =
  createApplicationDetailsAction(`Endpoint deleted`);

export const errorInDeletingEndpointAction =
  createApplicationDetailsActionWithProps(
    'Error in deleteing endpoints',
    props<{ error: string }>()
  );

export const createEndpointAction = createApplicationDetailsActionWithProps(
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

export const endpointCreatedAction = createApplicationDetailsActionWithProps(
  'Endpoint created',
  props<{ endpoint: Endpoint }>()
);

export const errorInCreatingEndpointAction =
  createApplicationDetailsActionWithProps(
    'Error in creating endpoint',
    props<{ error: string }>()
  );

export const editEndpointAction = createApplicationDetailsActionWithProps(
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

export const endpointUpdateSuccessAction =
  createApplicationDetailsActionWithProps(
    'Endpoint updated',
    props<{ endpoint: Endpoint }>()
  );

export const errorInUpdatingEndpointAction =
  createApplicationDetailsActionWithProps(
    'Error in updating endpoint',
    props<{ error: string }>()
  );
