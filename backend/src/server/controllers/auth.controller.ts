import Elysia from "elysia";
import { CustomRequest } from "../..";
import PositionServices, {
	CreatePositionType,
} from "../../modules/position/position.services";
import AuthServices from "../../modules/auth/auth.services";
import { AuthSiginType } from "../../modules/auth/auth.model";
import { SetRequestResponse } from "../../helpers/error.helper";

const handleAuthSignIn = async (request: CustomRequest) => {
	try {
		const inputs = request.body || {};
		const authServices = new AuthServices(request);
		const result = await authServices.authSignin(inputs as AuthSiginType);
		const { status } = result;
		request.set.status = status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const handleRefreshToken = async (request: CustomRequest) => {
	try {
		const authServices = new AuthServices(request);
		const result = await authServices.handleRefreshToken();
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const handleAuthLogout = async (request: CustomRequest) => {
	try {
		const authServices = new AuthServices(request);
		const result = await authServices.handleAuthLogout();
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

export { handleAuthSignIn, handleRefreshToken, handleAuthLogout };
