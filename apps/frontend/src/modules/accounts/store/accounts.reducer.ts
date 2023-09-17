import { createReducer, on } from "@ngrx/store";
import { ACCOUNTS_STATE } from "./accounts.state";
import { loadUserProfile, userProfileLoaded, errorInLoadingUserProfile, loginAccount, loginSuccess, loginError, logoutUser, logoutSuccess } from "./accounts.actions";

export const accountsReducer = createReducer(
    ACCOUNTS_STATE,
    on(loadUserProfile, (state) => ({
        ...state,
        data: null,
        isLoading: true,
        error: ""
    })),
    on(userProfileLoaded, (state, {authUser}) => ({
        ...state,
        data: authUser,
        isLoading: false,
        error: ""
    })),
    on(errorInLoadingUserProfile, (state, {error}) => ({
        ...state,
        data: null,
        isLoading: false,
        error
    })),
    on(loginAccount, (state) => ({
        ...state,
        isAccountsAPIInProgress: true
    })),
    on(loginSuccess, (state, {authUser}) => ({
        ...state,
        isAccountsAPIInProgress: false,
        data: authUser
    })),
    on(loginError, (state, payload) => ({
        ...state,
        isAccountsAPIInProgress: false,
        error: payload.error
    })),
    on(logoutUser, (state) => ({
        ...state,
        isAccountsAPIInProgress: true
    })),
    on(logoutSuccess, (state) => ({
        ...state,
        isAccountsAPIInProgress: false,
        data: null
    }))
)