import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,

    prepareHeaders: (headers, { getState }) => {
        const token =
            getState()?.auth?.accessToken ||
            localStorage.getItem("accessToken ");

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");

        return headers;
    },
});
