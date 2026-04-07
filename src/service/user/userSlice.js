import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './userService';
import { decodeToken, isTokenExpired } from '../../utils/auth'

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

const getLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

const storedToken = getLocalStorage('token');

let storedUser = null;
let storedRole = null;

if (storedToken && !isTokenExpired(storedToken)) {
    const decoded = decodeToken(storedToken);
    storedUser = decoded;
    storedRole = decoded?.role;
} else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: storedUser || null,
        token: storedToken || null,
        role: storedRole || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
            state.role = null;
            state.loading = false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
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

                const token = action.payload?.accessToken;

                state.token = token || null;

                // localstorage stuff for persistent storage
                if (token) {
                    const decoded = decodeToken(token);

                    state.currentUser = decoded;
                    state.role = decoded?.role;

                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(decoded));
                    localStorage.setItem('role', decoded?.role);
                }
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
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
