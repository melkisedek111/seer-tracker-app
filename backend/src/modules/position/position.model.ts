import { PrismaClient, Position as PositionType, Prisma } from "@prisma/client";
import prismaClient from "../../helpers/prismaClient";
import { prismaQueryHandler } from "../../helpers/prisma.helper";

export type PositionTypes = {
	id?: number;
	name?: string;
};

class PositionModel {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = prismaClient;
	}

	/**
	 * This function is used to create new position
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params { name: string }
	 * @returns PositionType | null
	 */
	async createPosition(name: string): Promise<PositionType | null> {
		return await prismaQueryHandler<PositionType>(async () => {
			return await this.prisma.position.create({
				data: { name },
			});
		}, "createPosition");
	}

	/**
	 * This function is used to get all positions
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params { name: string }
	 * @returns PositionType | null
	 */
	async getPositions(): Promise<PositionType[] | null> {
		return await prismaQueryHandler<PositionType[]>(async () => {
			return this.prisma.position.findMany({});
		}, "getPositions");
	}

	/**
	 * This function is used to get all position by params
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params { name: string }
	 * @returns PositionType | null
	 */
	async getPositionByParams(
		params: PositionTypes
	): Promise<PositionType | null> {
		return await prismaQueryHandler<PositionType | null>(async () => {
			return await this.prisma.position.findFirst({
				where: { ...params },
			});
		}, "getPositionByParams");
	}

	/**
	 * This function is used to update position
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params { name: string }
	 * @returns PositionType | null
	 */
		async updatePosition(
			params: PositionTypes
		): Promise<PositionType | null> {
			return await prismaQueryHandler<PositionType | null>(async () => {
				return await this.prisma.position.update({
					where: {
						id: params.id
					},
					data: {
						name: params.name
					},
				});
			}, "updatePosition");
		}
}

export default PositionModel;
