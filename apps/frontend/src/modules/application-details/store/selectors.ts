import { createSelector } from '@ngrx/store';
import { AppState } from '../../app/app.state';

const applicationDetailsSelector = (state: AppState) =>
  state.applicationDetails;

const applicationFilesSelector = createSelector(
  applicationDetailsSelector,
  (applicationDetails) => applicationDetails.files
);

const applicationEndpointsSelector = createSelector(
  applicationDetailsSelector,
  (applicationDetails) => applicationDetails.endpoints
);

export const applicationDataSelector = createSelector(
  applicationDetailsSelector,
  (applicationDetails) => applicationDetails.application
);

export const applicationDataLoadingSelector = createSelector(
  applicationDataSelector,
  (applicationData) => applicationData.isLoading
);

export const applicationDataErrorSelector = createSelector(
  applicationDataSelector,
  (applicationData) => applicationData.error
);

const applicationDataSlice = createSelector(
  applicationDataSelector,
  (applicationData) => applicationData.data
);

export const applicationOverviewSelector = createSelector(
  applicationDataSlice,
  (applicationData) => {
    if (applicationData == null) {
      return null;
    }
    const dbActions = applicationData.count;
    return {
      id: applicationData._id,
      name: applicationData.name,
      dbStats: {
        ...dbActions,
        totalActions:
          dbActions.createAction +
          dbActions.updateAction +
          dbActions.readAction +
          dbActions.deleteAction +
          dbActions.aggregate,
        totalCollections: 0,
      },
    };
  }
);

export const applicationAPIKeyDetailsSelector = createSelector(
  applicationDataSlice,
  (applicationData) => {
    if (applicationData == null) {
      return null;
    }
    return applicationData.api;
  }
);

export const currentExplorerPathSelector = createSelector(
  applicationFilesSelector,
  (applicationFiles) => applicationFiles.currentPath
);

export const explorerObjectsLoadingSelector = createSelector(
  applicationFilesSelector,
  (applicationFiles) => applicationFiles.isLoading
);

export const explorerObjectsErrorSelector = createSelector(
  applicationFilesSelector,
  (applicationFiles) => applicationFiles.error
);

export const explorerObjectsListSelector = createSelector(
  applicationFilesSelector,
  (applicationFiles) => applicationFiles.data
);

export const allEndpointsDataSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.list.data
)

export const allEndpointsLoadingSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.list.isLoading
)

export const allEndpointsErrorSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.list.error
)

export const endpointDetailsDataSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.detail.data
)

export const endpointDetailsLoadingSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.detail.isLoading
)

export const endpointDetailsErrorSelector = createSelector(
  applicationEndpointsSelector,
  (applicationEndpoints) => applicationEndpoints.detail.error
)

