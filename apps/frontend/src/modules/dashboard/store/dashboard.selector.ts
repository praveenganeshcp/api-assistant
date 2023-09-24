import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "./dashboard.state";

export const dashboardSelector = createFeatureSelector<DashboardState>("dashboard");

export const isProjectsLoadingSelector = createSelector(
    dashboardSelector,
    (state) => state.isLoading
)

export const projectsSelector = createSelector(
    dashboardSelector,
    (state) => state.data
)

export const projectLoadError = createSelector(
    dashboardSelector,
    (state) => state.error
)