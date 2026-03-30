import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from './userService';

// runs async API call
export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
        const data = await loginUser(credentials);
        return data;
    } catch (error) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || 'Login failed'
        );
    }
});

// #TO-DO: Implement persistent token and user using localstorage

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        token: null,
        role: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
            state.role = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                const { user, token } = action.payload;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user?.role;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
