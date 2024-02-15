import Elysia, { t } from "elysia";
import { ADMIN_LIST, ROLES_LIST } from "../../constants/app.constants";
import { verifyRole } from "../middleware/verifyRoles";
import { createDepartment, getDepartment, getDepartments, updateDepartment } from "../controllers/department.controller";

const departmentRouter = (app: Elysia) => {
	return app.group("/api/department", (app) =>
		app
        .onBeforeHandle(verifyRole(ADMIN_LIST))
        .get("/getDepartment", getDepartment)
        .get("/getDepartments", getDepartments)
		.post("/createDepartment", createDepartment, {
			body: t.Object({
				name: t.String(),
				acronym: t.String()
			})
		})
		.post("/updateDepartment", updateDepartment, {
			body: t.Object({
				id: t.Number(),
				name: t.String(),
				acronym: t.String()
			})
		})
	);
};

export default departmentRouter;
