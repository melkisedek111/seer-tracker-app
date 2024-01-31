import { apollo, gql } from "@elysiajs/apollo";
import PositionModel, { PositionTypes } from "./position.model";

export const PositionResolver = {
	Query: {
		positions: async () => {
			const positionModel = new PositionModel();
			return positionModel.getPositions();
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
	},
};
