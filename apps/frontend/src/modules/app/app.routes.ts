import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "accounts",
        loadChildren: () => import("../accounts/accounts.module").then(m => m.AccountsModule),
    },
    {
        path: "app",
        loadChildren: () => import("../app-shell/app-shell.module").then(m => m.AppShellModule),
    },
    {
        path: "",
        loadChildren: () => import("../landing-page/landing-page.module").then(m => m.LandingPageModule),
    },
];
