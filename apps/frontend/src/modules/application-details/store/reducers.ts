import { createReducer, on } from '@ngrx/store';
import { ApplicationDetailsState } from './type';
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

export const applicationDetailsreducer = createReducer(
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
