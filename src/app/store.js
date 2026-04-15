import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../ui/state/userState';
import bookingReducer from '../service/booking/bookingSlice';
import slotReducer from '../service/staff/slotSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer,
        slot: slotReducer,
    },
});
