import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

export const dashboardStateSelector = (state: AppState) => state.dashboard;

export const isApplicationListLoadingSelector = createSelector(
  dashboardStateSelector,
  (dashboardState) => dashboardState.isLoading
);

export const applicationsListDataSelector = createSelector(
  dashboardStateSelector,
  (dashboardState) => dashboardState.data
);

export const applicationsListDataErrorSelector = createSelector(
  dashboardStateSelector,
  (dashboardState) => dashboardState.error
);
