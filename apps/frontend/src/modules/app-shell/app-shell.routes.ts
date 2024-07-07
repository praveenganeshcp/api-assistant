import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { dashboardFeature } from '../dashboard/store/reducers';
import { DashboardEffects } from '../dashboard/store/effects';
import { ApplicationDetailsEffects } from '../application-details/store/effects';
import { applicationDetailsFeature } from '../application-details/store/reducers';

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
          import(
            '../dashboard/components/dashboard-host/dashboard-host.component'
          ).then((m) => m.DashboardHostComponent),
        providers: [
          provideState(dashboardFeature),
          provideEffects(DashboardEffects),
        ],
      },
      {
        path: 'projects/:applicationId',
        loadComponent: () =>
          import(
            '../application-details/components/project-details-host/project-details-host.component'
          ).then((m) => m.ProjectDetailsHostComponent),
        providers: [
          provideState(applicationDetailsFeature),
          provideEffects(ApplicationDetailsEffects),
        ],
      },
    ],
  },
] as Route[];
