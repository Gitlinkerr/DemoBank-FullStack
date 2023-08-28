import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.loggedIn = true;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loggedIn = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
