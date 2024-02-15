import Elysia, { t } from "elysia";
import {
	createPosition,
	getPositions,
    getPosition,
    updatePosition,
    deletePosition
} from "../controllers/position.controller";
import { handleJWTVerification } from "../middleware/verifyJwt";
import { ADMIN_LIST, ROLES_LIST } from "../../constants/app.constants";
import { verifyRole } from "../middleware/verifyRoles";

const positionRouter = (app: Elysia) => {
	return app.group("/api/position", (app) =>
		app
        .onBeforeHandle(verifyRole(ADMIN_LIST))
        .get("/getPositions", getPositions)
        .get("/getPosition", getPosition)
        .post("/create", createPosition, {
            body: t.Object({
                name: t.String()
            })
        })
        .post("/updatePosition", updatePosition, {
            body: t.Object({
                name: t.String(),
                id: t.Number()
            })
        })
        .post("/deletePosition", deletePosition, {
            body: t.Object({
                id: t.Number()
            })
        })
	);
};

export default positionRouter;
