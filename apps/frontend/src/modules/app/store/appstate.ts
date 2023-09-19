import { ACCOUNTS_STATE_SELECTOR_KEY } from "../../accounts/store/accounts.state";
import { AccountsState } from "../../accounts/store/accounts.state";

export interface AppState {
    [ACCOUNTS_STATE_SELECTOR_KEY]: AccountsState
}