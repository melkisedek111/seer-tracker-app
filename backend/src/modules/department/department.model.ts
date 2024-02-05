import { PrismaClient, Department as DepartmentType } from "@prisma/client";

export type DepartmentTypes = {
	id: number;
	name: string;
	acronym: string;
}

export type GetDepartmentByParamsType = {
	id?: number;
	name?: string;
	acronym?: string;
}

class DepartmentModel {
	prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

	async getDepartmentByParams(params: GetDepartmentByParamsType): Promise<DepartmentType | null> {
		return await this.prisma.department.findFirst({
			where: { ...params },
		});
	}

	/**
	 * This function is used to get all position by params
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params { name: string }
	 * @returns PositionType | null
	 */
	async getDepartmentByParams(
		params: DepartmentTypes
	): Promise<DepartmentType | null> {
		return await prismaQueryHandler<PositionType | null>(async () => {
			return await this.prisma.department.findFirst({
				where: { ...params },
			});
		}, "getDepartmentByParams");
	}

	/**
	 * This function is used to create new department
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params { name: string, acronym }
	 * @returns PositionType | null
	 */
	async createDepartment(
		params: { name: string, acronym: string }
	): Promise<DepartmentType | null> {
		return await prismaQueryHandler<PositionType | null>(async () => {
			return await this.prisma.department.create({
				data: params
			});
		}, "createDepartment");
	}

	/**
	 * This function is used to update department
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params DepartmentTypes
	 * @returns DepartmentType | null
	 */
	async updateDepartment(
		params: DepartmentTypes
	): Promise<DepartmentType | null> {
		return await prismaQueryHandler<DepartmentType | null>(async () => {
			return await this.prisma.department.update({
				where: {
					id: params.id
				},
				data: {
					name: params.name,
					acronym: params.acronym
				},
			});
		}, "updateDepartment");
	}
}

export default DepartmentModel;
