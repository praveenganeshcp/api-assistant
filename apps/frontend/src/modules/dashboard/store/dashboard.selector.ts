import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import { DashboardState } from './dashboard.state';

const dashboardSelector = (state: AppState) => state.dashboard;

export const dashboardProjectsSelector = createSelector(
  dashboardSelector,
  (state) => state.projects
);

export const createProjectSelector = createSelector(
  dashboardSelector,
  (state) => state.createProject
);

export const isProjectsLoadingSelector = createSelector(
  dashboardProjectsSelector,
  (projects) => projects.isLoading
);

export const projectsSelector = createSelector(
  dashboardProjectsSelector,
  (projects) => projects.data
);

export const projectLoadError = createSelector(
  dashboardProjectsSelector,
  (projects) => projects.error
);

export const isCreateProjectInProgress = createSelector(
  createProjectSelector,
  (createProject) => createProject.inProgress
);

export const isCreateProjectSuccess = createSelector(
  createProjectSelector,
  (createProject) => createProject.isCreated
);

export const createProjectError = createSelector(
  createProjectSelector,
  (createProject) => createProject.error
);
