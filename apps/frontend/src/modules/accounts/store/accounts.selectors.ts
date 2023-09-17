import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AccountsState } from "./accounts.state";
import { ACCOUNTS_STATE_SELECTOR_KEY } from "../accounts.module";

export const accountsSelector = createFeatureSelector<AccountsState>(ACCOUNTS_STATE_SELECTOR_KEY);

export const authUserSelector = createSelector(
    accountsSelector,
    (state) => state.data
)

export const isAuthUserLoadingSelector = createSelector(
    accountsSelector,
    (state) => state.isLoading
)

export const isAccountsAPIInProgressSelector = createSelector(
    accountsSelector,
    (state) => state.isAccountsAPIInProgress
)

export const isUserAuthenticatedSelector = createSelector(
    accountsSelector,
    (state) => state.data !== null
)