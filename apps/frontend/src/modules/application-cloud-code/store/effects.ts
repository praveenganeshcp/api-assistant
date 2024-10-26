import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { allRequestHandlersLoadedAction, errorInFetchingRequestHandlerssAction, fetchAllRequestHandlersAction } from "./actions";
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
    
}