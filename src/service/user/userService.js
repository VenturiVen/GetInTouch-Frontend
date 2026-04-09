import API from '../../infra/api/axios'
import { LOGIN,
    REGISTER_STUDENT, REGISTER_STAFF, REGISTER_ADMIN,
    GET_USER_INFO_BY_EMAIL, GET_STUDENT_INFO_BY_ID, GET_STAFF_INFO_BY_ID
} from '../../repo/constants/apiEndpoints';

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

export async function getUser(role, email) {
    const endpoint = GET_USER_INFO_BY_EMAIL(email);

    const id = await API.get(endpoint);

    const res = getUserRoleInfo(role, id.data.id)
    
    return res;
}

export async function getUserRoleInfo(role, id) {
    const endpointMap = {
        STUDENT: GET_STUDENT_INFO_BY_ID,
        STAFF: GET_STAFF_INFO_BY_ID,
        ADMIN: REGISTER_ADMIN,
    };

    const endpoint = endpointMap[role](id);

    const res = await API.get(endpoint);
    
    return res.data;
}