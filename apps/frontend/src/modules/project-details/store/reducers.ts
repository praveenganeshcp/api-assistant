import { createReducer, on } from "@ngrx/store";
import { ProjectDetailsState } from "./state";
import { errorInLoadingProjectDetailsAction, loadProjectDetailsAction, projectDetailsLoadedAction } from "./actions";

const PROJECT_DETAILS_DEFAULT_STATE: ProjectDetailsState = {
    isLoading: false,
    data: null,
    error: ''
}

export const projectDetailsReducer = createReducer(
    PROJECT_DETAILS_DEFAULT_STATE,
    on(loadProjectDetailsAction, (state) => ({
        ...state,
        isLoading: true,
        error: ''
    })),
    on(projectDetailsLoadedAction, (state, { projectDetails }) => ({
        isLoading: false,
        data: projectDetails,
        error: ''
    })),
    on(errorInLoadingProjectDetailsAction, (state, { error }) => ({
        isLoading: false,
        data: null,
        error
    }))
)