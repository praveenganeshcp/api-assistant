import { Route } from "@angular/router";
import { AccountsShellComponent } from "./components/accounts-shell/accounts-shell.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { VerifyAccountComponent } from "./components/verify-account/verify-account.component";

export const accountRoutes: Route[] = [
    {
        path: "",
        component: AccountsShellComponent,
        children: [
            {
                path: "signup",
                loadComponent: () => import("./components/signup/signup.component").then(c => c.SignupComponent)
            },
            {
                path: "login",
                loadComponent: () => import("./components/login/login.component").then(c => c.LoginComponent)
            },
            {
                path: "forgot-password",
                loadComponent: () => import("./components/forgot-password/forgot-password.component").then(c => c.ForgotPasswordComponent)
            },
            {
                path: 'verify-account/:secret',
                loadComponent: () => import("./components/verify-account/verify-account.component").then(c => c.VerifyAccountComponent)
            }
        ]
    }
]