import API from '../../infra/api/axios'
import { LOGIN, REGISTER_STUDENT, REGISTER_STAFF, REGISTER_ADMIN } from '../../repo/constants/apiEndpoints';

export async function loginUser(credentials) {
    const res = await API.post(LOGIN, credentials);
    return res.data;
};

export async function registerUser(role, credentials) {
    const endpointMap = {
        STUDENT: REGISTER_STUDENT,
        STAFF: REGISTER_STAFF,
        ADMIN: REGISTER_ADMIN,
    };

    const endpoint = endpointMap[role];

    const res = await API.post(endpoint, credentials);
    return res.data;
}

export async function fetchUser(role, credentials) {
    role = role?.replace('ROLE_', '');
    const endpointMap = {
        STUDENT: '/api/student/me',
        STAFF: '/api/staff/me',
        ADMIN: '/api/admin/me',
    };

    const endpoint = endpointMap[role];

    console.log("Calling endpoint:", endpoint, credentials)
    console.log("Token: ", credentials)

    const res = await API.get(endpoint, {
        headers: {
            Authorization: `Bearer ${credentials}`
        }
    });

    return res.data;
}