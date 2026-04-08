import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, clearError } from './userSlice';

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
        dispatch(login(credentials));
    };

    const handleRegister = (role, credentials) => {
        dispatch(register(role, credentials))
    }

    const handleFetch = (role, credentials) => {
        dispatch(fetch(role, credentials))
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
        fetch: handleFetch,
        logout: handleLogout,
        clearError: handleClearError,
    };
}