import { Link } from "react-router-dom";
import { Input, Button } from "@praveenkumarcp/reacteasy";
import "./Signup.scss";
import { FormEvent, useEffect, useState } from "react";
import { createAccount } from "../../accounts.api";
import { useDispatch } from "react-redux";
import { loadUserProfile } from "../../auth-user.slice";

export function Signup() {

    const dispatch = useDispatch();


    const [username, setUsername] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        (window as any).sdClickwrap.on("acceptanceToggled", () => {
            console.log((window as any).sdClickwrap.isAccepted())
        })
    }, [])

    async function onSignup(e: FormEvent) {
        e.preventDefault();
        if((window as any).sdClickwrap.isAccepted() === true) {
            (window as any).sdClickwrap.submit({
                user_identifier: "test_praveen"
            }).then(console.log, console.error)
        }
        // const newUserAccount = await createAccount(
        //     username, emailId, password
        // )
        // dispatch(loadUserProfile.fulfilled(newUserAccount, ""));
    }

    return (
        <div 
            className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <form 
                onSubmit={onSignup} 
                className="signup-form d-flex flex-column justify-content-between"
            >
                <h3 className="align-self-start">Welcome</h3>
                <Input 
                    id="emailId" 
                    type="email" 
                    placeholder="Email ID" 
                    onChange={(e) => setEmailId(e.target.value)}
                />
                <Input 
                    id="username" 
                    type="text" 
                    placeholder="User name" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div id="clickwrap-host"></div>
                <Button 
                    type="submit" 
                    className="mt-3" 
                    group="primary" 
                    label="CREATE ACCOUNT" 
                />
                <span className="align-self-center">
                    Already have an account? 
                    <Link to={"/accounts/login"}> Login here</Link>
                </span>
            </form>
        </div>
    )
}