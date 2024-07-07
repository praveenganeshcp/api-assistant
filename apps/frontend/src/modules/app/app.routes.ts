import { Route } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const appRoutes: Route[] = [
  {
    path: 'demo',
    loadComponent: () => import("../documentation/components/demo-app/demo-app.component").then(c => c.DemoAppComponent)
  },
  {
    path: "how-it-works",
    loadComponent: () => import("../documentation/components/how-it-works/how-it-works.component").then(c => c.HowItWorksComponent)
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('../accounts/accounts.routes').then((r) => r.accountRoutes),
  },
  {
    path: 'app',
    loadChildren: () => import('../app-shell/app-shell.routes'),
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'load',
    loadComponent: () =>
      import('./components/profile-loader/profile-loader.component').then(
        (c) => c.ProfileLoaderComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import(
        '../landing-page/components/landing-page/landing-page.component'
      ).then((m) => m.LandingPageComponent),
  },
];
