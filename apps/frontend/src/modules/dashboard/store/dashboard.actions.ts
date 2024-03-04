import { createAction, props } from '@ngrx/store';
import { Project } from './dashboard.state';

const DASHBOARD_ACTION_PREFIX = '[Dashboard]';

export const loadProjectsAction = createAction(
  `${DASHBOARD_ACTION_PREFIX} Load Projects`
);

export const projectsLoadedAction = createAction(
  `${DASHBOARD_ACTION_PREFIX} Projects loaded`,
  props<{ data: Project[] }>()
);

export const errorInLoadingProjectsAction = createAction(
  `${DASHBOARD_ACTION_PREFIX} Error in loading projects`,
  props<{ error: string }>()
);

export const createProjectAction = createAction(
  `${DASHBOARD_ACTION_PREFIX} Create project`,
  props<{ name: string }>()
);

export const errorInCreatingProjectAction = createAction(
  `${DASHBOARD_ACTION_PREFIX} Error in creating projects`,
  props<{ error: string }>()
);

export const projectCreatedAction = createAction(
  `${DASHBOARD_ACTION_PREFIX} Created project`,
  props<{ data: Project }>()
);
