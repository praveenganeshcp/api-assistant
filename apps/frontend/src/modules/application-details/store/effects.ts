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
} from './actions';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  FileObject,
  ApplicationDetailsRepository,
} from '@api-assistant/project-core-fe';
import { AppState } from '../../app/app.state';
import { MinimalEndpointInfo } from '@api-assistant/endpoints-fe';

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
            (endpoints: MinimalEndpointInfo[]) => allEndpointsLoaded({ endpoints }),
            catchError(() => of(
                errorInFetchingEndpoints({
                  error: 'Error in loading endpoints',
                })
              )
            )
          )
        );
      })
    );
  })
}
