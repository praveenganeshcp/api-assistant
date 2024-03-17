import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  errorInLoadingProjectsAction,
  loadProjectsAction,
  projectsLoadedAction,
  createProjectAction,
  errorInCreatingProjectAction,
  projectCreatedAction,
} from './dashboard.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProjectRepository } from '../repositories/project.repository';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private projectsRepository: ProjectRepository
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectsAction),
      exhaustMap(() =>
        this.projectsRepository.loadProjects().pipe(
          map((projects) => projectsLoadedAction({ data: projects })),
          catchError(() =>
            of(errorInLoadingProjectsAction({ error: 'Error in loading projects' }))
          )
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProjectAction),
      exhaustMap(({ name }) =>
        this.projectsRepository.createProject(name).pipe(
          map((project) => projectCreatedAction({ data: project })),
          catchError(() =>
            of(errorInCreatingProjectAction({ error: 'Error in creating project' }))
          )
        )
      )
    )
  );
}
