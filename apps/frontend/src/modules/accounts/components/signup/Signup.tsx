import { Link } from "react-router-dom";
import { Input, Button } from "@praveenkumarcp/reacteasy";
import "./Signup.scss";

export function Signup() {
    return (
        <div 
            className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <form className="signup-form d-flex flex-column justify-content-between">
                <h3 className="align-self-start">Welcome</h3>
                <Input id="emailId" type="email" placeholder="Email ID" />
                <Input id="username" type="text" placeholder="User name" />
                <Input id="password" type="password" placeholder="Password" />
                <Button className="mt-3" group="primary" label="CREATE ACCOUNT" />
                <span className="align-self-center">
                    Already have an account? 
                    <Link to={"/accounts/login"}> Login here</Link>
                </span>
            </form>
        </div>
    )
}