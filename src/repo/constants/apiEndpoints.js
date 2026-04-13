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

// Users
export const GET_USER_INFO_BY_EMAIL = (email) => `/api/user/email/${encodeURIComponent(email)}`;
export const GET_USER_INFO_BY_ID = (id) => `/api/user/id/${id}`;

// 'me'
export const GET_STAFF_INFO_BY_ID = (id) => `/api/staff/me/${id}`;
export const GET_STUDENT_INFO_BY_ID = (id) => `/api/student/me/${id}`

// Slots (Staff)
export const GET_SLOTS = '/api/slots';
export const CREATE_SLOT = '/api/slots';
export const UPDATE_SLOT = (id) => `/api/slots/${id}`;
export const DELETE_SLOT = (id) => `/api/slots/${id}`;

// Availability (staff sets recurring schedules → generates time slots)
export const GET_AVAILABILITY_BY_STAFF = (staffId) => `/api/Availability/staff/${staffId}`;
export const CREATE_AVAILABILITY = '/api/Availability/';
export const UPDATE_AVAILABILITY = (id) => `/api/Availability/${id}`;
export const DELETE_AVAILABILITY = (id) => `/api/Availability/${id}`;

// Time slots (individual bookable slots generated from availability)
export const GET_STAFF_TIMESLOTS = (staffId) => `/api/timeslots/staff/${staffId}`;
export const BOOK_TIMESLOT = (slotId) => `/api/timeslots/book/${slotId}`;
export const FREE_TIMESLOT = (slotId) => `/api/timeslots/free/${slotId}`;

// Conversations & Messages
export const CREATE_CONVERSATION = '/api/conversations';
export const GET_CONVERSATIONS = '/api/conversations';
export const GET_MESSAGES = (conversationId) => `/api/conversations/${conversationId}/messages`;
export const SEND_MESSAGE = (conversationId) => `/api/conversations/${conversationId}/messages`;

// Meetings/Bookings — not yet implemented in backend
// export const GET_BOOKINGS = '/api/bookings';
// export const CREATE_BOOKING = '/api/bookings';
// export const CANCEL_BOOKING = (id) => `/api/bookings/${id}/cancel`;

// Admin user management — not yet implemented in backend
// export const GET_USERS = '/api/users';
// export const CREATE_USER = '/api/users';
// export const DELETE_USER = (id) => `/api/users/${id}`;
