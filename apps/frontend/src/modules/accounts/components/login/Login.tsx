import { Link } from "react-router-dom";
import "./Login.scss";
import { Input, Button } from "@praveenkumarcp/reacteasy";

export function Login() {
    return (
        <div 
            className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <form className="login-form d-flex flex-column justify-content-between">
                <h3 className="align-self-start">Welcome back!</h3>
                <Input id="emailId" type="email" placeholder="Email ID" />
                <div className="d-flex flex-column">
                    <Input id="password" type="password" placeholder="Password" />
                    <Link className="mt-1" to={''}>Forgot Password ?</Link>
                </div>
                <Button group="primary" label="LOGIN" />
                <span className="align-self-center">
                    Do not have an account? 
                    <Link to={"/accounts/signup"}> Signup here</Link>
                </span>
            </form>
        </div>
    )
}