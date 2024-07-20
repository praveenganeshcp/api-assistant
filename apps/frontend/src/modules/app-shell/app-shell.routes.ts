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
        path: 'applications',
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
        path: 'applications/:applicationId',
        loadComponent: () =>
          import(
            '../application-details/components/applications-details-host/application-details-host.component'
          ).then((m) => m.ApplicationDetailsHostComponent),
        providers: [
          provideState(applicationDetailsFeature),
          provideEffects(ApplicationDetailsEffects),
        ],
        children: [
          {
            path: 'endpoints',
            loadComponent: () =>
              import(
                '../endpoints/components/application-endpoints-host/application-endpoints-host.component'
              ).then((c) => c.ApplicationEndpointsHostComponent),
          },
          {
            path: 'endpoints/create',
            loadComponent: () =>
              import(
                '../endpoints/components/create-endpoints-host/create-endpoints-host.component'
              ).then((c) => c.CreateEndpointsHostComponent),
          },
          {
            path: 'endpoints/:endpointId/edit',
            loadComponent: () =>
              import(
                '../endpoints/components/edit-endpoints-host/edit-endpoints-host.component'
              ).then((c) => c.EditEndpointsHostComponent),
          },
          {
            path: 'users',
            loadComponent: () =>
              import(
                '../application-users/components/application-users-grid/application-users-grid.component'
              ).then((c) => c.ApplicationUsersGridComponent),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users',
          },
        ],
      },
    ],
  },
] as Route[];
