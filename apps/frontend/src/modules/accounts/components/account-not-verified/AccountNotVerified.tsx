import { Link } from "react-router-dom";
import "./AccountNotVerified.scss"
import { APP_CONFIG } from "../../../../constants";

export function AccountNotVerified() {
    return (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center ">
            <div className="w-100 h-50 d-flex justify-content-between align-items-center flex-column">
                <h1>Account not verified</h1>
                <h3>Please verify your account using the link sent your email id.</h3>
                <Link className="account-not-verified__home-page-link" to="/">
                    Go to {APP_CONFIG.NAME} Home
                </Link>
            </div>
        </div>
    )
}