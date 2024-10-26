import { ActionCreatorProps, createAction as ngrxAction, NotAllowedCheck, props } from "@ngrx/store";

const APPLICATION_CLOUD_CODE_ENDPOINT_PREFIX = 'Cloud code';

/**
 * Create application cloud code related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createActionWithProps<T extends string, P extends Object>(
    type: T,
    config: ActionCreatorProps<P> & NotAllowedCheck<P>
  ) {
    return ngrxAction(`${APPLICATION_CLOUD_CODE_ENDPOINT_PREFIX} ${type}`, config);
  }
  
  /**
   * Create application cloud code related actions. Attaches a common prefix in action names
   * @param type Action type
   * @returns Action that can be dispatched to store
   */
  function createAction<T extends string>(type: T) {
    return ngrxAction(`${APPLICATION_CLOUD_CODE_ENDPOINT_PREFIX} ${type}`);
  }

export const fetchAllRequestHandlersAction = createActionWithProps(
    'Fetch All handlers',
    props<{ applicationId: string }>()
  );
  
  export const allRequestHandlersLoadedAction = createActionWithProps(
    `All handlers fetched`,
    props<{ files: string[] }>()
  );
  
  export const errorInFetchingRequestHandlerssAction = createActionWithProps(
    `Error in fetching handlers`,
    props<{ error: string }>()
  );
  