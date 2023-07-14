import { Link, useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../../constants";
import "./AppHeader.scss";
import { Button } from "@praveenkumarcp/reacteasy";
import { axiosHttpClient } from "../../modules/shared/config/axios.config";
import { useDispatch } from "react-redux";
import { resetState } from "../../modules/shared/models/entity-state.model";

export function AppHeader() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    async function onLogout() {
        await axiosHttpClient.post("/accounts/logout");
        dispatch(resetState())
        navigate("/accounts/login");
    }

    return (
        <header className="api-assistant-app-header">
            <Link to="/app/dashboard">{APP_CONFIG.NAME}</Link>
            <Button onClick={onLogout} label="Logout" group="text" />
        </header>
    )
}