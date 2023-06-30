import { Link } from "react-router-dom";
import "./LandingPageHeader.scss";

export function LandingPageHeader() {
    return (
        <header className="landing-page-header d-flex justify-content-end">
            <div className="landing-page-header__links d-flex justify-content-around align-items-center">
                <Link to="/accounts/login">Login</Link>
                <Link to="/accounts/signup">Create Account</Link>
            </div>
        </header>
    )
}