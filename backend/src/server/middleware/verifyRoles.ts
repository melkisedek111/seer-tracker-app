import { ROLES_LIST, ADMIN_LIST } from "../../constants/app.constants";
import { SetRequestResponse } from "../../helpers/error.helper";

export const verifyRole = (allowedRoles: typeof ROLES_LIST | typeof ADMIN_LIST) => {
    return (args: any) => {
                
        if (!args?.currentRole) {
            args.set.status = 401;
            return SetRequestResponse({
                status: 401,
                message: "Unauthorized",
                error: true,
            });
        }
        const rolesList = [...allowedRoles];

        if(!rolesList.includes(args?.currentRole)) {
            args.set.status = 401;
            return SetRequestResponse({
                status: 401,
                message: "Unauthorized",
                error: true,
            });
        }
    }
}