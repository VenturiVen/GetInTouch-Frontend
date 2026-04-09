import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, getUser } from './userService';
import { decodeToken, isTokenExpired } from '../../infra/auth/token'
import { storage } from '../../infra/storage/localStorage'

// runs async API call
export const loginUserThunk = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
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

export const registerUserThunk = createAsyncThunk('user/register', async ({ role, credentials }, { rejectWithValue }) => {
    try {
        const data = await registerUser(role, credentials);
        return data;
    } catch (error) {
        return rejectWithValue({
            status: error?.response?.status,
            message: error?.response?.data || error.message || 'Login Failed'
        });
    }
});

export const getUserThunk = createAsyncThunk('user/email', async (_, { rejectWithValue }) => {
    try {
        const token = storage.get('token');
        console.log(token);
        const decoded = decodeToken(token);
        const email = decoded?.sub;
        const role = decoded?.role?.replace('ROLE_', '');
        console.log(email);
        console.log(role);
        const data = await getUser(role, email);
        console.log(data);
        return data;
    } catch (error) {return rejectWithValue({
            status: error?.response?.status,
            message: error?.response?.data || error.message || 'Login Failed'
        });
    }
});

const storedToken = storage.get('token');

let storedUser = null;
let storedRole = null;

if (storedToken && !isTokenExpired(storedToken)) {
    const decoded = decodeToken(storedToken);
    storedUser = decoded;
    storedRole = decoded?.role;
} else {
    storage.remove('token');
    storage.remove('user');
    storage.remove('role');
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: storedUser,
        token: storedUser ? storedToken : null,
        role: storedRole,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
            state.role = null;
            state.loading = false;

            storage.remove('token');
            storage.remove('user');
            storage.remove('role');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false;

                const token = action.payload?.accessToken;

                state.token = token || null;

                // localstorage stuff for persistent storage
                if (token) {
                    const decoded = decodeToken(token);
                    const roleName = decoded?.role?.replace('ROLE_', '');

                    state.token = token;
                    state.currentUser = decoded;
                    state.role = decoded?.role;

                    storage.set('token', token);
                    storage.set('user', decoded);
                    storage.set('role', roleName);
                }
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
