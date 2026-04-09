import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, registerUserThunk, logout, clearError, getUserThunk } from './userSlice';

// wrapping redux logic inside a React hook for easier calling
// e.g.,
// const { login, loading, error } = useUser();
// login({ email, password });
export function useUser() {
    const dispatch = useDispatch();

    const { currentUser, token, role, loading, error } = useSelector(
        (state) => state.user
    );

    const handleLogin = (credentials) => {
        dispatch(loginUserThunk(credentials));
    };

    const handleRegister = (role, credentials) => {
        dispatch(registerUserThunk(role, credentials))
    }

    const handleGetUser = (role, credentials) => {
        dispatch(getUserThunk(role, credentials))
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

    return {
        currentUser,
        token,
        role,
        loading,
        error,

        login: handleLogin,
        register: handleRegister,
        getUser: handleGetUser,
        logout: handleLogout,
        clearError: handleClearError,
    };
}