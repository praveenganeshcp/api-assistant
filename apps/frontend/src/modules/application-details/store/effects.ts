import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApplicationDetailsRepository } from '../application-details.repository';
import {
  applicationDetailsLoadedAction,
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
}
