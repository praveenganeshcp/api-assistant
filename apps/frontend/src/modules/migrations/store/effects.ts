import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MigrationsRepository } from '../migrations.repository';
import {
  applyMigrationAction,
  errorInLoadingMigrationDetailsAction,
  errorInLoadingMigrationListAction,
  errorInUpdatingMigration,
  errorOccuredInApplyMigrationAction,
  errorOccuredInRevertMigrationAction,
  loadMigrationDetailsAction,
  loadMigrationsListAction,
  migrationAppliedAction,
  migrationDetailsLoadedAction,
  migrationRevertedAction,
  migrationsListLoadedAction,
  migrationUpdatedAction,
  revertMigrationAction,
  updateMigrationAction,
} from './actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ApplicationMigration } from '../types';

@Injectable()
export class MigrationsEffects {
  constructor(
    private actions: Actions,
    private readonly repository: MigrationsRepository
  ) {}

  loadAllMigrations$ = createEffect(() => {
    return this.actions.pipe(
      ofType(loadMigrationsListAction),
      exhaustMap(({ applicationId }) => {
        return this.repository.fetchAllMigrations(applicationId).pipe(
          map(
            (migrations: ApplicationMigration[]) =>
              migrationsListLoadedAction({ migrations }),
            catchError(() =>
              of(
                errorInLoadingMigrationListAction({
                  error: 'Error in loading migrations list',
                })
              )
            )
          )
        );
      })
    );
  });

  loadMigrationsDetails$ = createEffect(() => {
    return this.actions.pipe(
      ofType(loadMigrationDetailsAction),
      exhaustMap(({ applicationId, fileName }) => {
        return this.repository.fetchMigration(applicationId, fileName).pipe(
          map(
            (migration: ApplicationMigration & { logic: string }) =>
              migrationDetailsLoadedAction({ migration }),
            catchError(() =>
              of(
                errorInLoadingMigrationDetailsAction({
                  error: 'Error in loading migration details',
                })
              )
            )
          )
        );
      })
    );
  });

  applyMigration$ = createEffect(() => {
    return this.actions.pipe(
      ofType(applyMigrationAction),
      exhaustMap(({ applicationId }) => {
        return this.repository.applyMigration(applicationId).pipe(
          map(
            () => migrationAppliedAction(),
            catchError(() =>
              of(
                errorOccuredInApplyMigrationAction({
                  error: 'Error in applying migration',
                })
              )
            )
          )
        );
      })
    );
  });

  updateMigration$ = createEffect(() => {
    return this.actions.pipe(
      ofType(updateMigrationAction),
      exhaustMap(({ applicationId, fileName, logic }) => {
        return this.repository
          .updateMigrationLogic(applicationId, fileName, logic)
          .pipe(
            map(
              () => migrationUpdatedAction(),
              catchError(() =>
                of(
                  errorInUpdatingMigration({
                    error: 'Error in updating migration',
                  })
                )
              )
            )
          );
      })
    );
  });

  revertMigration$ = createEffect(() => {
    return this.actions.pipe(
      ofType(revertMigrationAction),
      exhaustMap(({ applicationId }) => {
        return this.repository.revertMigration(applicationId).pipe(
          map(
            () => migrationRevertedAction(),
            catchError(() =>
              of(
                errorOccuredInRevertMigrationAction({
                  error: 'Error in reverting migration',
                })
              )
            )
          )
        );
      })
    );
  });
}
