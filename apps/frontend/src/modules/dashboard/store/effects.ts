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

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApplicationsAction),
      exhaustMap(() =>
        this.applicationRepository.fetchApplications().pipe(
          map((projects) => applicationsLoadedAction({ data: projects })),
          catchError(() =>
            of(
              errorInLoadingApplicationsAction({
                error: 'Error in loading projects',
              })
            )
          )
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createApplicationAction),
      exhaustMap(({ name }) =>
        this.applicationRepository.createApplication(name).pipe(
          map((project) => applicationCreatedAction({ data: project })),
          catchError(() =>
            of(
              errorInCreatingApplicationAction({
                error: 'Error in creating project',
              })
            )
          )
        )
      )
    )
  );
}
