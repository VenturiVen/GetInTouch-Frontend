import axios from 'axios';
import { LOGIN } from '../../../repo/constants/apiEndpoints';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (credentials) => {
    const response = await axios.post(`${BASE_URL}${LOGIN}`, credentials);
    return response.data;
};
