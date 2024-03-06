import { createSelector } from "@ngrx/store";
import { AppState } from "../../app/app.state";

const projectDetailsSelector = (state: AppState) => state.projectDetails;

export const projectDetailsLoadingSelector = createSelector(
    projectDetailsSelector,
    (projectDetailsState) => projectDetailsState.isLoading
)

export const projectDetailsErrorSelector = createSelector(
    projectDetailsSelector,
    (projectDetailsState) => projectDetailsState.error
)

const projectDataSlice = createSelector(
    projectDetailsSelector,
    (projectDetailsState) => projectDetailsState.data
)

export const projectOverviewSelector = createSelector(
    projectDataSlice,
    (projectData) => {
        if(projectData == null) {
            return null;
        }
        const dbActions = projectData.metadata.count;
        return {
            id: projectData._id,
            name: projectData.name,
            createdOn: projectData.createdOn,
            dbStats: {
                ...dbActions,
                totalActions: (
                    dbActions.createAction +
                    dbActions.updateAction +
                    dbActions.readAction +
                    dbActions.deleteAction +
                    dbActions.aggregate
                ),
                totalCollections: 0
            },
            storage: projectData.metadata.storage,
            noOfFiles: projectData.metadata.noOfFiles,
            totalUsers: projectData.metadata.users
        }
        
    }
)