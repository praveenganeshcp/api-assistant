import { Route } from '@angular/router';
import { DashboardEffects, dashboardFeature } from '@api-assistant/dashboard-fe';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

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
            '../project-details/components/project-details-shell/project-details-shell.component'
          ).then((m) => m.ProjectDetailsShellComponent),
      },
    ],
  },
] as Route[];
