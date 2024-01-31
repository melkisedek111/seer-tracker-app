import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserDetails = {
    id: number;
    employeeNumber: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    position: {
        id: number;
        name: string;
    };
    department: {
        id: number;
        name: string;
        acronym: string;
    }
}

export type AuthType = {
    user: UserDetails,
    token: string
}

type AuthState = {
	user: UserDetails | null,
    token: string | null;
    isSignedIn: boolean;
    role: string | null;
};


const initialState: AuthState = {
    user: null,
    token: null,
    isSignedIn: false,
    role: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthType>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isSignedIn = true;
            state.role = action.payload.user.role;
        },
        removeCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.isSignedIn = false;
            state.role = null;
        }
        
    }
})

export const { setCredentials, removeCredentials } = authSlice.actions

export default authSlice.reducer