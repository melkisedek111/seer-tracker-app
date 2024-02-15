import { ApolloServer } from "@apollo/server";
import { ResponseTypes, SetRequestResponse } from "../../helpers/error.helper";
import { customExecuteOperation } from "../../helpers/response.helper";
import { createDepartmentQuery, getDepartmentByParamsQuery, getDepartmentsQuery, updateDepartmentQuery } from "./department.queries";
import { TDepartment } from "./department.model";
import ServiceHelper from "../../helpers/services.helper";
import { CustomRequest } from "../..";

export type CreatePositionType = {
	name: string;
};

export type TGetDepartmentByParamsProps = Partial<TDepartment>;
export type TUpdateDepartmentProps = TDepartment;
export type TDeparmentProps = Omit<TDepartment, "id">

class DepartmentServices extends ServiceHelper {
	private request: CustomRequest;

	constructor(request: CustomRequest) {
		super();
		this.request = request;
	}

	/**
	 * This function is used to create new department
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param
	 * @returns TDepartment[] | null
	 */
	async getDepartments(): Promise<ResponseTypes<TDepartment[]>> {
		try {

			const result = await this.executeGql<TDepartment[]>(
				"getDepartments",
				{
					query: getDepartmentsQuery
				}
			);

			let data: TDepartment[] | undefined = [];
            
            if (result) data = result;

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
	 * @param params TGetDepartmentByParamsProps
	 * @returns TDepartment | null
	 */
	async createDepartment(params: TDeparmentProps): Promise<ResponseTypes> {
		try {

			const getDepartmentByName = await this.executeGql<TDepartment>(
				"getDepartmentByParams", {
					query: getDepartmentByParamsQuery,
					variables: { name: params.name}
				}
			)

			if (getDepartmentByName?.id) return SetRequestResponse({ error: true, message: "Department name is already exists."});

			const getDepartmentByAcronym = await this.executeGql<TDepartment>(
				"getDepartmentByParams", {
					query: getDepartmentByParamsQuery,
					variables: { acronym: params.acronym}
				}
			)

			if (getDepartmentByAcronym?.id) return SetRequestResponse({ error: true, message: "Department acronym is already exists."});

			const result = await this.executeGql<TDepartment>(
				"createDepartment", {
					query: createDepartmentQuery,
					variables: params
				}
			)

			let data: TDepartment | undefined = undefined;

			if (result) data = result;

			return SetRequestResponse<TDepartment>({data, message: "Department has been created."})
			
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
	 * @param params TUpdateDepartmentProps
	 * @returns TDepartment | null
	 */
	async updateDepartment(params: TUpdateDepartmentProps): Promise<ResponseTypes<TDepartment>> {
		try {
			const departmentId = Number(params.id);
			const departmentName = params.name;
			const departmentAcronym = params.acronym;

			// get department by ID
			const getDepartmentById = await this.executeGql(
				"getDepartmentByParams",
				{
					query: getDepartmentByParamsQuery,
					variables: { id: departmentId }
				}
			);

			// check if the department is exists
			if (!getDepartmentById) return SetRequestResponse({error: true, message: "Department doest not exists."});

			// get the department by name
			const getDepartmentByName = await this.executeGql<TDepartment>(
				"getDepartmentByParams",
				{
					query: getDepartmentByParamsQuery,
					variables: { name: params.name }
				}
			);

			// check if the name to be update is exists with different id
			if (getDepartmentByName?.name === departmentName && getDepartmentByName?.id !== departmentId) return SetRequestResponse({error: true, message: "Department name is already exists."});

			// get the department by acronym
			const getDepartmentByAcronym = await this.executeGql<TDepartment>(
				"getDepartmentByParams",
				{
					query: getDepartmentByParamsQuery,
					variables: { acronym: params.acronym }
				}
			);

			// check if the acronym to be update is exists with different id
			if (getDepartmentByAcronym?.acronym === departmentAcronym && getDepartmentByAcronym?.id !== departmentId) return SetRequestResponse({error: true, message: "Department acronym is already exists."});

			const updatedDepartment = await this.executeGql<TDepartment>(
				"updateDepartment",
				{
					query: updateDepartmentQuery,
					variables: { id: departmentId, name: departmentName, acronym: departmentAcronym },
				}
			);

			return SetRequestResponse<TDepartment>({ data: updatedDepartment, message: "Selected Department has been updated." });

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
	async getDepartment({ id }: { id: number }): Promise<ResponseTypes<TDepartment>> {
		try {
			const result = await this.executeGql<TDepartment>(
				"getDepartmentByParams",
				{
					query: getDepartmentByParamsQuery,
					variables: { id: Number(id) },
				}
			);
			
			if (!result)
				return SetRequestResponse({
					message: "Failed to fetch department details.",
				});

			const data: TDepartment = result;

			return SetRequestResponse<TDepartment>({ data });
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
