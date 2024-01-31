import Elysia, { t } from "elysia";
import { handleAuthLogout, handleAuthSignIn, handleRefreshToken } from "../controllers/auth.controller";
import jwt from "@elysiajs/jwt";

const authRouter = (app: Elysia) => {
	return app
		.group("/api/auth", (app) =>
			app.post("/signin", handleAuthSignIn, {
				body: t.Object({
					username: t.String(),
					password: t.String(),
				}),
			})
			.get("/refreshToken", handleRefreshToken)
			.get("/logout", handleAuthLogout)
		);
};

export default authRouter;
