import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

const applicationDetailsSelector = (state: AppState) =>
  state.application.details;

export const applicationDataSelector = createSelector(
  applicationDetailsSelector,
  (applicationDetails) => applicationDetails.data
);

export const applicationAPIKeySelector = createSelector(
  applicationDataSelector,
  (applicationDetails) => applicationDetails?.apiKey
);

export const applicationDataLoadingSelector = createSelector(
  applicationDetailsSelector,
  (applicationDetails) => applicationDetails.isLoading
);

export const applicationDataErrorSelector = createSelector(
  applicationDetailsSelector,
  (applicationDetails) => applicationDetails.error
);
