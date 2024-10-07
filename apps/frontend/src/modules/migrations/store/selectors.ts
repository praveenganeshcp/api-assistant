import { createSelector, select } from '@ngrx/store';
import { AppState } from '../../app/app.state';

export const migrationsDataSelector = (state: AppState) =>
  state.applicationMigration;

export const migrationsDetailsStateSelector = createSelector(
  migrationsDataSelector,
  (migrationsDetailsState) => migrationsDetailsState.details
);

export const migrationsDetailsDataSelector = createSelector(
  migrationsDetailsStateSelector,
  (migrationsDetailsState) => migrationsDetailsState.data
);

export const migrationsDetailLoadingSelector = createSelector(
  migrationsDetailsStateSelector,
  (migrationsDetailsState) => migrationsDetailsState.isLoading
);

export const migrationsDetailsErrorSelector = createSelector(
  migrationsDetailsStateSelector,
  (migrationsDetailsState) => migrationsDetailsState.error
);

export const migrationsListStateSelector = createSelector(
  migrationsDataSelector,
  (migrationsData) => migrationsData.list
);

export const migrationsListDataSelector = createSelector(
  migrationsListStateSelector,
  (migrationsListState) => migrationsListState.data
);

export const migrationsListLoadingSelector = createSelector(
  migrationsListStateSelector,
  (migrationsListState) => migrationsListState.isLoading
);

export const migrationsListErrorSelector = createSelector(
  migrationsListStateSelector,
  (migrationsListState) => migrationsListState.error
);
