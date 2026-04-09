import axios from 'axios';
import { storage } from '../../infra/storage/localStorage'

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

API.interceptors.request.use((config) => {
    const token = storage.get('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;