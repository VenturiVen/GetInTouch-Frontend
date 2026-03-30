import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../service/user/userSlice';
import bookingReducer from '../service/booking/bookingSlice';
import slotReducer from '../service/staff/slotSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer,
        slot: slotReducer,
    },
});
