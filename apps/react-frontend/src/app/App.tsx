import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProfileContext, SerializedUserProfile } from "@api-assistant/accounts-fe";
import { AppDispatch, RootState } from "../store/app.state";
import { loadProfile } from "../pages/accounts/store/effects";
import { isProfileLoading, isUserAuthenticated, userProfile } from "../pages/accounts/store/accounts.slice";

export function App() {

    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector(isProfileLoading)

    const isAuthenticated = useSelector<RootState>(isUserAuthenticated) as boolean;

    const profile = useSelector<RootState>(userProfile) as SerializedUserProfile;

    useEffect(() => {
        dispatch(loadProfile())
    }, [])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <ProfileContext.Provider value={{isAuthenticated: isAuthenticated, data: profile} }>
            <Outlet />            
        </ProfileContext.Provider>
    )
}