import {
  ActionCreatorProps,
  NotAllowedCheck,
  createAction as ngrxAction,
  props,
} from '@ngrx/store';

/**
 * Prefix to be included in application logs action
 */
const APPLICATION_LOGS_ACTION_PREFIX = '[Application logs]';

/**
 * Create application logs related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createActionWithProps<T extends string, P extends Object>(
  type: T,
  config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
  return ngrxAction(`${APPLICATION_LOGS_ACTION_PREFIX} ${type}`, config);
}

export const fetchApplicationLogsAction = createActionWithProps('Fetch logs', props<{ applicationId: string }>());

export const applicationLogsFetchedAction = createActionWithProps('Logs fetched', props<{ logs: string }>());

export const errorInFetchingApplicationLogsAction = createActionWithProps('Error in fetching logs', props<{ error: string }>());