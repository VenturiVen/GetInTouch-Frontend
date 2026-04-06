import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './userService';

// runs async API call
export const login = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
        const data = await loginUser(credentials);
        return data;
    } catch (error) {
        return rejectWithValue({
            status: error?.response?.status,
            message: error?.response?.data || error.message || 'Login Failed'
        });
    }
});

export const register = createAsyncThunk('user/register', async ({ role, credentials }, { rejectWithValue }) => {
    try {
        const data = await registerUser(role, credentials);
        return data;
    } catch (error) {
        return rejectWithValue({
            status: error?.response?.status,
            message: error?.response?.data || error.message || 'Login Failed'
        });
    }
}
);

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
                const { user, token } = action.payload || {};
                state.currentUser = user || null;
                state.token = token || null;
                state.role = user?.role || null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                const { user, token } = action.payload || {};
                state.currentUser = user || null;
                state.token = token || null;
                state.role = user?.role || null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
