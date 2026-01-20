// services/authService.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const authService = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({

        // LOGIN
        login: builder.mutation({
            query: (credentials) => ({
                url: "/Auth/LogIn",
                method: "POST",
                body: credentials,
            }),
        }),

        // REFRESH TOKEN
        refreshToken: builder.mutation({
            query: (data) => ({
                url: "/Auth/RefreshTokenLogIn",
                method: "POST",
                body: data,
            }),
        }),

        // IS LOGGED IN
        isLoggedIn: builder.query({
            query: () => "/Auth/IsLoggedIn",
        }),
    }),
});

export const {
    useLoginMutation,
    useRefreshTokenMutation,
    useIsLoggedInQuery,
} = authService;
