import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import {
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { positionApi } from "./features/position/positionApi";
import { departmentApi } from "./features/deparment/departmentApi";

const logger = createLogger();

const middlewares = [authApi.middleware, positionApi.middleware, departmentApi.middleware];

if (process.env.NODE_ENV === "development") {
	middlewares.push(logger);
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>       
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(middlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const purgePersistor = () => {
	window.localStorage.clear();
	persistor.purge();
}