import { ApolloServer } from "@apollo/server";
import { ResponseTypes, SetRequestResponse } from "../../helpers/error.helper";
import { customExecuteOperation } from "../../helpers/response.helper";
import {
	createPositionQuery,
	getPositionByParamsQuery,
	getPositionsQuery,
	updatePositionQuery,
} from "./position.queries";
import { PositionTypes } from "./position.model";

export type CreatePositionType = {
	name: string;
};

class PositionServices {
	private apolloServer: ApolloServer;

	constructor(apolloServer: ApolloServer) {
		this.apolloServer = apolloServer;
	}

	/**
	 * This function is used to create new position
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params CreatePositionType
	 * @returns PositionType | null
	 */
	async createPosition({ name }: CreatePositionType): Promise<ResponseTypes> {
		try {
			// get position by name
			const getPositionByName = await customExecuteOperation<PositionTypes>(
				this.apolloServer,
				"getPositionByParams",
				{
					query: getPositionByParamsQuery,
					variables: { name },
				}
			);

			// check if the position is already exists
			if (getPositionByName?.id) return SetRequestResponse({ error: true, message: "Position is already exists.",});

			// save position to the database
			const result = await customExecuteOperation<PositionTypes>(
				this.apolloServer,
				"createPosition",
				{
					query: createPositionQuery,
					variables: { name },
				}
			);

			let data: PositionTypes | undefined = undefined;

			if (result) data = result;

			return SetRequestResponse({ data, message: "Position has been created." });
		} catch (error) {
			console.log(error);
			return SetRequestResponse({
				error: true,
				message: "Server error!",
				status: 500,
			});
		}
	}

	/**
	 * This function is used to update position
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params CreatePositionType
	 * @returns PositionType | null
	 */
	async updatePosition(params: PositionTypes): Promise<ResponseTypes> {
		try {
			const positionId = Number(params.id);
			const positionName = params.name;

			// get position by id
			const getPositionById = await customExecuteOperation<PositionTypes>(
				this.apolloServer,
				"getPositionByParams",
				{
					query: getPositionByParamsQuery,
					variables: { id: positionId },
				}
			);

			// check for position if exists
			if (!getPositionById) return SetRequestResponse({ error: true, message: "Position does not exists.",});

			// get position by name
			const getPositionByName = await customExecuteOperation<PositionTypes>(
				this.apolloServer,
				"getPositionByParams",
				{
					query: getPositionByParamsQuery,
					variables: { name: positionName },
				}
			);

			// check if position name is unique
			if(!getPositionByName) {
				const updatePosition = await customExecuteOperation<PositionTypes>(
					this.apolloServer,
					"updatePosition",
					{
						query: updatePositionQuery,
						variables: { id: positionId, name: positionName },
					}
				);

				return SetRequestResponse({ data: updatePosition, message: "Position name has been updated." });
			} 

			// if position name has no changes
			if(positionId === getPositionByName.id) return SetRequestResponse({ });

			return SetRequestResponse({ error: true, message: "Position already exists.",});
			
		} catch (error) {
			console.log(error);
			return SetRequestResponse({
				error: true,
				message: "Server error!",
				status: 500,
			});
		}
	}

	/**
	 * This function is used to get positions
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params 
	 * @returns PositionType | null
	 */
	async getPositions(): Promise<ResponseTypes> {
		try {
			type Position = {
				id: number;
				name: string;
			};

			const result = await customExecuteOperation<Position[]>(
				this.apolloServer,
				"getPositions",
				{
					query: getPositionsQuery,
				}
			);
			let data: Position[] = [];

			if (result) {
				data = result;
			}

			return SetRequestResponse({ data });
		} catch (error) {
			console.log(error);
			return SetRequestResponse({
				error: true,
				message: "Server error!",
				status: 500,
			});
		}
	}

	/**
	 * This function is used to get position
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params {id: number}
	 * @returns PositionType | null
	 */
	async getPosition({ id }: { id: number }): Promise<ResponseTypes> {
		try {
			const result = await customExecuteOperation<PositionTypes>(
				this.apolloServer,
				"getPositionByParams",
				{
					query: getPositionByParamsQuery,
					variables: { id: Number(id) },
				}
			);

			if (!result)
				return SetRequestResponse({
					data: undefined,
					message: "Failed to fetch position details.",
				});

			return SetRequestResponse({ data: result });
		} catch (error) {
			console.log(error);
			return SetRequestResponse({
				error: true,
				message: "Server error!",
				status: 500,
			});
		}
	}
}

export default PositionServices;
