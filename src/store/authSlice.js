import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    expiration: localStorage.getItem("tokenExpiration" || null),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, refreshToken, expiration } = action.payload;

            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.expiration = expiration;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("tokenExpiration", expiration);
        },

        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.expiration = null;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("tokenExpiration");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
