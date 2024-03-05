import { createReducer, on } from '@ngrx/store';
import {
  errorInLoadingProjectsAction,
  loadProjectsAction,
  projectsLoadedAction,
  createProjectAction,
  errorInCreatingProjectAction,
  projectCreatedAction,
} from './dashboard.actions';
import { DashboardState } from './dashboard.state';

const DASHBOARD_STATE: DashboardState = {
  projects: {
    data: [],
    error: '',
    isLoading: false,
  }
};

export const dashboardReducers = createReducer(
  DASHBOARD_STATE,
  on(loadProjectsAction, (state) => ({
    ...state,
    projects: {
      ...state.projects,
      isLoading: true,
    },
  })),
  on(projectsLoadedAction, (state, { data }) => ({
    ...state,
    projects: {
      isLoading: false,
      data,
      error: '',
    },
  })),
  on(errorInLoadingProjectsAction, (state, { error }) => ({
    ...state,
    projects: {
      isLoading: false,
      data: [],
      error,
    },
  }))
);
