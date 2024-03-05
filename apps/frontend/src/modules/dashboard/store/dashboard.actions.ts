import { ActionCreatorProps, NotAllowedCheck, createAction, props } from '@ngrx/store';
import { Project } from './dashboard.state';

/**
 * Prefix to be included in user account action names
 */
const DASHBOARD_ACTION_PREFIX = '[Dashboard]';

/**
 * Create dashboard related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createDashboardActionWithProps<T extends string, P extends Object>(
  type: T,
  config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
  return createAction(`${DASHBOARD_ACTION_PREFIX} ${type}`, config);
}

/**
 * Create dashboard related actions. Attaches a common prefix in action names
 * @param type Action type
 * @returns Action that can be dispatched to store
 */
function createDashboardAction<T extends string>(type: T) {
  return createAction(`${DASHBOARD_ACTION_PREFIX} ${type}`);
}

export const loadProjectsAction = createDashboardAction(
  `${DASHBOARD_ACTION_PREFIX} Load Projects`
);

export const projectsLoadedAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Projects loaded`,
  props<{ data: Project[] }>()
);

export const errorInLoadingProjectsAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Error in loading projects`,
  props<{ error: string }>()
);

export const createProjectAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Create project`,
  props<{ name: string }>()
);

export const errorInCreatingProjectAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Error in creating projects`,
  props<{ error: string }>()
);

export const projectCreatedAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Created project`,
  props<{ data: Project }>()
);
