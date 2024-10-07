import { createFeature, createReducer, on } from '@ngrx/store';
import { APPLICATION_MIGRATION_SLICE_NAME, MigrationsState } from './types';
import {
  errorInLoadingMigrationDetailsAction,
  errorInLoadingMigrationListAction,
  loadMigrationDetailsAction,
  loadMigrationsListAction,
  migrationDetailsLoadedAction,
  migrationsListLoadedAction,
} from './actions';

const DEFAULT_STATE: MigrationsState = {
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

export const migrationsReducer = createReducer<MigrationsState>(
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

export const applicationMigrationsFeature = createFeature({
  name: APPLICATION_MIGRATION_SLICE_NAME,
  reducer: migrationsReducer,
});
