import { Outlet } from "react-router-dom";
import { AccountsShellBanner } from "../accounts-shell-banner/AccountsShellBanner";
import "./AccountsShell.scss";

export function AccountsShell() {
    return (
        <div className="accounts-shell">
            <div className="accounts-shell__banner">
                <AccountsShellBanner />
            </div>
            <div className="accounts-shell__outlet">
                <Outlet></Outlet>
            </div>
        </div>
    )
}