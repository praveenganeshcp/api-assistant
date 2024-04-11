import { fetchProfile } from "@api-assistant/accounts-fe";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig, GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

interface ProfileState {
    loading: boolean;
    data: null | any,
    error: string
}

const initalState: ProfileState = {
    loading: true,
    data: null,
    error: ''
}

export const loadProfile = createAsyncThunk<any, void>(
    '[Accounts] Load profile',
    (aa, thunkAPI) => {
        try {
            return fetchProfile()
        }
        catch(err) {
            return thunkAPI.rejectWithValue("Error in loading profile")
        }
    }
)

const accountsSlice = createSlice({
    name: "profile",
    initialState: initalState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loadProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = ""
            state.data = action.payload
        })
        builder.addCase(loadProfile.rejected, (state) => {
            state.loading = false;
            state.error = "error in loading profile"
        }) 
    },
})

export const profileReducer = accountsSlice.reducer