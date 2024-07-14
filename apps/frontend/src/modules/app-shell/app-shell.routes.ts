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
        children: [
          {
            path: 'endpoints',
            loadComponent: () =>
              import(
                '../application-details/components/application-endpoints-host/application-endpoints-host.component'
              ).then((c) => c.ApplicationEndpointsHostComponent),
          },
          {
            path: 'endpoints/create',
            loadComponent: () =>
              import(
                '../application-details/components/create-endpoints-host/create-endpoints-host.component'
              ).then((c) => c.CreateEndpointsHostComponent),
          },
          {
            path: 'endpoints/:endpointId/edit',
            loadComponent: () =>
              import(
                '../application-details/components/edit-endpoints-host/edit-endpoints-host.component'
              ).then((c) => c.EditEndpointsHostComponent),
          },
          {
            path: 'endpoints/:endpointId/view',
            loadComponent: () =>
              import(
                '../application-details/components/endpoint-details-view-host/endpoint-details-view-host.component'
              ).then((c) => c.EndpointDetailsViewHostComponent),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'endpoints',
          },
        ],
      },
    ],
  },
] as Route[];
