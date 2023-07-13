import { Link } from "react-router-dom";
import "./LandingPageHeader.scss";
import { useSelector } from "react-redux";
import { AppState } from "apps/frontend/src/store/appstate.interface";

export function LandingPageHeader() {

    const { data: authUser, isLoading, error } = useSelector((state: AppState) => state.authUser);

    let content = null
    if(isLoading) {
        content = <h2>Authentication...</h2>
    }
    if(error) {
        content = <h4>Error in fetching profile</h4>
    }
    if(authUser) {
        content = (
            <>
                <Link to="/app/dashboard">Go to app</Link>
                <Link to="/app/profile" className="mr-4">Hello {authUser.username}!</Link>
            </>
        )
    }
    else {
        content = (
            <>
                <Link to="/accounts/login">Login</Link>
                <Link to="/accounts/signup">Create Account</Link>
            </>
        )
    }

    return (
        <header className="landing-page-header d-flex justify-content-end">
            <div className="landing-page-header__links d-flex justify-content-around align-items-center">
                {content}                
            </div>
        </header>
    )
}