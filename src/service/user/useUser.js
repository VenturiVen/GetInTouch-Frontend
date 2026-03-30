import { useDispatch, useSelector } from 'react-redux';
import { login, logout, clearError } from './userSlice';

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
        logout: handleLogout,
        clearError: handleClearError,
    };
}