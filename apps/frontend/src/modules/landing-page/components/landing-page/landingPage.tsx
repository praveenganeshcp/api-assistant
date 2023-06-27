import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <h1>Hello from landing page</h1>
            <Link to="/dashboard">go to dashboard</Link>
        </>
        
    )
}