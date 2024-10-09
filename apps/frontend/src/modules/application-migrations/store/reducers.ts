import { createReducer, on } from '@ngrx/store';
import { ApplicationMigrationsState } from './types';
import {
  errorInLoadingMigrationDetailsAction,
  errorInLoadingMigrationListAction,
  loadMigrationDetailsAction,
  loadMigrationsListAction,
  migrationDetailsLoadedAction,
  migrationsListLoadedAction,
} from './actions';

const DEFAULT_STATE: ApplicationMigrationsState = {
  list: {
    data: [],
    isLoading: false,
    error: '',
  },
  details: {
    data: null,
    isLoading: false,
    error: '',
  },
};

export const applicationMigrationsReducer =
  createReducer<ApplicationMigrationsState>(
    DEFAULT_STATE,
    on(loadMigrationsListAction, (state) => ({
      ...state,
      list: { ...state.list, isLoading: true },
    })),
    on(migrationsListLoadedAction, (state, payload) => ({
      ...state,
      list: { data: payload.migrations, isLoading: false, error: '' },
    })),
    on(errorInLoadingMigrationListAction, (state, payload) => ({
      ...state,
      list: { data: [], isLoading: false, error: payload.error },
    })),
    on(loadMigrationDetailsAction, (state) => ({
      ...state,
      details: { isLoading: true, data: null, error: '' },
    })),
    on(migrationDetailsLoadedAction, (state, { migration }) => ({
      ...state,
      details: { isLoading: false, data: migration, error: '' },
    })),
    on(errorInLoadingMigrationDetailsAction, (state, { error }) => ({
      ...state,
      details: { isLoading: false, data: null, error },
    }))
  );
