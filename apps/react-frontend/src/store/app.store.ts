import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "../pages/accounts/store/accounts.slice";

export const store = configureStore({
    reducer: {
        profile: profileReducer
    }
})
