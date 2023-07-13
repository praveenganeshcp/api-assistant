import { configureStore } from "@reduxjs/toolkit";
import { authUserReducer } from "../modules/accounts/auth-user.slice";
import { AppState } from "./appstate.interface";

export const appStore = configureStore<AppState>({
    reducer: {
        authUser: authUserReducer
    }
})