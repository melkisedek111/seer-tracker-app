import { apollo, gql } from "@elysiajs/apollo";
import PositionModel, { PositionTypes } from "./position.model";

export const PositionResolver = {
	Query: {
		getPosition: async (parent: any, args: any) => {
			const positionModel = new PositionModel();
			return await positionModel.getPositionByParams({ id: parent.positionId });
		},
		getPositions: async () => {
			const positionModel = new PositionModel();
			return positionModel.getPositions();
		},
		getPositionByParams: async (parent: any, params: PositionTypes) => {
			const positionModel = new PositionModel();
			return await positionModel.getPositionByParams(params);
		},
	},
	Mutation: {
		createPosition: async (parent: any, { name }: any) => {
			const positionModel = new PositionModel();
			return await positionModel.createPosition(name);
		},
		updatePosition: async (parent: any, params: PositionTypes) => {
			const positionModel = new PositionModel();
			return await positionModel.updatePosition(params);
		},
		deletePosition: async (parent: any, params: { id: number }) => {
			const positionModel = new PositionModel();
			return await positionModel.deletePosition(params);
		},
	},
};
