// Auth
export const LOGIN = '/api/auth/login';
export const REGISTER_STUDENT = '/api/auth/register/student';
export const REGISTER_STAFF = '/api/auth/register/staff';
export const REGISTER_ADMIN = '/api/auth/register/admin';
export const LOGOUT = '/api/auth/logout';

// Users (Admin)
export const GET_USERS = '/api/users';
export const CREATE_USER = '/api/users';
export const DELETE_USER = (id) => `/api/users/${id}`;

// Slots (Staff)
export const GET_SLOTS = '/api/slots';
export const CREATE_SLOT = '/api/slots';
export const UPDATE_SLOT = (id) => `/api/slots/${id}`;
export const DELETE_SLOT = (id) => `/api/slots/${id}`;

// Bookings (Student)
export const GET_BOOKINGS = '/api/bookings';
export const CREATE_BOOKING = '/api/bookings';
export const CANCEL_BOOKING = (id) => `/api/bookings/${id}/cancel`;

// Staff directory (Student view)
export const GET_STAFF = '/api/staff';
export const GET_STAFF_SLOTS = (staffId) => `/api/staff/${staffId}/slots`;
