import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page/landing-page";

export const router = createBrowserRouter([
    {
        path: '',
        element: <LandingPage />
    }
])