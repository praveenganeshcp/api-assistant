import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landing-page/LandingPage";

export function LandingPageRoutes() {
    return (
        <Routes>
            <Route path="" Component={LandingPage}></Route>
        </Routes>
    )
}