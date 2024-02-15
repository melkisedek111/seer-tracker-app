import Elysia from "elysia";
import { CustomRequest } from "../..";
import DepartmentServices, { TDeparmentProps, TUpdateDepartmentProps } from "../../modules/department/department.services";


const getDepartments = async (request: CustomRequest) => {
	try {
		const departmentServices = new DepartmentServices(request);
		const result = await departmentServices.getDepartments();
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const createDepartment = async (request: CustomRequest) => {
	try {
		const departmentServices = new DepartmentServices(request);
		const params = request.body || {};
		const result = await departmentServices.createDepartment(params as TDeparmentProps);
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const updateDepartment = async (request: CustomRequest) => {
	try {
		const departmentServices = new DepartmentServices(request);
		const params = request.body || {};
		const result = await departmentServices.updateDepartment(params as TUpdateDepartmentProps);
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

const getDepartment = async (request: CustomRequest) => {
	try {
		const positionServices = new DepartmentServices(request);
		const { id } = request.query;
		const result = await positionServices.getDepartment({ id });
		request.set.status = result.status;
		return result;
	} catch (error) {
		console.log(error);
	}
};

export { getDepartments, createDepartment, updateDepartment, getDepartment };
