// services/userService.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const userService = createApi({
    reducerPath: "userApi",
    baseQuery,
    endpoints: (builder) => ({

        // SIGN UP
        createUser: builder.mutation({
            query: (data) => ({
                url: "/User/CreateUser",
                method: "POST",
                body: data,
            }),
        }),

        // VERIFY EMAIL
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "/User/verify-email",
                method: "POST",
                body: data,
            }),
        }),

        // SEND VERIFICATION MAIL
        sendVerificationMail: builder.mutation({
            query: (data) => ({
                url: "/User/SendVerificationMail",
                method: "POST",
                body: data,
            }),
        }),

        // FORGOT PASSWORD
        sendResetPasswordMail: builder.mutation({
            query: (data) => ({
                url: "/User/SendResetPasswordMail",
                method: "POST",
                body: data,
            }),
        }),

        // VERIFY RESET TOKEN
        verifyResetPasswordToken: builder.query({
            query: (data) => ({
                url: "/User/VerifyResetPasswordToken",
                method: "POST",
                body: data,
            }),
        }),

        // UPDATE PASSWORD
        updatePassword: builder.mutation({
            query: (data) => ({
                url: "/User/UpdatePassword",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateUserMutation,
    useVerifyEmailMutation,
    useSendVerificationMailMutation,
    useSendResetPasswordMailMutation,
    useVerifyResetPasswordTokenQuery,
    useUpdatePasswordMutation,
} = userService;
