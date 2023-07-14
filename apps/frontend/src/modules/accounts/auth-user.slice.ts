import { CanBeNull } from "@api-assistant/utils";
import { EntityState, resetState } from "../shared/models/entity-state.model";
import { UserProfile } from "./models/user-profile.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./accounts.api";

const SLICE_NAME: string = "authUser";

export interface AuthUserState extends EntityState<UserProfile> {}

const AUTH_USER_INITIAL_STATE: AuthUserState = {
    isLoading: true,
    data: null,
    error: ""
}

export const loadUserProfile = createAsyncThunk<CanBeNull<UserProfile>, void>(
    SLICE_NAME,
    () =>  fetchUserProfile()
)

const authUserSlice = createSlice<AuthUserState, {}, string>({
    name: SLICE_NAME,
    initialState: AUTH_USER_INITIAL_STATE,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadUserProfile.rejected, (state, action) => {
            return { isLoading: false, error: action.error.message as string, data: null }
        }),
        builder.addCase(loadUserProfile.fulfilled, (state, action) => {
            return { isLoading: false, error: "", data: action.payload }
        }),
        builder.addCase(loadUserProfile.pending, (state, action) => {
            return { isLoading: true, error: "", data: null }
        }),
        builder.addCase(resetState, (state, action) => {
            return {...AUTH_USER_INITIAL_STATE, isLoading: false}
        })
    },
})

export const authUserReducer = authUserSlice.reducer;