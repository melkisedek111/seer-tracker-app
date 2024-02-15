import { apollo, gql } from "@elysiajs/apollo";
import PositionModel, { TDepartment } from "./department.model";
import DepartmentModel from "./department.model";

export const DepartmentResolver = {
	Query: {
		getDepartment: async (parent: { departmentId: number }, args: any) => {
			const departmentModel = new DepartmentModel();
			return await departmentModel.getDepartmentByParams({
				id: parent.departmentId,
			});
		},
        getDepartments: async () => {
            const departmentModel = new DepartmentModel();
			return await departmentModel.getDepartments();
		},
		getDepartmentByParams: async (parent: any, params: Partial<TDepartment>) => {
			const departmentModel = new DepartmentModel();
			return await departmentModel.getDepartmentByParams(params);
		},
	},
	Mutation: {
		createDepartment: async (parent: any, params: TDepartment) => {
            const departmentModel = new DepartmentModel();
			return await departmentModel.createDepartment(params);
		},
		updateDepartment: async (parent: any, params: TDepartment) => {
			const departmentModel = new DepartmentModel();
			return await departmentModel.updateDepartment(params);
		}
	},
};
