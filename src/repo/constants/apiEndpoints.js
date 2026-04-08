// Auth
export const LOGIN = '/api/auth/login';
export const REGISTER_STUDENT = '/api/auth/register/student';
export const REGISTER_STAFF = '/api/auth/register/staff';
export const REGISTER_ADMIN = '/api/auth/register/admin';

// Staff directory
export const GET_ALL_STAFF = '/api/staff/';
export const GET_STAFF_BY_ID = (id) => `/api/staff/id/${id}`;
export const GET_MY_DEPARTMENT_STAFF = '/api/staff/my-department';
export const GET_DEPARTMENT_STAFF = (department) => `/api/staff/department/${department}`;

// Availability (staff sets recurring schedules → generates time slots)
export const GET_AVAILABILITY_BY_STAFF = (staffId) => `/api/Availability/staff/${staffId}`;
export const CREATE_AVAILABILITY = '/api/Availability/';
export const UPDATE_AVAILABILITY = (id) => `/api/Availability/${id}`;
export const DELETE_AVAILABILITY = (id) => `/api/Availability/${id}`;

// Time slots (individual bookable slots generated from availability)
export const GET_STAFF_TIMESLOTS = (staffId) => `/api/timeslots/staff/${staffId}`;
export const BOOK_TIMESLOT = (slotId) => `/api/timeslots/book/${slotId}`;
export const FREE_TIMESLOT = (slotId) => `/api/timeslots/free/${slotId}`;

// Meetings/Bookings — not yet implemented in backend
// export const GET_BOOKINGS = '/api/bookings';
// export const CREATE_BOOKING = '/api/bookings';
// export const CANCEL_BOOKING = (id) => `/api/bookings/${id}/cancel`;

// Admin user management — not yet implemented in backend
// export const GET_USERS = '/api/users';
// export const CREATE_USER = '/api/users';
// export const DELETE_USER = (id) => `/api/users/${id}`;
