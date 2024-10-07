import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { dashboardFeature } from '../dashboard/store/reducers';
import { DashboardEffects } from '../dashboard/store/effects';
import { ApplicationDetailsEffects } from '../application-details/store/effects';
import { applicationDetailsFeature } from '../application-details/store/reducers';
import { applicationMigrationsFeature } from '../migrations/store/reducers';
import { MigrationsEffects } from '../migrations/store/effects';
import { applicationDbFeature } from '../application-database/store/reducers';
import { ApplicationDatabaseEffects } from '../application-database/store/effects';

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
          provideState(applicationMigrationsFeature),
          provideState(applicationDbFeature),
          provideEffects(
            ApplicationDetailsEffects,
            MigrationsEffects,
            ApplicationDatabaseEffects
          ),
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
            path: 'database',
            loadComponent: () =>
              import(
                '../application-database/components/application-db-host/application-db-host.component'
              ).then((c) => c.ApplicationDbHostComponent),
          },
          {
            path: 'migrations',
            loadComponent: () =>
              import(
                '../migrations/components/migrations-host-container/migrations-host-container.component'
              ).then((c) => c.MigrationsHostContainerComponent),
          },
          {
            path: 'migrations/:fileName',
            loadComponent: () =>
              import(
                '../migrations/components/migration-details/migration-details.component'
              ).then((c) => c.MigrationDetailsComponent),
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
