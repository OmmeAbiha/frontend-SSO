import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  OtpLength: 0,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        OtpLengthIncrement: (state) => {
            state.OtpLength += 1;
        },

        OtpLengthDecremental: (state) => {
            state.OtpLength -= 1;
        },

        clearOtpLength: (state) => {
            state.OtpLength = 0;
        },
    },
});

// Action creators are generated for each case reducer function
export const { OtpLengthIncrement, OtpLengthDecremental, clearOtpLength } = authSlice.actions;

export default authSlice.reducer;