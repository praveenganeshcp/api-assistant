import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchAllEndpoints,
  allEndpointsLoaded,
  errorInFetchingEndpoints,
  fetchEndpointDetails,
  endpointDetailsFetched,
  errorInFetchingEndpointDetails,
  deleteEndpointAction,
  endpointDeletedAction,
  errorInDeletingEndpointAction,
  createEndpointAction,
  endpointCreatedAction,
  errorInCreatingEndpointAction,
  editEndpointAction,
  endpointUpdateSuccessAction,
  errorInUpdatingEndpointAction,
} from './actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  Endpoint,
  EndpointsFeRepository,
  MinimalEndpointInfo,
} from '@api-assistant/endpoints-fe';

@Injectable()
export class ApplicationDetailsEffects {
  constructor(
    private actions: Actions,
    private readonly repository: EndpointsFeRepository
  ) {}

  loadAllEndpoints$ = createEffect(() => {
    return this.actions.pipe(
      ofType(fetchAllEndpoints),
      exhaustMap(({ applicationId }) => {
        return this.repository.fetchAllEndpoints(applicationId).pipe(
          map(
            (endpoints: MinimalEndpointInfo[]) =>
              allEndpointsLoaded({ endpoints }),
            catchError(() =>
              of(
                errorInFetchingEndpoints({
                  error: 'Error in loading endpoints',
                })
              )
            )
          )
        );
      })
    );
  });

  loadEndpointDetails$ = createEffect(() => {
    return this.actions.pipe(
      ofType(fetchEndpointDetails),
      exhaustMap(({ applicationId, endpointId }) => {
        return this.repository
          .fetchEndpointDetail(applicationId, endpointId)
          .pipe(
            map(
              (endpoint: Endpoint) => endpointDetailsFetched({ endpoint }),
              catchError(() =>
                of(
                  errorInFetchingEndpointDetails({
                    error: 'Error in loading endpoint details',
                  })
                )
              )
            )
          );
      })
    );
  });

  deleteEndpoint$ = createEffect(() => {
    return this.actions.pipe(
      ofType(deleteEndpointAction),
      exhaustMap(({ applicationId, endpointId }) => {
        return this.repository
          .deleteEndpointById(applicationId, endpointId)
          .pipe(
            map(() => endpointDeletedAction()),
            catchError(() =>
              of(errorInDeletingEndpointAction({ error: 'Error occured' }))
            )
          );
      })
    );
  });

  createEndpoint$ = createEffect(() => {
    return this.actions.pipe(
      ofType(createEndpointAction),
      exhaustMap(({ applicationId, endpoint }) => {
        return this.repository.createEndpoint(applicationId, endpoint).pipe(
          map((endpoint) => endpointCreatedAction({ endpoint })),
          catchError(() =>
            of(errorInCreatingEndpointAction({ error: 'Error occured' }))
          )
        );
      })
    );
  });

  editEndpoint$ = createEffect(() => {
    return this.actions.pipe(
      ofType(editEndpointAction),
      exhaustMap(({ applicationId, endpointId, endpoint }) => {
        return this.repository
          .editEndpoint(applicationId, endpointId, endpoint)
          .pipe(
            map((endpoint) => endpointUpdateSuccessAction({ endpoint })),
            catchError(() =>
              of(errorInUpdatingEndpointAction({ error: 'Error occured' }))
            )
          );
      })
    );
  });
}
