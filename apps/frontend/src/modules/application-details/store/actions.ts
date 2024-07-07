import { ApplicationDetails, FileObject } from '@api-assistant/project-core-fe';
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

export const loadApplicationDetailsAction =
  createApplicationDetailsActionWithProps(
    'Load data',
    props<{ applicationId: string }>()
  );

export const applicationDetailsLoadedAction =
  createApplicationDetailsActionWithProps(
    'Loaded data',
    props<{ applicationDetails: ApplicationDetails }>()
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
    props<{ objects: FileObject[] }>()
  );

export const errorInLoadingExplorerObjectsAction =
  createApplicationDetailsActionWithProps(
    'Error in loading explorer objects',
    props<{ error: string }>()
  );
