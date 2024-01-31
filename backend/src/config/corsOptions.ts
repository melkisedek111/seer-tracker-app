import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
    origin: (origin: any, callback: (...args: any) => {}) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not Allowed by CORS"))
        }
    },
    optionSuccessStatus: 200
}