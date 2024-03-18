import { Route } from '@angular/router';
import { AccountsGuard } from '@api-assistant/auth-fe';

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
          import('@api-assistant/auth-fe').then((c) => c.SignupComponent),
      },
      {
        path: 'login',
        canActivate: [AccountsGuard],
        loadComponent: () =>
          import('@api-assistant/auth-fe').then((c) => c.LoginComponent),
      },
      {
        path: 'forgot-password',
        canActivate: [AccountsGuard],
        loadComponent: () =>
          import('@api-assistant/auth-fe').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
      {
        path: 'verify-account/:secret',
        loadComponent: () =>
          import('@api-assistant/auth-fe').then(
            (c) => c.VerifyAccountComponent
          ),
      },
    ],
  },
];
