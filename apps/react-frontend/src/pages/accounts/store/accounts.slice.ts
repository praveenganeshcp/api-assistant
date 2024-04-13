import { createSlice } from "@reduxjs/toolkit";
import { ProfileState } from "./type";
import { addAccountsAsyncReducers } from "./async-reducers"

const initalState: ProfileState = {
    loading: true,
    data: null,
    error: ''
}

const accountsSlice = createSlice({
    name: "profile",
    initialState: initalState,
    reducers: {},
    extraReducers(builder) {
        addAccountsAsyncReducers(builder)
    }
})

export const profileReducer = accountsSlice.reducer