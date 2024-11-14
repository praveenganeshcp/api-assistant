import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApplicationDetailsRepository } from "../../application-details/application-details.repository";
import { applicationLogsFetchedAction, errorInFetchingApplicationLogsAction, fetchApplicationLogsAction } from "./actions";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class ApplicationsLogsEffects {

    private readonly applicationDetailsRepo = inject(ApplicationDetailsRepository)

    private readonly actions = inject(Actions);

    fetchLogs$ = createEffect(() => this.actions.pipe(
        ofType(fetchApplicationLogsAction),
        exhaustMap((payload) => {
            return this.applicationDetailsRepo.fetchApplicationLogsById(payload.applicationId).pipe(
                map(response => applicationLogsFetchedAction({ logs: response.logs })),
                catchError((err) => of(errorInFetchingApplicationLogsAction({ error: "error in fetching logs" })))
            )
        })
    ))
}