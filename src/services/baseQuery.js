import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { setCredentials, logout } from "../store/authSlice";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,

    prepareHeaders: (headers, { getState }) => {
        const token =
            getState()?.auth?.accessToken || localStorage.getItem("accessToken");

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");
        return headers;
    },
});

export const baseQuery = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const state = api.getState();

        const accessToken =
            state?.auth?.accessToken || localStorage.getItem("accessToken");

        const refreshToken =
            state?.auth?.refreshToken || localStorage.getItem("refreshToken");

        let userId = null;
        try {
            userId = accessToken ? jwtDecode(accessToken)?.sub : null;
        } catch {
            userId = null;
        }

        if (!userId || !refreshToken) {
            api.dispatch(logout());
            return result;
        }

        const refreshResult = await rawBaseQuery(
            {
                url: "/Auth/RefreshTokenLogIn",
                method: "POST",
                body: { userId, refreshToken },
            },
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            const { accessToken, refreshToken: newRefreshToken, expiration } =
                refreshResult.data;

            api.dispatch(
                setCredentials({
                    accessToken,
                    refreshToken: newRefreshToken,
                    expiration,
                })
            );

            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};
