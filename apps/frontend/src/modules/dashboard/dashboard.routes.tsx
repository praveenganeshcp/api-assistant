import { Route, Routes } from "react-router-dom";
import { DashBoard } from "./components/dashboard/Dashboard";

export function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" Component={DashBoard}/>
        </Routes>
    )
}