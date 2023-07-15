import { Outlet } from "react-router";
import { AppHeader } from "../app-header/AppHeader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../../../store/appstate.interface";

export function AppShell() {
    const navigate = useNavigate();
    
    const { isLoading, data: authUser, error } = 
        useSelector((state: AppState) => state.authUser);

    function navigateUserToLoginIfUnAuthenticated() {
        if(!isLoading && error) {
            navigate("/accounts/login")
        }
    }

    useEffect(() => {
       navigateUserToLoginIfUnAuthenticated();
    }, [authUser, isLoading, error])

    if(isLoading) {
        return (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <h1>loading...</h1>
            </div>
        )
    }

    return (
        <div className="h-100 w-100">
            <AppHeader />
            <div style={{height: '92%'}} className="w-100">
                <Outlet/>
            </div>
        </div>
    )
}