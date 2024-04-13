import { createSlice } from "@reduxjs/toolkit";
import { ProfileState } from "./type";
import { addAccountsAsyncReducers } from "./async-reducers"
import { valueIsDefined } from "@api-assistant/utils-fe";

const initalState: ProfileState = {
    loading: true,
    data: null,
    error: ''
}

export const accountsSlice = createSlice({
    name: "profile",
    initialState: initalState,
    reducers: {},
    extraReducers(builder) {
        addAccountsAsyncReducers(builder)
        builder.addDefaultCase((state => state))
    },
    selectors: {
        isProfileLoading: (state) => state.loading,
        userProfile: (state) => state.data,
        isUserAuthenticated: (state) => !state.loading && valueIsDefined(state.data)
    }
})

export const {isProfileLoading, userProfile, isUserAuthenticated } = accountsSlice.selectors