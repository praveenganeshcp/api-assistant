import { Route, Routes } from "react-router-dom";
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { LandingPageRoutes } from "../modules/landing-page/landing-page.routes";
import { AccountsRoutes } from "../modules/accounts/Accounts.routes";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/*" Component={LandingPageRoutes}></Route> 
            <Route path="/accounts/*" Component={AccountsRoutes}></Route>
            <Route path="/dashboard/*" Component={DashboardRoutes}></Route>
        </Routes>
    )
}