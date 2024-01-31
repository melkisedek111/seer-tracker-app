import { removeCredentials, setCredentials } from '@/redux/features/auth/authSlice';
import { setRedirectUnauthorizeToDashboard } from '@/redux/features/global/globalSlice';
import { RootState, purgePersistor } from '@/redux/store';
import { BaseQueryApi, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';
import { useNavigate } from 'react-router-dom';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
	prepareHeaders: (headers: Headers, api: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>) => {
		const state = api.getState() as RootState;

        if (state) {
            const token = state?.authState.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }
		return headers;
	},
    credentials: "include"
});

export const customBaseQueryHandler = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
    let result = await baseQuery(args, api, extraOptions);
    try {
        // const navigate = useNavigate();
        
        if (result?.error?.status === 403) {
            console.log("sending refresh token");

            const response = await baseQuery("/auth/refreshToken", api, extraOptions);
            if(response.data) {
                const data = response.data as any;
                api.dispatch(setCredentials({ ...data.data }))
                result = await baseQuery(args, api, extraOptions)
            }
            else {
                api.dispatch(removeCredentials());
                purgePersistor();
            }
        }
        else if (result?.error?.status === 401) {
            api.dispatch(setRedirectUnauthorizeToDashboard({ isRedirectUnauthorizeToDashboard: true }));
        }

    } catch (error) {
        console.error(error)
    }

    return result;
}