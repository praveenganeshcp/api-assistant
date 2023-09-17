import { Route } from "@angular/router";
import { AppHeaderComponent } from "./components/app-header/app-header.component";

export const appShellRoutes: Route[] = [
    {
        path: "",
        component: AppHeaderComponent,
        children: [
            {
                path: "projects",
                loadChildren: () => import("../dashboard/dashboard.module").then(m => m.DashboardModule)
            }
        ]
    }
]