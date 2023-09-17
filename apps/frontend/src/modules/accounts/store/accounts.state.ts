import { AuthUser } from "../accounts.types";
import { CanBeNull } from "@api-assistant/utils";

export interface AccountsState {
    data: CanBeNull<AuthUser>;
    isLoading: boolean;
    error: string;
    isAccountsAPIInProgress: boolean
}

export const ACCOUNTS_STATE: AccountsState = {
    data: null,
    isLoading: true,
    error: "",
    isAccountsAPIInProgress: false
}