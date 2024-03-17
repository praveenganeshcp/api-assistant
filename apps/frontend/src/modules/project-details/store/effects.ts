import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { errorInLoadingExplorerObjectsAction, errorInLoadingProjectDetailsAction, explorerObjectsLoadedAction, goInsideFolderAction, loadProjectDetailsAction, projectDetailsLoadedAction } from "./actions";
import { catchError, exhaustMap, map, mergeMap, of, withLatestFrom } from "rxjs";
import { ProjectDetailsRepository } from "../repository/project-details.repository";
import { Store } from "@ngrx/store";
import { AppState } from "../../app/app.state";
import { FileObject } from "./state";

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

@Injectable()
export class FileExplorerEffects {

    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private repository: ProjectDetailsRepository
    ) {}

    loadFileObjects$ = createEffect(() => {
        return this.actions.pipe(
            ofType(goInsideFolderAction),
            withLatestFrom(this.store),
            exhaustMap(([action, store]) => {
                const apiKey = store.projectDetails.data?.metadata.apiKey;
                const path = store.fileExplorer.currentPath;
                return this.repository.fetchExplorerObjects(apiKey ?? "", path).pipe(
                    map(((explorerObjects: FileObject[]) => explorerObjectsLoadedAction({ objects: explorerObjects })),
                    catchError(() => of(errorInLoadingExplorerObjectsAction({error: 'Error in loading files'})))
                ))
            })
        )
    })
}