import { AuthUserState } from "../modules/accounts/auth-user.slice";

export interface AppState {
    authUser: AuthUserState
}