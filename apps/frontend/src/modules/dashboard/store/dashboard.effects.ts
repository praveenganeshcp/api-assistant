import { Actions, createEffect, ofType } from "@ngrx/effects";
import { errorInLoadingProjects, loadProjects, projectsLoaded } from "./dashboard.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { ProjectsService } from "../services/projects.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProjectsEffects {

    constructor(
        private actions$: Actions,
        private projectsService: ProjectsService                                                                                                                              
    ) {}

    loadProjects$ = createEffect(() => this.actions$.pipe(
        ofType(loadProjects),
        exhaustMap(() => this.projectsService.loadProjects().pipe(
            map((projects) => projectsLoaded({data: projects})),
            catchError((err) => of(errorInLoadingProjects({error: "Error in loading projects"})))
        ))
    ))
}