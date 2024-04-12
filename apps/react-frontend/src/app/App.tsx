import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProfileContext } from "@api-assistant/accounts-fe";
import { AppDispatch, RootState } from "../store/app.state";
import { loadProfile } from "../pages/accounts/store/effects";

export function App() {

    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<RootState>(state => state.profile.loading);

    const profile = useSelector<RootState>(state => state.profile.data)

    useEffect(() => {
        dispatch(loadProfile())
    }, [])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <ProfileContext.Provider value={profile}>
            <Outlet />            
        </ProfileContext.Provider>
    )
}