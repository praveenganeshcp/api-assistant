import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApplicationDatabaseRepository } from '../application-db.repository';
import {
  collectionsLoadedAction,
  errorInExecutingQueryAction,
  errorInLoadingCollectionsAction,
  executeQueryAction,
  loadCollectionsAction,
  queryExecutedAction,
} from './actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ApplicationDatabaseEffects {
  constructor(
    private readonly actions: Actions,
    private readonly repository: ApplicationDatabaseRepository
  ) {}

  loadCollections$ = createEffect(() => {
    return this.actions.pipe(
      ofType(loadCollectionsAction),
      exhaustMap(({ applicationId }) => {
        return this.repository.fetchCollections(applicationId).pipe(
          map((collections) => collectionsLoadedAction({ collections })),
          catchError((error) => of(errorInLoadingCollectionsAction({ error })))
        );
      })
    );
  });

  executeQuery$ = createEffect(() => {
    return this.actions.pipe(
      ofType(executeQueryAction),
      exhaustMap(({ applicationId, actionDef }) => {
        return this.repository.executeQuery(applicationId, actionDef).pipe(
          map((result) => queryExecutedAction({ result })),
          catchError((error) => of(errorInExecutingQueryAction({ error })))
        );
      })
    );
  });
}
