import { createAction, props } from "@ngrx/store";
import { AuthUser } from "../accounts.types";

const ACCOUNTS_ACTIONS_PREFIX = "[Accounts]"

export const loadUserProfile = createAction(`${ACCOUNTS_ACTIONS_PREFIX} Load profile`);

export const userProfileLoaded = createAction(
    `${ACCOUNTS_ACTIONS_PREFIX} User profile loaded`,
    props<{authUser: AuthUser}>()
);

export const errorInLoadingUserProfile = createAction(
    `${ACCOUNTS_ACTIONS_PREFIX} User profile error`, 
    props<{error: string}>()
)

export const loginAccount = createAction(
    `${ACCOUNTS_ACTIONS_PREFIX} Login Account`,
    props<{emailId: string, password: string}>()
)

export const loginSuccess = createAction(
    `${ACCOUNTS_ACTIONS_PREFIX} Login success`,
    props<{authUser: AuthUser}>()
)

export const loginError = createAction(
    `${ACCOUNTS_ACTIONS_PREFIX} Login error`,
    props<{error: string}>()
)

export const logoutUser = createAction(
    `${ACCOUNTS_ACTIONS_PREFIX} Logout user`
)

export const logoutSuccess = createAction(
    `${ACCOUNTS_ACTIONS_PREFIX} Logout success`
)