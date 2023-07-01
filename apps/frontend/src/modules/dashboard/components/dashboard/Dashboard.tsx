import { Link } from "react-router-dom";

export function DashBoard() {
    return (
        <>
        <h1>dashboard component</h1>
        <Link to="/app/projects">Projecys</Link>
        </>
    )
}