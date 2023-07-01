import { Link } from "react-router-dom";
import { APP_CONFIG } from "../../constants";
import "./AppHeader.scss";

export function AppHeader() {
    return (
        <header className="api-assistant-app-header">
            <Link to="/app/dashboard">{APP_CONFIG.NAME}</Link>
        </header>
    )
}