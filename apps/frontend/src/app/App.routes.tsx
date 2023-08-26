import { Route, Routes } from "react-router-dom";
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { LandingPageRoutes } from "../modules/landing-page/landing-page.routes";
import { AccountsRoutes } from "../modules/accounts/Accounts.routes";
import { AppShell } from "../modules/shared/components/app-shell/AppShell";
import { ProjectRoutes } from "../modules/project/project.routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUserProfile } from "../modules/accounts/auth-user.slice";
import { VerifyAccount } from "../modules/accounts/components/verify-account/VerifyAccount";
import { AccountNotVerified } from "../modules/accounts/components/account-not-verified/AccountNotVerified";
import { AppState } from "../store/appstate.interface";
import { AppDispatch } from "../store/app.store";

export function AppRoutes() {

    const { isLoading } = useSelector((state: AppState) => state.authUser);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadUserProfile());
    })

    if(isLoading)
        return (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <h1>loading...</h1>
            </div>
        )

    return (
        <Routes>
            <Route path="/*" Component={LandingPageRoutes}></Route> 
            <Route path="/accounts/*" Component={AccountsRoutes}></Route>
            <Route path="/verify-account/:token" Component={VerifyAccount} />
            <Route path="/account-not-verified" Component={AccountNotVerified} />
            <Route path="/app/*" Component={AppShell}>
                <Route path="dashboard/*" Component={DashboardRoutes}></Route>
                <Route path="projects/*" Component={ProjectRoutes}></Route>
            </Route>
        </Routes>
    )
}