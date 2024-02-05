import { ApolloServer } from "@apollo/server";
import { ResponseTypes, SetRequestResponse } from "../../helpers/error.helper";
import { customExecuteOperation } from "../../helpers/response.helper";
import { createDepartmentQuery, getDepartmentByParamsQuery, getDepartmentQuery } from "./department.queries";
import { DepartmentTypes } from "./department.model";

export type CreatePositionType = {
	name: string;
};

export type GetDepartmentByParamsProps = Partial<DepartmentTypes>;
export type UpdateDepartmentProps = DepartmentTypes;

class DepartmentServices {
	private apolloServer: ApolloServer;

	constructor(apolloServer: ApolloServer) {
		this.apolloServer = apolloServer;
	}

	/**
	 * This function is used to create new department
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param
	 * @returns DepartmentTypes[] | null
	 */
	async getDepartments(): Promise<ResponseTypes<DepartmentTypes>> {
		try {

			const result = await customExecuteOperation<DepartmentTypes>(
				this.apolloServer,
				"getDepartments",
				{
					query: getDepartmentQuery
				}
			);

			let data: DepartmentTypes | undefined = undefined;
            
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
	 * This function is used to create new department
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params GetDepartmentByParamsProps
	 * @returns DepartmentTypes | null
	 */
	async createDepartment(params: GetDepartmentByParamsProps): Promise<ResponseTypes> {
		try {

			const getDepartmentByName = await customExecuteOperation<DepartmentTypes>(
				this.apolloServer,
				"getDepartmentByParams", {
					query: getDepartmentByParamsQuery,
					variables: { name: params.name}
				}
			)

			if (getDepartmentByName?.id) return SetRequestResponse({ error: true, message: "Department name is already exists."});

			const getDepartmentByAcronym = await customExecuteOperation<DepartmentTypes>(
				this.apolloServer,
				"getDepartmentByParams", {
					query: getDepartmentByParamsQuery,
					variables: { acronym: params.acronym}
				}
			)

			if (getDepartmentByAcronym?.id) return SetRequestResponse({ error: true, message: "Department acronym is already exists."});

			const result = await customExecuteOperation<DepartmentTypes>(
				this.apolloServer,
				"createDepartment", {
					query: createDepartmentQuery,
					variables: params
				}
			)

			const data: DepartmentTypes | undefined = undefined;

			if (result) data = result;

			return SetRequestResponse<DepartmentTypes>({data, message: "Department has been created."})
			
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
	 * This function is used to update department
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params UpdateDepartmentProps
	 * @returns DepartmentTypes | null
	 */
	async updateDepartment(params: UpdateDepartmentProps): Promise<ResponseTypes<DepartmentTypes>> {
		try {
			const departmentId = Number(params.id);
			const departmentName = params.name;
			const departmentAcronym = params.acronym;

			// get department by ID
			const getDepartmentById = await customExecuteOperation(
				this.apolloServer,
				"getDepartmentByParams",
				{
					query: getDepartmentByParamsQuery,
					variables: { id: departmentId }
				}
			);

			// check if the department is exists
			if (!getDepartmentById) return SetRequestResponse({error: true, message: "Department doest not exists."});

			// get the department by name
			const getDepartmentByName = await customExecuteOperation(
				this.apolloServer,
				"getDepartmentByParams",
				{
					query: getDepartmentByParamsQuery,
					variables: { name: params.name }
				}
			);

			// check if the name to be update is exists with different id
			if (getDepartmentByName.name === departmentName && getDepartmentByName.id !== departmentId) return SetRequestResponse({error: true, message: "Department name is already exists."});

			// get the department by acronym
			const getDepartmentByAcronym = await customExecuteOperation(
				this.apolloServer,
				"getDepartmentByParams",
				{
					query: getDepartmentByParamsQuery,
					variables: { acronym: params.acronym }
				}
			);

			// check if the acronym to be update is exists with different id
			if (getDepartmentByAcronym.acronym === departmentAcronym && getDepartmentByAcronym.id !== departmentId) return SetRequestResponse({error: true, message: "Department acronym is already exists."});

			const updatedDepartment = await customExecuteOperation<DepartmentTypes>(
				this.apolloServer,
				"updateDepartment",
				{
					query: updateDepartmentQuery,
					variables: { id: departmentId, name: departmentName, acronym: departmentAcronym },
				}
			);

			return SetRequestResponse<DepartmentTypes>({ data: updatedDepartment, message: "Department name has been updated." });

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

export default DepartmentServices;
