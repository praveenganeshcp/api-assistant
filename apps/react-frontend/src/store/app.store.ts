import { configureStore } from "@reduxjs/toolkit";
import { accountsSlice } from "../pages/accounts/store/accounts.slice";

export const store = configureStore({
    reducer: {
        [accountsSlice.reducerPath]: accountsSlice.reducer
    }
})
