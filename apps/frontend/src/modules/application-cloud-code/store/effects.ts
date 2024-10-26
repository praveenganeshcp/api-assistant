import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { allRequestHandlersLoadedAction, errorInFetchingHandlerCodeAction, errorInFetchingRequestHandlerssAction, errorInUpdatingHandlerCodeAction, fetchAllRequestHandlersAction, fetchRequestHandlerCodeAction, requestHandlerCodeFetchedAction, requestHandlerCodeUpdatedAction, updateRequestHandlerCodeAction } from "./actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { ApplicationCloudCodeRepository } from "@api-assistant/application-cloud-code-fe";

@Injectable()
export class ApplicationCloudCodeEffects {

    private readonly actions = inject(Actions);

    private readonly repository = inject(ApplicationCloudCodeRepository);

    loadAllRequestHandlers$ = createEffect(() => {
        return this.actions.pipe(
          ofType(fetchAllRequestHandlersAction),
          exhaustMap(({ applicationId }) => {
            return this.repository.fetchAllRequestHandlers(applicationId).pipe(
              map(
                (files: string[]) =>
                  allRequestHandlersLoadedAction({ files }),
                catchError(() =>
                  of(
                    errorInFetchingRequestHandlerssAction({
                      error: 'Error in loading handlers',
                    })
                  )
                )
              )
            );
          })
        );
      });
    
    fetchRequestHandlerCode$ = createEffect(() => {
        return this.actions.pipe(
          ofType(fetchRequestHandlerCodeAction),
          exhaustMap(({ applicationId, fileName }) => {
            return this.repository.fetchRequestHandlerCode(applicationId, fileName).pipe(
              map(
                (response) =>
                  requestHandlerCodeFetchedAction({ code: response.code }),
                catchError(() =>
                  of(
                    errorInFetchingHandlerCodeAction({
                      error: 'Error in loading handler code',
                    })
                  )
                )
              )
            );
          })
        );
      });

    updateRequestHandlerCode$ = createEffect(() => {
        return this.actions.pipe(
          ofType(updateRequestHandlerCodeAction),
          exhaustMap(({ applicationId, fileName, code}) => {
            return this.repository.updateHandlerCode(applicationId, fileName, code).pipe(
              map(
                () =>
                  requestHandlerCodeUpdatedAction(),
                catchError(() =>
                  of(
                    errorInUpdatingHandlerCodeAction({
                      error: 'Error in updating handler code',
                    })
                  )
                )
              )
            );
          })
        );
      });
    
}