import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

const applicationEndpointsSelector = (state: AppState) =>
  state.application.endpoints;

export const allEndpointsDataSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.list.data
);

export const allEndpointsLoadingSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.list.isLoading
);

export const allEndpointsErrorSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.list.error
);

export const endpointDetailsDataSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.detail.data
);

export const endpointDetailsLoadingSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.detail.isLoading
);

export const endpointDetailsErrorSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.detail.error
);
