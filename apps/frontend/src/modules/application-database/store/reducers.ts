import { createReducer, on } from '@ngrx/store';
import { ApplicationDatabaseState } from './types';
import {
  collectionsLoadedAction,
  errorInExecutingQueryAction,
  errorInLoadingCollectionsAction,
  executeQueryAction,
  loadCollectionsAction,
  queryExecutedAction,
} from './actions';

const DEFAULT_STATE: ApplicationDatabaseState = {
  collections: {
    isLoading: false,
    data: [],
    error: '',
  },
  result: {
    data: null,
    error: '',
    isLoading: false,
  },
};

export const applicationDatabaseReducer = createReducer(
  DEFAULT_STATE,
  on(loadCollectionsAction, (state) => ({
    ...state,
    collections: { ...state.collections, isLoading: true },
  })),
  on(collectionsLoadedAction, (state, { collections }) => ({
    ...state,
    collections: { data: collections, isLoading: false, error: '' },
  })),
  on(errorInLoadingCollectionsAction, (state, { error }) => ({
    ...state,
    collections: { data: [], isLoading: false, error },
  })),
  on(executeQueryAction, (state) => ({
    ...state,
    result: { ...state.result, isLoading: true },
  })),
  on(queryExecutedAction, (state, { result }) => ({
    ...state,
    result: { data: result, isLoading: false, error: '' },
  })),
  on(errorInExecutingQueryAction, (state, { error }) => ({
    ...state,
    result: { data: null, isLoading: false, error },
  }))
);
