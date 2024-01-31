import Elysia, { t } from "elysia";
import { createUser } from "../controllers/user.controller";

const userRouter = (app: Elysia) => {
	return app.group("/api/user", (app) =>
		app.post("/create", createUser, {
			body: t.Object({
				employeeNumber: t.String(),
				username: t.String(),
				password: t.String(),
				firstName: t.String(),
				middleName: t.String(),
				lastName: t.String(),
				email: t.String(),
				homeAddress: t.String(),
				gender: t.String(),
				contactNo: t.String(),
				role: t.String(),
				positionId: t.Number(),
				departmentId: t.Number(),
				status: t.String(),
			}),
		})
	);
};

export default userRouter;
