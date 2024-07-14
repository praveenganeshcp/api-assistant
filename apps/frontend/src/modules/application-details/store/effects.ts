import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  errorInLoadingExplorerObjectsAction,
  errorInLoadingApplicationDetailsAction,
  explorerObjectsLoadedAction,
  goInsideFolderAction,
  loadApplicationDetailsAction,
  applicationDetailsLoadedAction,
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
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  FileObject,
  ApplicationDetailsRepository,
} from '@api-assistant/project-core-fe';
import { AppState } from '../../app/app.state';
import { Endpoint, MinimalEndpointInfo } from '@api-assistant/endpoints-fe';

@Injectable()
export class ApplicationDetailsEffects {
  constructor(
    private actions: Actions,
    private repository: ApplicationDetailsRepository,
    private store: Store<AppState>
  ) {}

  loadApplicationDetails$ = createEffect(() => {
    return this.actions.pipe(
      ofType(loadApplicationDetailsAction),
      exhaustMap(({ applicationId }) => {
        return this.repository.fetchDetails(applicationId).pipe(
          map((applicationDetails) => {
            return applicationDetailsLoadedAction({ applicationDetails });
          }),
          catchError((err) => {
            console.log(err);
            return of(
              errorInLoadingApplicationDetailsAction({
                error: 'Error in fetch project details',
              })
            );
          })
        );
      })
    );
  });

  loadFileObjects$ = createEffect(() => {
    return this.actions.pipe(
      ofType(goInsideFolderAction),
      withLatestFrom(this.store),
      exhaustMap(([action, store]) => {
        const apiKey = store.applicationDetails.application.data?.api.key ?? '';
        const path = store.applicationDetails.files.currentPath;
        return this.repository.fetchExplorerObjects(apiKey, path).pipe(
          map(
            (explorerObjects: FileObject[]) =>
              explorerObjectsLoadedAction({ objects: explorerObjects }),
            catchError(() =>
              of(
                errorInLoadingExplorerObjectsAction({
                  error: 'Error in loading files',
                })
              )
            )
          )
        );
      })
    );
  });

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
