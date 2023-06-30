import { Link, Outlet } from "react-router-dom";
import { AccountsShellBanner } from "../accounts-shell-banner/AccountsShellBanner";
import "./AccountsShell.scss";
import { APP_CONFIG } from "apps/frontend/src/constants";

export function AccountsShell() {
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