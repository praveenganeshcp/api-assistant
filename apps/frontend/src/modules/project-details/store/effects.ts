import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { errorInLoadingProjectDetailsAction, loadProjectDetailsAction, projectDetailsLoadedAction } from "./actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { ProjectDetailsRepository } from "../repository/project-details.repository";

@Injectable()
export class ProjectDetailsEffects {

    constructor(
        private actions: Actions,
        private repository: ProjectDetailsRepository
    ) {}

    loadProjectDetails$ = createEffect(() => {
        return this.actions.pipe(
            ofType(loadProjectDetailsAction),
            exhaustMap(({ projectId }) => {
                return this.repository.fetchDetails(projectId).pipe(
                    map((projectDetails) => projectDetailsLoadedAction({ projectDetails })),
                    catchError(() => of(errorInLoadingProjectDetailsAction({error: 'Error in fetch project details'})))
                )
            })
        )
    })
}