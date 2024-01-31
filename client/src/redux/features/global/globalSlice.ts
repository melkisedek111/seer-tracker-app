import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ApiResponseType<T = any> = {
    error: boolean;
    status: number;
    data: T;
    message: string;
}


type GlobalStateType = {
	message?: string | undefined;
	isLoading?: boolean;
    statusCode?: 200 | 400 | 401 | 404 | 403;
    isRedirectUnauthorizeToDashboard?: boolean;
};

const initialState: GlobalStateType = {
	message: undefined,
	isLoading: false,
    statusCode: 200,
    isRedirectUnauthorizeToDashboard: false,
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setIsLoading: (state, action: PayloadAction<GlobalStateType>) => {
			state.isLoading = action.payload.isLoading;
		},
		setMessage: (state, action: PayloadAction<GlobalStateType>) => {
			state.message = action.payload.message;
			state.statusCode = action.payload.statusCode;
		},
        setRedirectUnauthorizeToDashboard: (state, action: PayloadAction<GlobalStateType>) => {
			state.isRedirectUnauthorizeToDashboard = action.payload.isRedirectUnauthorizeToDashboard;
		},
	},
});

export const { setIsLoading, setMessage, setRedirectUnauthorizeToDashboard } = globalSlice.actions;

export default globalSlice.reducer;
