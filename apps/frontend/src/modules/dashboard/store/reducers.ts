import { createFeature, createReducer, on } from '@ngrx/store';
import {
  errorInLoadingApplicationsAction,
  loadApplicationsAction,
  applicationsLoadedAction,
} from './actions';
import { DASHBOARD_SLICE_NAME, DashboardState } from './state';

const DASHBOARD_STATE: DashboardState = {
  data: [],
  error: '',
  isLoading: false,
};

const dashboardReducers = createReducer(
  DASHBOARD_STATE,
  on(loadApplicationsAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(applicationsLoadedAction, (state, { data }) => ({
    isLoading: false,
    data,
    error: '',
  })),
  on(errorInLoadingApplicationsAction, (state, { error }) => ({
    isLoading: false,
    data: [],
    error,
  }))
);

export const dashboardFeature = createFeature({
  name: DASHBOARD_SLICE_NAME,
  reducer: dashboardReducers,
});

export const {
  reducer,
  name,
  selectDashboardState,
  selectData,
  selectError,
  selectIsLoading,
} = dashboardFeature;
