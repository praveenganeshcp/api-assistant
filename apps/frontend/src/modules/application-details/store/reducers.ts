import { createFeature, createReducer, on } from '@ngrx/store';
import {
  APPLICATION_DETAILS_SLICE_NAME,
  ApplicationDetailsState,
} from './type';
import {
  applicationDetailsLoadedAction,
  errorInLoadingApplicationDetailsAction,
  loadApplicationDetailsAction,
} from './actions';

const DEFAULT_STATE: ApplicationDetailsState = {
  data: null,
  isLoading: false,
  error: '',
};

export const reducer = createReducer(
  DEFAULT_STATE,
  on(loadApplicationDetailsAction, (state) => ({ ...state, isLoading: true })),
  on(applicationDetailsLoadedAction, (state, payload) => ({
    error: '',
    isLoading: false,
    data: payload.applicationDetails,
  })),
  on(errorInLoadingApplicationDetailsAction, (state, payload) => ({
    error: payload.error,
    data: null,
    isLoading: false,
  }))
);

export const applicationDetailsFeature = createFeature({
  name: APPLICATION_DETAILS_SLICE_NAME,
  reducer,
});
