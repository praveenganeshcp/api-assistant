import { createSelector } from '@ngrx/store';
import { GlobalState } from './state';

const projectDetailsSelector = (state: GlobalState) => state.projectDetails;

const projectFilesSelector = createSelector(
  projectDetailsSelector,
  (projectDetails) => projectDetails.files
)

export const projectDataSelector = createSelector(
  projectDetailsSelector,
  (projectDetails) => projectDetails.project
)

export const projectDataLoadingSelector = createSelector(
  projectDataSelector,
  (projectData) => projectData.isLoading
);

export const projectDataErrorSelector = createSelector(
  projectDataSelector,
  (projectData) => projectData.error
);

const projectDataSlice = createSelector(
  projectDataSelector,
  (projectData) => projectData.data
);

export const projectOverviewSelector = createSelector(
  projectDataSlice,
  (projectData) => {
    if (projectData == null) {
      return null;
    }
    const dbActions = projectData.count;
    return {
      id: projectData._id,
      name: projectData.name,
      dbStats: {
        ...dbActions,
        totalActions:
          dbActions.createAction +
          dbActions.updateAction +
          dbActions.readAction +
          dbActions.deleteAction +
          dbActions.aggregate,
        totalCollections: 0,
      }
    };
  }
);

export const projectAPIKeyDetailsSelector = createSelector(
  projectDataSlice,
  (projectData) => {
    if (projectData == null) {
      return null;
    }
    return projectData.api;
  }
);

export const currentExplorerPathSelector = createSelector(
  projectFilesSelector,
  (projectFiles) => projectFiles.currentPath
)

export const explorerObjectsLoadingSelector = createSelector(
  projectFilesSelector,
  (projectFiles) => projectFiles.isLoading
)

export const explorerObjectsErrorSelector = createSelector(
  projectFilesSelector,
  (projectFiles) => projectFiles.error
)

export const explorerObjectsListSelector = createSelector(
  projectFilesSelector,
  (projectFiles) => projectFiles.objects
)