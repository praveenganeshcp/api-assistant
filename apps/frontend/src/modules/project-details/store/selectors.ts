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