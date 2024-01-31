import { customBaseQueryHandler } from "@/utils/rtk.utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthType } from "./authSlice";
import { ApiResponseType } from "../global/globalSlice";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: customBaseQueryHandler,
	tagTypes: ["auth"],
	endpoints: (builder) => ({
		signin: builder.mutation<ApiResponseType<AuthType>,{ username: string; password: string }>({
			query: (payload: { username: string; password: string }) => ({
				url: "auth/signin",
				method: "POST",
				body: payload,
			}),
		}),
	}),
});

export const { useSigninMutation } = authApi;
