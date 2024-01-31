import { SetRequestResponse } from "../../helpers/error.helper";

export const handleJWTVerification = async (args: any) => {
    const authHeader:string = args.headers.authorization || args.headers.Authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		args.set.status = 401;
		return SetRequestResponse({
			status: 401,
			message: "Unauthorized - Token not provided",
			error: true,
		});
	}

	const headerToken = authHeader.split(" ")[1];
	const profile = await args.jwtAccessToken.verify(headerToken);

	if (!profile) {
		args.set.status = 403;
		return SetRequestResponse({
			status: 403,
			message: "Forbidden - Token verification failed",
			error: true,
		});
	}

	args.currentUser = profile;
	args.currentRole = profile.role;
}