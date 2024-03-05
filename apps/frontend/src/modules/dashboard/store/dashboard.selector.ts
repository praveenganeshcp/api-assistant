import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

const dashboardSelector = (state: AppState) => state.dashboard;

export const dashboardProjectsSelector = createSelector(
  dashboardSelector,
  (state) => state.projects
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
