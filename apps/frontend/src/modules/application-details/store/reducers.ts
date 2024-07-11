import { createFeature, createReducer, on } from '@ngrx/store';
import {
  APPLICATION_DETAILS_SLICE_NAME,
  ApplicationDetailsState,
} from './state';
import {
  loadApplicationDetailsAction,
  applicationDetailsLoadedAction,
  errorInLoadingApplicationDetailsAction,
  goInsideFolderAction,
  explorerObjectsLoadedAction,
  errorInLoadingExplorerObjectsAction,
  allEndpointsLoaded,
  fetchAllEndpoints,
  errorInFetchingEndpoints,
} from './actions';

const APPLICATION_DETAILS_DEFAULT_STATE: ApplicationDetailsState = {
  application: {
    isLoading: false,
    data: null,
    error: '',
  },
  files: {
    isLoading: false,
    currentPath: '',
    data: [],
    error: '',
  },
  endpoints: {
    list: {
      isLoading: false,
      data: [],
      error: ''
    }
  }
};

const applicationDetailsReducer = createReducer(
  APPLICATION_DETAILS_DEFAULT_STATE,
  on(loadApplicationDetailsAction, (state) => ({
    ...state,
    application: {
      isLoading: true,
      error: '',
      data: null,
    },
  })),
  on(applicationDetailsLoadedAction, (state, { applicationDetails }) => ({
    ...state,
    application: {
      isLoading: false,
      data: applicationDetails,
      error: '',
    },
  })),
  on(errorInLoadingApplicationDetailsAction, (state, { error }) => ({
    ...state,
    application: {
      isLoading: false,
      data: null,
      error,
    },
  })),
  on(goInsideFolderAction, (state, { folderPath }) => ({
    ...state,
    files: {
      isLoading: true,
      currentPath: folderPath,
      data: [],
      error: '',
    },
  })),
  on(explorerObjectsLoadedAction, (state, { objects }) => ({
    ...state,
    files: {
      ...state.files,
      isLoading: false,
      data: objects,
      error: '',
    },
  })),
  on(errorInLoadingExplorerObjectsAction, (state, { error }) => ({
    ...state,
    files: {
      ...state.files,
      isLoading: false,
      data: [],
      error,
    },
  })),
  on(fetchAllEndpoints, (state) => ({
    ...state,
    endpoints: {
      ...state.endpoints,
      list: {
        isLoading: true,
        data: [],
        error: ''
      }
    }
  })),
  on(allEndpointsLoaded, (state, { endpoints }) => ({
    ...state,
    endpoints: {
      ...state.endpoints,
      list: {
        isLoading: false,
        data: endpoints,
        error: ''
      }
    }
  })),
  on(errorInFetchingEndpoints, (state, { error }) => ({
    ...state,
    endpoints: {
      ...state.endpoints,
      list: {
        isLoading: false,
        data: [],
        error
      }
    }
  }))
);

export const applicationDetailsFeature = createFeature({
  name: APPLICATION_DETAILS_SLICE_NAME,
  reducer: applicationDetailsReducer,
});

export const { name, reducer } = applicationDetailsFeature;
