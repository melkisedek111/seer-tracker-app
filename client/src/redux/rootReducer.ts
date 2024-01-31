import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authSlice from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import globalSlice from "./features/global/globalSlice";
import { positionApi } from "./features/position/positionApi";
import positionSlice from "./features/position/positionSlice";

const persistConfig = {
	key: "root",
	storage,
	version: 1
};

const persistedUserReducer = persistReducer(persistConfig, authSlice);

export default combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [positionApi.reducerPath]: positionApi.reducer,
    positionState: positionSlice,
    authState: persistedUserReducer,
    globalState: globalSlice
});