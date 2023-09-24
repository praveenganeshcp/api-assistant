import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "accounts",
        loadChildren: () => import("../accounts/accounts.routes").then(r => r.accountRoutes)
    },
    {
        path: "app",
        loadChildren: () => import("../app-shell/app-shell.routes")
    },
    {
        path: "",
        loadComponent: () => import("../landing-page/components/landing-page/landing-page.component").then(m => m.LandingPageComponent),
    },
];
