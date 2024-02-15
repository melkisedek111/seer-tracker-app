import { PrismaClient, Department as DepartmentType } from "@prisma/client";
import { prismaQueryHandler } from "../../helpers/prisma.helper";

export type TDepartment = {
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

	/**
	 * This function is used to get departments
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params
	 * @returns TDepartment[] | null
	 */
	async getDepartments(): Promise<TDepartment[] | null> {
		return await prismaQueryHandler<TDepartment[]>(async () => {
			return await this.prisma.department.findMany({});
		}, "getDepartments");
	}

	/**
	 * This function is used to get all position by params
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params { name: string }
	 * @returns PositionType | null
	 */
	async getDepartmentByParams(
		params: Partial<TDepartment>
	): Promise<DepartmentType | null> {
		return await prismaQueryHandler<DepartmentType | null>(async () => {
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
		params: TDepartment
	): Promise<DepartmentType | null> {
		return await prismaQueryHandler<DepartmentType | null>(async () => {
			return await this.prisma.department.create({
				data: params
			});
		}, "createDepartment");
	}

	/**
	 * This function is used to update department
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params TDepartment
	 * @returns DepartmentType | null
	 */
	async updateDepartment(
		params: TDepartment
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
