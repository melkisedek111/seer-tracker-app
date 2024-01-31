import { apollo, gql } from "@elysiajs/apollo";
import PositionModel from "./department.model";
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
	},
	Mutation: {
		createDepartments: async (parent: any, { name }: any) => {
            const departmentModel = new DepartmentModel();
			return await departmentModel.createPosition(name);
		},
	},
};
