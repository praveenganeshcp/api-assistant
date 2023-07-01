import { Outlet } from "react-router";
import { AppHeader } from "../app-header/AppHeader";

export function AppShell() {
    return (
        <div className="h-100 w-100">
            <AppHeader />
            <div style={{height: '90%'}} className="w-100">
                <Outlet/>
            </div>
        </div>
    )
}