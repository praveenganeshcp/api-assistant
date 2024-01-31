import { Route } from '@angular/router';
import { AuthenticatedGuard } from './app.guard';

export const appRoutes: Route[] = [
  {
    path: 'accounts',
    loadChildren: () =>
      import('../accounts/accounts.routes').then((r) => r.accountRoutes),
  },
  {
    path: 'app',
    loadChildren: () => import('../app-shell/app-shell.routes'),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '',
    loadComponent: () =>
      import(
        '../landing-page/components/landing-page/landing-page.component'
      ).then((m) => m.LandingPageComponent),
  },
];
