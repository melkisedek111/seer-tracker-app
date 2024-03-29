import Elysia from "elysia";
import { CustomRequest } from "../..";
import PositionServices, {
	TCreatePosition,
} from "../../modules/position/position.services";
import { PositionTypes } from "../../modules/position/position.model";

const getPositions = async (request: CustomRequest) => {
	try {
		const positionServices = new PositionServices(request.apolloServer);
		const result = await positionServices.getPositions();
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const getPosition = async (request: CustomRequest) => {
	try {
		const positionServices = new PositionServices(request.apolloServer);
		const { id } = request.query;
		const result = await positionServices.getPosition({ id });
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const updatePosition = async (request: CustomRequest) => {
	try {
		const positionServices = new PositionServices(request.apolloServer);
		const { id, name } = request.body as PositionTypes;
		const result = await positionServices.updatePosition({ id, name });
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const createPosition = async (request: CustomRequest) => {
	try {
		const { name } = request.body as TCreatePosition;
		const positionServices = new PositionServices(request.apolloServer);
		const result = await positionServices.createPosition({ name });
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const deletePosition = async (request: CustomRequest) => {
	try {

		return "DELETE FEATURE IS PROHIBITED"
		const params = request.body || {};
		const positionServices = new PositionServices(request.apolloServer);
		const result = await positionServices.deletePosition(params as { id: number });
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

export { getPositions, createPosition, getPosition, updatePosition, deletePosition };
