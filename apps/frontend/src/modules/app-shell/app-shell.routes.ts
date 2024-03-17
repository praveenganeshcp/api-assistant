import { Route } from '@angular/router';
import { DashboardEffects, dashboardFeature } from '@api-assistant/dashboard-fe';
import { ProjectDetailsEffects } from '@api-assistant/project-core-fe';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { projectDetailsFeature } from 'libs/project-core-fe/src/lib/store/reducers';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./components/app-shell/app-shell.component').then(
        (c) => c.AppShellComponent
      ),
    children: [
      {
        path: 'projects',
        loadComponent: () =>
          import('@api-assistant/dashboard-fe').then(
            (m) => m.DashboardComponent
          ),
        providers: [
          provideState(dashboardFeature),
          provideEffects(DashboardEffects)
        ]
      },
      {
        path: 'projects/:projectId',
        loadComponent: () =>
          import(
            '@api-assistant/project-core-fe'
          ).then((m) => m.ProjectDetailsShellComponent),
        providers: [
          provideState(projectDetailsFeature),
          provideEffects(ProjectDetailsEffects)
        ]
      },
    ],
  },
] as Route[];
