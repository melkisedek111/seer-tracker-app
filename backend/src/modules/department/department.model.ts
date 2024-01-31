import { PrismaClient, Department as DepartmentType } from "@prisma/client";

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
}

export default DepartmentModel;
