import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApplicationDetailsRepository } from '../application-details.repository';
import {
  applicationDeletedAction,
  applicationDetailsLoadedAction,
  deleteApplicationAction,
  errorInDeletingApplicationAction,
  errorInLoadingApplicationDetailsAction,
  loadApplicationDetailsAction,
} from './actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ApplicationDetailsEffects {
  constructor(
    private readonly actions: Actions,
    private readonly repo: ApplicationDetailsRepository
  ) {}

  fetchApplicationDetails$ = createEffect(() => {
    return this.actions.pipe(
      ofType(loadApplicationDetailsAction),
      exhaustMap((payload) => {
        return this.repo.fetchApplicationById(payload.applicationId).pipe(
          map((applicationDetails) =>
            applicationDetailsLoadedAction({ applicationDetails })
          ),
          catchError(() =>
            of(
              errorInLoadingApplicationDetailsAction({
                error: 'Error in fetching details',
              })
            )
          )
        );
      })
    );
  });

  deleteApplication$ = createEffect(() => {
    return this.actions.pipe(
      ofType(deleteApplicationAction),
      exhaustMap((payload) => {
        return this.repo.deleteApplicationById(payload.applicationId).pipe(
          map(() =>
            applicationDeletedAction()
          ),
          catchError(() =>
            of(
              errorInDeletingApplicationAction({
                error: 'Error in deleting application',
              })
            )
          )
        );
      })
    );
  });
}
