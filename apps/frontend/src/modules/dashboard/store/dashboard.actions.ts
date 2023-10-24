import { createAction, props } from '@ngrx/store';
import { Project } from './dashboard.state';

const DASHBOARD_ACTION_PREFIX = '[Dashboard]';

export const loadProjects = createAction(
  `${DASHBOARD_ACTION_PREFIX} Load Projects`
);

export const projectsLoaded = createAction(
  `${DASHBOARD_ACTION_PREFIX} Projects loaded`,
  props<{ data: Project[] }>()
);

export const errorInLoadingProjects = createAction(
  `${DASHBOARD_ACTION_PREFIX} Error in loading projects`,
  props<{ error: string }>()
);

export const createProject = createAction(
  `${DASHBOARD_ACTION_PREFIX} Create project`,
  props<{ name: string }>()
);

export const errorInCreatingProject = createAction(
  `${DASHBOARD_ACTION_PREFIX} Error in creating projects`,
  props<{ error: string }>()
);

export const projectCreated = createAction(
  `${DASHBOARD_ACTION_PREFIX} Created project`,
  props<{ data: Project }>()
);
