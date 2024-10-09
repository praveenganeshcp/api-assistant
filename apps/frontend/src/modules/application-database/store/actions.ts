import { CRUDActionDefinition } from '@api-assistant/applications-crud-engine-core';
import {
  ActionCreatorProps,
  NotAllowedCheck,
  createAction as ngrxCreateAction,
  props,
} from '@ngrx/store';

/**
 * Prefix to be included in user account action names
 */
const APPLICATION_DB_ACTION_PREFIX = '[Application database]';

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
  return ngrxCreateAction(`${APPLICATION_DB_ACTION_PREFIX} ${type}`, config);
}

/**
 * Create application details related actions. Attaches a common prefix in action names
 * @param type Action type
 * @returns Action that can be dispatched to store
 */
function createAction<T extends string>(type: T) {
  return ngrxCreateAction(`${APPLICATION_DB_ACTION_PREFIX} ${type}`);
}

export const loadCollectionsAction = createActionWithProps(
  'load collections',
  props<{ applicationId: string }>()
);

export const collectionsLoadedAction = createActionWithProps(
  'collections loaded',
  props<{ collections: string[] }>()
);

export const errorInLoadingCollectionsAction = createActionWithProps(
  'error in loading collections',
  props<{ error: string }>()
);

export const executeQueryAction = createActionWithProps(
  'Execute query',
  props<{ applicationId: string; actionDef: CRUDActionDefinition }>()
);

export const queryExecutedAction = createActionWithProps(
  'collections loaded',
  props<{ result: unknown }>()
);

export const errorInExecutingQueryAction = createActionWithProps(
  'error in executing query',
  props<{ error: string }>()
);
