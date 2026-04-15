import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};