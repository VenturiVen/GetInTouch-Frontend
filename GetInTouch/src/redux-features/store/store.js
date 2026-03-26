import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/userSlice';
import bookingReducer from '../slices/booking/bookingSlice';
import slotReducer from '../slices/staff/slotSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer,
        slot: slotReducer,
    },
});
