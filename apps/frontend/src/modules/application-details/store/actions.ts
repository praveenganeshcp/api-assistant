import {
  ActionCreatorProps,
  NotAllowedCheck,
  createAction as ngrxAction,
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
function createActionWithProps<T extends string, P extends Object>(
  type: T,
  config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
  return ngrxAction(`${APPLICATION_DETAILS_ACTION_PREFIX} ${type}`, config);
}

/**
 * Create application details related actions. Attaches a common prefix in action names
 * @param type Action type
 * @returns Action that can be dispatched to store
 */
function createAction<T extends string>(type: T) {
  return ngrxAction(`${APPLICATION_DETAILS_ACTION_PREFIX} ${type}`);
}

export const loadApplicationDetailsAction = createActionWithProps(
  'Load data',
  props<{ applicationId: string }>()
);

export const applicationDetailsLoadedAction = createActionWithProps(
  'Loaded data',
  props<{ applicationDetails: any }>()
);

export const errorInLoadingApplicationDetailsAction = createActionWithProps(
  'Error occured',
  props<{ error: string }>()
);
