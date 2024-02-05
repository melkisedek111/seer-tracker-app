import { apollo, gql } from "@elysiajs/apollo";
import PositionModel, { DepartmentTypes } from "./department.model";
import DepartmentModel from "./department.model";

export const DepartmentResolver = {
	Query: {
		departments: async () => {
            const departmentModel = new DepartmentModel();
			return departmentModel.getPositions();
		},
        getDepartments: async () => {
            const departmentModel = new DepartmentModel();
			return departmentModel.getPositions();
		},
		getDepartmentByParams: async (parent: any, params: DepartmentTypes) => {
			const departmentModel = new DepartmentModel();
			return await departmentModel.getDepartmentByParams(params);
		},
	},
	Mutation: {
		createDepartment: async (parent: any, params: { name: string, acronym: string }) => {
            const departmentModel = new DepartmentModel();
			return await departmentModel.createDepartment(params);
		},
		updateDepartment: async (parent: any, params: DepartmentTypes) => {
			const departmentModel = new DepartmentModel();
			return await departmentModel.updateDepartment(params);
		}
	},
};
