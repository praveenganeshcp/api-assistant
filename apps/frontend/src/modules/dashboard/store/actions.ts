import { Application } from '@api-assistant/dashboard-fe';
import {
  ActionCreatorProps,
  NotAllowedCheck,
  createAction,
  props,
} from '@ngrx/store';

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

export const loadApplicationsAction = createDashboardAction(
  `${DASHBOARD_ACTION_PREFIX} Load Applications`
);

export const applicationsLoadedAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Applications loaded`,
  props<{ data: Application[] }>()
);

export const errorInLoadingApplicationsAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Error in loading applications`,
  props<{ error: string }>()
);

export const createApplicationAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Create application`,
  props<{ name: string }>()
);

export const errorInCreatingApplicationAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Error in creating applications`,
  props<{ error: string }>()
);

export const applicationCreatedAction = createDashboardActionWithProps(
  `${DASHBOARD_ACTION_PREFIX} Created application`,
  props<{ data: Application }>()
);
