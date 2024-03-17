import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { errorInLoadingExplorerObjectsAction, errorInLoadingProjectDetailsAction, explorerObjectsLoadedAction, goInsideFolderAction, loadProjectDetailsAction, projectDetailsLoadedAction } from "./actions";
import { catchError, exhaustMap, map, of, withLatestFrom } from "rxjs";
import { ProjectDetailsRepository } from "../repository/project-details.repository";
import { Store } from "@ngrx/store";
import { GlobalState } from "./state";
import { FileObject } from "../types";

@Injectable()
export class ProjectDetailsEffects {

    constructor(
        private actions: Actions,
        private repository: ProjectDetailsRepository,
        private store: Store<GlobalState>,
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

    loadFileObjects$ = createEffect(() => {
        return this.actions.pipe(
            ofType(goInsideFolderAction),
            withLatestFrom(this.store),
            exhaustMap(([action, store]) => {
                const apiKey = store.projectDetails.project.data?.api.key ?? "";
                const path = store.projectDetails.files.currentPath;
                return this.repository.fetchExplorerObjects(apiKey, path).pipe(
                    map(((explorerObjects: FileObject[]) => explorerObjectsLoadedAction({ objects: explorerObjects })),
                    catchError(() => of(errorInLoadingExplorerObjectsAction({error: 'Error in loading files'})))
                ))
            })
        )
    })
}