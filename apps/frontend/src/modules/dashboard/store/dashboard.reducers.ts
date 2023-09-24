import { createReducer, on } from "@ngrx/store";
import { DASHBOARD_STATE } from "./dashboard.state";
import { errorInLoadingProjects, loadProjects, projectsLoaded } from "./dashboard.actions";

export const dashboardReducers = createReducer(
    DASHBOARD_STATE,
    on(loadProjects, (state) => ({
        ...state,
        isLoading: true
    })),
    on(projectsLoaded, (state, {data}) => ({
        isLoading: false,
        data,
        error: ""
    })),
    on(errorInLoadingProjects, (state, {error}) => ({
        ...state,
        data: [],
        error
    }))
)