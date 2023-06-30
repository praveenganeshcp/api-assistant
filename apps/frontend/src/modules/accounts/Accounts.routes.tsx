import { Route, Routes } from "react-router-dom";
import { AccountsShell } from "./components/accounts-shell/AccountsShell";
import { Login } from "./components/login/Login";
import { Signup } from "./components/signup/Signup";

export function AccountsRoutes() {
    return (
        <Routes>
            <Route path="/" Component={AccountsShell}>
                <Route path="login" Component={Login}></Route>
                <Route path="signup" Component={Signup}></Route>
            </Route>
        </Routes>
    )
}