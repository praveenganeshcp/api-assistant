import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { loadProfile, loginAccount, logoutAccount } from "./effects";
import { ProfileState } from "./type";

export function addAccountsAsyncReducers(builder: ActionReducerMapBuilder<ProfileState>) {

    // Start of profile
    builder.addCase(loadProfile.pending, (state) => {
        state.error = ""
        state.loading = true;
    })
    builder.addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
        state.data = action.payload
    })
    builder.addCase(loadProfile.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        state.error = action.error.message ?? "";
    })
    // End of profile

    // Start of login 
    builder.addCase(loginAccount.pending, (state) => {
        state.error = ""
        state.loading = true;
    })
    builder.addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
        state.data = action.payload
    })
    builder.addCase(loginAccount.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        state.error = action.error.message ?? "";
    }) 
    // End of login

    // Start of logout
    builder.addCase(logoutAccount.pending, (state) => {
        state.error = ""
        state.loading = true;
    })
    builder.addCase(logoutAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = ""
        state.data = null
    })
    builder.addCase(logoutAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
    }) 
    // End of logout
}