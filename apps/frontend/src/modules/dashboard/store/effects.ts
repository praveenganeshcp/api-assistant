import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  errorInLoadingApplicationsAction,
  loadApplicationsAction,
  applicationsLoadedAction,
  createApplicationAction,
  errorInCreatingApplicationAction,
  applicationCreatedAction,
} from './actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApplicationsRepository } from '@api-assistant/dashboard-fe';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private applicationRepository: ApplicationsRepository
  ) {}

  loadapplications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApplicationsAction),
      exhaustMap(() =>
        this.applicationRepository.fetchApplications().pipe(
          map((applications) =>
            applicationsLoadedAction({ data: applications })
          ),
          catchError(() =>
            of(
              errorInLoadingApplicationsAction({
                error: 'Error in loading applications',
              })
            )
          )
        )
      )
    )
  );

  createapplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createApplicationAction),
      exhaustMap(({ name }) =>
        this.applicationRepository.createApplication(name).pipe(
          map((application) => applicationCreatedAction({ data: application })),
          catchError(() =>
            of(
              errorInCreatingApplicationAction({
                error: 'Error in creating application',
              })
            )
          )
        )
      )
    )
  );
}
