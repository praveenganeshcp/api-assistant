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
    objects: [],
    error: '',
  },
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
      objects: [],
      error: '',
    },
  })),
  on(explorerObjectsLoadedAction, (state, { objects }) => ({
    ...state,
    files: {
      ...state.files,
      isLoading: false,
      objects,
      error: '',
    },
  })),
  on(errorInLoadingExplorerObjectsAction, (state, { error }) => ({
    ...state,
    files: {
      ...state.files,
      isLoading: false,
      objects: [],
      error,
    },
  }))
);

export const applicationDetailsFeature = createFeature({
  name: APPLICATION_DETAILS_SLICE_NAME,
  reducer: applicationDetailsReducer,
});

export const { name, reducer } = applicationDetailsFeature;
