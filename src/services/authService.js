import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const authService = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({

        // LOGIN
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),

        // SIGNUP
        signup: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),

        // ACCOUNT VERIFY (email onay)
        verifyAccount: builder.mutation({
            query: (token) => ({
                url: `/auth/verify?token=${token}`,
                method: "POST",
            }),
        }),

        // FORGOT PASSWORD (email gönder)
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { email },
            }),
        }),

        // RESET PASSWORD (kod + yeni şifre)
        resetPassword: builder.mutation({
            query: ({ token, newPassword }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: {
                    token,
                    password: newPassword,
                },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useVerifyAccountMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authService;
