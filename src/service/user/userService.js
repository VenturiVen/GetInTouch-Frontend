import axios from 'axios';
import { LOGIN } from '../../repo/constants/apiEndpoints';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function loginUser(credentials) {
    const res = await axios.post(`${BASE_URL}${LOGIN}`, credentials);
    return res.data;
};

