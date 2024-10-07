import {
  ActionCreatorProps,
  createAction as ngrxAction,
  NotAllowedCheck,
  props,
} from '@ngrx/store';
import { ApplicationMigration } from '../types';

const APPLICATION_MIGRATION_ACTION_PREFIX = '[Migrations]';

/**
 * Create application migration related actions with props. Attaches a common prefix in action names
 * @param type Action type
 * @param config Action config
 * @returns Action that can be dispatched to store
 */
function createActionWithProps<T extends string, P extends Object>(
  type: T,
  config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
  return ngrxAction(`${APPLICATION_MIGRATION_ACTION_PREFIX} ${type}`, config);
}

/**
 * Create application details related actions. Attaches a common prefix in action names
 * @param type Action type
 * @returns Action that can be dispatched to store
 */
function createAction<T extends string>(type: T) {
  return ngrxAction(`${APPLICATION_MIGRATION_ACTION_PREFIX} ${type}`);
}

export const loadMigrationsListAction = createActionWithProps(
  'Load data',
  props<{ applicationId: string }>()
);

export const migrationsListLoadedAction = createActionWithProps(
  'Loaded data',
  props<{ migrations: ApplicationMigration[] }>()
);

export const errorInLoadingMigrationListAction = createActionWithProps(
  'Error in loading data',
  props<{ error: string }>()
);

export const applyMigrationAction = createActionWithProps(
  'Apply',
  props<{ applicationId: string }>()
);

export const migrationAppliedAction = createAction('Applied successfuly');

export const errorOccuredInApplyMigrationAction = createActionWithProps(
  'Error in applying migration',
  props<{ error: string }>()
);

export const revertMigrationAction = createActionWithProps(
  'Revert',
  props<{ applicationId: string }>()
);

export const migrationRevertedAction = createAction('Reverted successfuly');

export const errorOccuredInRevertMigrationAction = createActionWithProps(
  'Error in reverting migration',
  props<{ error: string }>()
);

export const loadMigrationDetailsAction = createActionWithProps(
  'Load details',
  props<{ applicationId: string; fileName: string }>()
);

export const migrationDetailsLoadedAction = createActionWithProps(
  'Loaded details',
  props<{ migration: ApplicationMigration & { logic: string } }>()
);

export const errorInLoadingMigrationDetailsAction = createActionWithProps(
  'error in loading details',
  props<{ error: string }>()
);

export const createMigrationAction = createActionWithProps(
  'Create',
  props<{ applicationId: string }>()
);

export const updateMigrationAction = createActionWithProps(
  'Update',
  props<{ applicationId: string; fileName: string; logic: string }>()
);

export const migrationUpdatedAction = createAction('Updated');

export const errorInUpdatingMigration = createActionWithProps(
  'Update failed',
  props<{ error: string }>()
);
