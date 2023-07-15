import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { Input, Button } from "@praveenkumarcp/reacteasy";
import { FormEvent, useState } from "react";
import { loginAccount } from "../../accounts.api";
import { loadUserProfile } from "../../auth-user.slice";
import { useDispatch } from "react-redux";

export function Login() {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLoginAccount = async (e: FormEvent) => {
        e.preventDefault();
        const response = await loginAccount(emailId, password);
        dispatch(loadUserProfile.fulfilled(response, ""));
        navigate("/app/dashboard");
    }

    return (
        <div 
            className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={onLoginAccount} className="login-form d-flex flex-column justify-content-between">
                <h3 className="align-self-start">Welcome back!</h3>
                <Input 
                    id="emailId" 
                    onChange={(e) => setEmailId(e.target.value)} 
                    type="email" 
                    placeholder="Email ID" 
                />
                <div className="d-flex flex-column">
                    <Input 
                        onChange={(e) => setPassword(e.target.value)} 
                        id="password" 
                        type="password" 
                        placeholder="Password" 
                    />
                    <Link className="mt-1" to={''}>Forgot Password ?</Link>
                </div>
                <Button group="primary" type="submit" label="LOGIN" />
                <span className="align-self-center">
                    Do not have an account? 
                    <Link to={"/accounts/signup"}> Signup here</Link>
                </span>
            </form>
        </div>
    )
}