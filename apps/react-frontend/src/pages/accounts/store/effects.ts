import { fetchProfile, login, logout } from "@api-assistant/accounts-fe";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadProfile = createAsyncThunk<any, void>(
    '[Accounts] Load profile',
    async(_, thunkAPI) => {
        try {
            const userProfile = await fetchProfile();
            return {
                ...userProfile,
                createdOn: userProfile.createdOn.toString(),
                lastLoggedInOn: userProfile.lastLoggedInOn.toString()
            }
        }
        catch(err) {
            return thunkAPI.rejectWithValue("Error in loading profile")
        }
    }
)

export const logoutAccount = createAsyncThunk<any, void>(
    '[Accounts] Logout',
    async (_, thunkAPI) => {
        try {
            await logout();
            return null;
        }
        catch(error) {
            console.log(error)
            return thunkAPI.rejectWithValue("Error in signout")
        }
    }
)

export const loginAccount = createAsyncThunk<any, {emailId: string, password: string}>(
    '[Accounts] Login',
    async(payload, thunkAPI) => {
        try {
            const userProfile = await login(payload.emailId, payload.password);
            return {
                ...userProfile,
                createdOn: userProfile.createdOn.toString(),
                lastLoggedInOn: userProfile.lastLoggedInOn.toString()
            }
        }
        catch(error) {
            return thunkAPI.rejectWithValue("Error in login")
        }
    }
)