import axios from 'axios';
import { LOGIN, REGISTER_STUDENT, REGISTER_STAFF, REGISTER_ADMIN } from '../../repo/constants/apiEndpoints';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function loginUser(credentials) {
    const res = await axios.post(`${BASE_URL}${LOGIN}`, credentials);
    return res.data;
};

export async function registerUser(role, credentials) {
    const endpointMap = {
        STUDENT: REGISTER_STUDENT,
        STAFF: REGISTER_STAFF,
        ADMIN: REGISTER_ADMIN,
    };

    const endpoint = endpointMap[role];

    const res = await axios.post(`${BASE_URL}${endpoint}`, credentials);
    return res.data;
}