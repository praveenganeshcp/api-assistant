import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadProfile } from "../store/accounts.slice";
import { AppDispatch, RootState } from "../store/reducer";
import { ProfileContext } from "@api-assistant/accounts-fe";

export function App(props: any) {

    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<RootState>(state => state.profile.loading);

    const profile = useSelector<RootState>(state => state.profile.data)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(loadProfile())
    }, [])

    useEffect(() => {
        if(profile === null && !loading) {
            navigate("/accounts/login")
        }   
     }, [profile, loading])

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <ProfileContext.Provider value={profile}>
            <Outlet />            
        </ProfileContext.Provider>
    )
}