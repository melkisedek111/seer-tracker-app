import Elysia from "elysia";
import { CustomRequest } from "../..";
import PositionServices, {
	CreatePositionType,
} from "../../modules/position/position.services";
import { CreateUserType } from "../../modules/user/user.model";
import UserServices from "../../modules/user/user.services";

const createUser = async (request: CustomRequest) => {
	try {
		const inputs = request.body || {};
        const userServices = new UserServices(request.apolloServer);
        const result = await userServices.createUser(inputs as CreateUserType);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export { createUser };
