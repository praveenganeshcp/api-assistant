import { ActionCreatorProps, NotAllowedCheck, createAction, props } from "@ngrx/store";
import { FileObject, ProjectDetails } from "./state";

/**
 * Prefix to be included in user account action names
 */
const PROJECT_DETAILS_ACTION_PREFIX = '[Project Details]';

/**
 * Create project details related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createProjectDetailsActionWithProps<T extends string, P extends Object>(
  type: T,
  config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
  return createAction(`${PROJECT_DETAILS_ACTION_PREFIX} ${type}`, config);
}

export const loadProjectDetailsAction = createProjectDetailsActionWithProps(
    'Load data',
    props<{projectId: string}>()
)

export const projectDetailsLoadedAction = createProjectDetailsActionWithProps(
    'Loaded data',
    props<{projectDetails: ProjectDetails}>()
)

export const errorInLoadingProjectDetailsAction = createProjectDetailsActionWithProps(
    'Error occured', 
    props<{ error: string }>()
)

export const goInsideFolderAction = createProjectDetailsActionWithProps(
  'Go inside folder',
  props<{ folderPath: string }>()
)

export const explorerObjectsLoadedAction = createProjectDetailsActionWithProps(
  'Explorer objects loaded', 
  props<{objects: FileObject[]}>()
)

export const errorInLoadingExplorerObjectsAction = createProjectDetailsActionWithProps(
  'Error in loading explorer objects',
  props<{ error: string }>()
)