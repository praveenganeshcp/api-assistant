import { Route } from "@angular/router";
import { AccountsShellComponent } from "./pages/accounts-shell/accounts-shell.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { VerifyAccountComponent } from "./pages/verify-account/verify-account.component";

export const accountRoutes: Route[] = [
    {
        path: "",
        component: AccountsShellComponent,
        children: [
            {
                path: "signup",
                component: SignupComponent
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "forgot-password",
                component: ForgotPasswordComponent
            },
            {
                path: 'verify-account/:secret',
                component: VerifyAccountComponent
            }
        ]
    }
]