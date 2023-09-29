import { Route } from "@angular/router";

export default [
    {
        path: "",
        loadComponent: () => import('./components/app-header/app-header.component').then(c => c.AppHeaderComponent),
        children: [
            {
                path: "projects",
                loadComponent: () => import("../dashboard/components/dashboard/dashboard.component").then(m => m.DashboardComponent)
            },
            {
                path: "projects/:projectId",
                loadComponent: () => import("../project-details/components/project-details-shell/project-details-shell.component").then(m => m.ProjectDetailsShellComponent),
            }
        ]
    }
] as Route[];