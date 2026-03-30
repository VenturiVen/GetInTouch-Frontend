import { createSlice } from '@reduxjs/toolkit';

const slotSlice = createSlice({
    name: 'slot',
    initialState: {
        slots: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: () => {},
});

export default slotSlice.reducer;
