import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
