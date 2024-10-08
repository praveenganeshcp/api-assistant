import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

export const appDbStateSelector = (state: AppState) =>
  state.application.database;

export const appDbCollectionsStateSelector = createSelector(
  appDbStateSelector,
  (appDbState) => appDbState.collections
);

export const appDbCollectionsListSelector = createSelector(
  appDbCollectionsStateSelector,
  (appDbCollectionsState) => appDbCollectionsState.data
);

export const appDbCollectionsLoadingSelector = createSelector(
  appDbCollectionsStateSelector,
  (appDbCollectionsState) => appDbCollectionsState.isLoading
);

export const appDbCollectionsErrorelector = createSelector(
  appDbCollectionsStateSelector,
  (appDbCollectionsState) => appDbCollectionsState.error
);

export const appDbResultStateSelector = createSelector(
  appDbStateSelector,
  (appDbState) => appDbState.result
);

export const appDbResultListSelector = createSelector(
  appDbResultStateSelector,
  (appDbResultState) => appDbResultState.data
);

export const appDbResultLoadingSelector = createSelector(
  appDbResultStateSelector,
  (appDbResultState) => appDbResultState.isLoading
);

export const appDbResultErrorelector = createSelector(
  appDbResultStateSelector,
  (appDbResultState) => appDbResultState.error
);
