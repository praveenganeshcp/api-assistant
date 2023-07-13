import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadUserProfile } from "../modules/accounts/auth-user.slice";
import { AppState } from "../store/appstate.interface";
import { AppRoutes } from "./App.routes";
import { useLocation, useNavigate } from "react-router-dom";

export function AppShell() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const { isLoading, data: authUser, error } = useSelector((state: AppState) => state.authUser);

    useEffect(() => {
        dispatch<any>(loadUserProfile());
    }, [])

    function navigateUser() {
        if(!isLoading && (error) && pathname.startsWith("/app")) {
            navigate("/accounts/login")
        }
        else if(!isLoading && authUser) {
            if(pathname === "/accounts/login" || pathname === "/accounts/signup") {
                navigate("/app/dashboard")
            }
        }
    }

    useEffect(() => {
       navigateUser();
    }, [authUser, isLoading, error])

    if(isLoading) {
        return (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <h1>loading...</h1>
            </div>
        )
    }
    return <AppRoutes />
}