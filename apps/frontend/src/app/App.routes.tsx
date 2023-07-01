import { Route, Routes } from "react-router-dom";
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { LandingPageRoutes } from "../modules/landing-page/landing-page.routes";
import { AccountsRoutes } from "../modules/accounts/Accounts.routes";
import { AppShell } from "../components/app-shell/AppShell";
import { ProjectRoutes } from "../modules/project/project.routes";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/*" Component={LandingPageRoutes}></Route> 
            <Route path="/accounts/*" Component={AccountsRoutes}></Route>
            <Route path="/app/*" Component={AppShell}>
                <Route path="dashboard/*" Component={DashboardRoutes}></Route>
                <Route path="projects/*" Component={ProjectRoutes}></Route>
            </Route>
        </Routes>
    )
}