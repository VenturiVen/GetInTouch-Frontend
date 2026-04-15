import axios from 'axios';
import { storage } from '../storage/localStorage';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

API.interceptors.request.use((config) => {
    const token = storage.get('token');

    console.log('Outgoing request:', config.url, '| Token present:', !!token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;