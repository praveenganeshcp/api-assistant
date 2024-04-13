import { fetchProfile, login, logout } from "@api-assistant/accounts-fe";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileState } from "./type";

export const loadProfile = createAsyncThunk<ProfileState['data'], void, { rejectValue: string }>(
    '[Accounts] Load profile',
    async(_: void, thunkAPI) => {
        try {
            const userProfile = await fetchProfile();
            const profileData:  ProfileState['data'] = {
                ...userProfile,
                createdOn: userProfile.createdOn.toString(),
                lastLoggedInOn: userProfile.lastLoggedInOn.toString()
            } 
            return profileData;
        }
        catch(error: any) {
            return thunkAPI.rejectWithValue(error.message)
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
        catch(error: any) {
            return thunkAPI.rejectWithValue(error.message)
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
        catch(error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)