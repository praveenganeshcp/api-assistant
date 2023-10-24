import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  errorInLoadingProjects,
  loadProjects,
  projectsLoaded,
  createProject,
  errorInCreatingProject,
  projectCreated,
} from './dashboard.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProjectsService } from '../services/projects.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      exhaustMap(() =>
        this.projectsService.loadProjects().pipe(
          map((projects) => projectsLoaded({ data: projects })),
          catchError(() =>
            of(errorInLoadingProjects({ error: 'Error in loading projects' }))
          )
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProject),
      exhaustMap(({ name }) =>
        this.projectsService.createProject(name).pipe(
          map((project) => projectCreated({ data: project })),
          catchError(() =>
            of(errorInCreatingProject({ error: 'Error in creating project' }))
          )
        )
      )
    )
  );
}
