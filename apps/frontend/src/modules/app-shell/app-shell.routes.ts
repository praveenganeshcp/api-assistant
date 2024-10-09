import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { combineReducers, provideState } from '@ngrx/store';
import { dashboardFeature } from '../dashboard/store/reducers';
import { DashboardEffects } from '../dashboard/store/effects';
import { applicationMigrationsReducer } from '../application-migrations/store/reducers';
import { applicationDatabaseReducer } from '../application-database/store/reducers';
import { ApplicationDatabaseEffects } from '../application-database/store/effects';
import { ApplicationMigrationsEffects } from '../application-migrations/store/effects';
import { ApplicationEndpointsEffects } from '../application-endpoints/store/effects';
import { applicationEndpointsReducer } from '../application-endpoints/store/reducers';
import { APPLICATION_DATABASE_SLICE_NAME } from '../application-database/store/types';
import { APPLICATION_ENDPOINTS_SLICE_NAME } from '../application-endpoints/store/types';
import { APPLICATION_MIGRATION_SLICE_NAME } from '../application-migrations/store/types';
import { ApplicationDetailsEffects } from '../application-details/store/effects';
import { APPLICATION_DETAILS_SLICE_NAME } from '../application-details/store/type';
import { applicationDetailsreducer } from '../application-details/store/reducers';

const applicationFeatureStates = combineReducers({
  [APPLICATION_DETAILS_SLICE_NAME]: applicationDetailsreducer,
  [APPLICATION_DATABASE_SLICE_NAME]: applicationDatabaseReducer,
  [APPLICATION_ENDPOINTS_SLICE_NAME]: applicationEndpointsReducer,
  [APPLICATION_MIGRATION_SLICE_NAME]: applicationMigrationsReducer,
});

const applicationEffects = [
  ApplicationMigrationsEffects,
  ApplicationDatabaseEffects,
  ApplicationEndpointsEffects,
  ApplicationDetailsEffects,
];

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
          provideState('application', applicationFeatureStates),
          provideEffects(...applicationEffects),
        ],
        children: [
          {
            path: 'endpoints',
            loadComponent: () =>
              import(
                '../application-endpoints/components/application-endpoints-host/application-endpoints-host.component'
              ).then((c) => c.ApplicationEndpointsHostComponent),
          },
          {
            path: 'endpoints/create',
            loadComponent: () =>
              import(
                '../application-endpoints/components/create-endpoints-host/create-endpoints-host.component'
              ).then((c) => c.CreateEndpointsHostComponent),
          },
          {
            path: 'endpoints/:endpointId/edit',
            loadComponent: () =>
              import(
                '../application-endpoints/components/edit-endpoints-host/edit-endpoints-host.component'
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
                '../application-migrations/components/migrations-host-container/migrations-host-container.component'
              ).then((c) => c.MigrationsHostContainerComponent),
          },
          {
            path: 'migrations/:fileName',
            loadComponent: () =>
              import(
                '../application-migrations/components/migration-details/migration-details.component'
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
