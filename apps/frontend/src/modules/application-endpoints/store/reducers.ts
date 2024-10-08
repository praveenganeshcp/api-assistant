import { createFeature, createReducer, on } from '@ngrx/store';
import {
  APPLICATION_ENDPOINTS_SLICE_NAME,
  ApplicationEndpointsState,
} from './types';
import {
  allEndpointsLoadedAction,
  endpointDetailsFetchedAction,
  errorInFetchingEndpointDetailsAction,
  errorInFetchingEndpointsAction,
  fetchAllEndpointsAction,
  fetchEndpointDetailsAction,
  resetEndpointDetailsStateAction,
} from './actions';

const DEFAULT_STATE: ApplicationEndpointsState = {
  list: {
    isLoading: false,
    data: [],
    error: '',
  },
  detail: {
    isLoading: false,
    data: null,
    error: '',
  },
};

const reducer = createReducer(
  DEFAULT_STATE,
  on(fetchAllEndpointsAction, (state) => ({
    ...state,
    list: {
      isLoading: true,
      data: [],
      error: '',
    },
  })),
  on(allEndpointsLoadedAction, (state, { endpoints }) => ({
    ...state,
    list: {
      isLoading: false,
      data: endpoints,
      error: '',
    },
  })),
  on(errorInFetchingEndpointsAction, (state, { error }) => ({
    ...state,
    list: {
      isLoading: false,
      data: [],
      error,
    },
  })),
  on(fetchEndpointDetailsAction, (state) => ({
    ...state,
    detail: {
      isLoading: true,
      data: null,
      error: '',
    },
  })),
  on(endpointDetailsFetchedAction, (state, { endpoint }) => ({
    ...state,
    detail: {
      isLoading: false,
      data: endpoint,
      error: '',
    },
  })),
  on(errorInFetchingEndpointDetailsAction, (state, { error }) => ({
    ...state,
    detail: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(resetEndpointDetailsStateAction, (state) => ({
    ...state,
    detail: {
      isLoading: false,
      data: null,
      error: '',
    },
  }))
);

export const applicationEndpointsFeature = createFeature({
  name: APPLICATION_ENDPOINTS_SLICE_NAME,
  reducer,
});
