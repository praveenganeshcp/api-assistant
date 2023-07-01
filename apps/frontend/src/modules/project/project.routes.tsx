import { Route, Routes } from "react-router";
import { ProjectShell } from "./components/project-shell/ProjectShell";

export function ProjectRoutes() {
    return (
        <Routes>
            <Route path="/" Component={ProjectShell}/>
        </Routes>
    )
}