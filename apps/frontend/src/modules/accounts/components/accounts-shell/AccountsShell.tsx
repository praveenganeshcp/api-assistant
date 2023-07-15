import { Link, Outlet, useNavigate } from "react-router-dom";
import { AccountsShellBanner } from "../accounts-shell-banner/AccountsShellBanner";
import "./AccountsShell.scss";
import { APP_CONFIG } from "apps/frontend/src/constants";
import { AppState } from "apps/frontend/src/store/appstate.interface";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function AccountsShell() {

    const navigate = useNavigate();
    
    const { isLoading, data: authUser, error } = 
        useSelector((state: AppState) => state.authUser);

    function navigateUser() {
        if(!isLoading && authUser) {
            navigate("/app/dashboard")
        }
    }

    useEffect(() => {
       navigateUser();
    }, [authUser, isLoading, error])

    return (
        <div className="accounts-shell h-100 w-100 d-flex flex-column">
            <div className="accounts-shell__header px-5 d-flex align-items-center w-100">
                <Link className="accounts-shell__header-appname" to={'/'}>{APP_CONFIG.NAME}</Link>
            </div>
            <div className="accounts-shell__banner-and-outlet d-flex w-100">
                <div className="accounts-shell__banner">
                    <AccountsShellBanner />
                </div>
                <div className="accounts-shell__outlet">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}