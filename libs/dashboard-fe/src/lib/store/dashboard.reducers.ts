import { createFeature, createReducer, on } from '@ngrx/store';
import {
  errorInLoadingProjectsAction,
  loadProjectsAction,
  projectsLoadedAction,
} from './dashboard.actions';
import { DASHBOARD_SLICE_NAME, DashboardState } from './dashboard.state';

const DASHBOARD_STATE: DashboardState = {
    data: [],
    error: '',
    isLoading: false,
};

const dashboardReducers = createReducer(
  DASHBOARD_STATE,
  on(loadProjectsAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(projectsLoadedAction, (state, { data }) => ({
    isLoading: false,
    data,
    error: '',   
  })),
  on(errorInLoadingProjectsAction, (state, { error }) => ({
    isLoading: false,
    data: [],
    error,
  }))
);

export const dashboardFeature = createFeature({
  name: DASHBOARD_SLICE_NAME,
  reducer: dashboardReducers
})

export const {
  reducer,
  name,
  selectDashboardState,
  selectData,
  selectError,
  selectIsLoading
} = dashboardFeature;