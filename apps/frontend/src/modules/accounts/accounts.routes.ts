import { Route } from '@angular/router';
import { AccountsGuard } from './guards/accounts.guard';

export const accountRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@api-assistant/auth-fe').then((m) => m.AccountsShellComponent),
    children: [
      {
        path: 'signup',
        canActivate: [AccountsGuard],
        loadComponent: () =>
          import('./components/signup/signup.component').then(
            (c) => c.SignupComponent
          ),
      },
      {
        path: 'login',
        canActivate: [AccountsGuard],
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forgot-password',
        canActivate: [AccountsGuard],
        loadComponent: () =>
          import('./components/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
      {
        path: 'verify-account/:secret',
        loadComponent: () =>
          import('./components/verify-account/verify-account.component').then(
            (c) => c.VerifyAccountComponent
          ),
      },
    ],
  },
];
