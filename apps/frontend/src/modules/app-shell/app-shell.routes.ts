import { Route } from '@angular/router';

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
          import('../dashboard/components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
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
