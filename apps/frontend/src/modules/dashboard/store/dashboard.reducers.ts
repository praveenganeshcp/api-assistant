import { createReducer, on } from '@ngrx/store';
import {
  errorInLoadingProjects,
  loadProjects,
  projectsLoaded,
  createProject,
  errorInCreatingProject,
  projectCreated,
} from './dashboard.actions';
import { DashboardState } from './dashboard.state';

const DASHBOARD_STATE: DashboardState = {
  projects: {
    data: [],
    error: '',
    isLoading: false,
  },
  createProject: {
    inProgress: false,
    error: '',
    isCreated: false,
  },
};

export const dashboardReducers = createReducer(
  DASHBOARD_STATE,
  on(loadProjects, (state) => ({
    ...state,
    projects: {
      ...state.projects,
      isLoading: true,
    },
  })),
  on(projectsLoaded, (state, { data }) => ({
    ...state,
    projects: {
      isLoading: false,
      data,
      error: '',
    },
  })),
  on(errorInLoadingProjects, (state, { error }) => ({
    ...state,
    projects: {
      isLoading: false,
      data: [],
      error,
    },
  })),
  on(createProject, (state) => ({
    ...state,
    createProject: {
      ...state.createProject,
      inProgress: true,
    },
  })),
  on(errorInCreatingProject, (state, { error }) => ({
    ...state,
    createProject: {
      isCreated: false,
      error,
      inProgress: false,
    },
  })),
  on(projectCreated, (state, { data }) => ({
    projects: {
      ...state.projects,
      data: [data, ...state.projects.data],
    },
    createProject: {
      isCreated: true,
      error: '',
      inProgress: false,
    },
  }))
);
