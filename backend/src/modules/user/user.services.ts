import { ApolloServer } from "@apollo/server";
import { ResponseTypes, SetRequestResponse } from "../../helpers/error.helper";
import { customExecuteOperation } from "../../helpers/response.helper";
import { CreateUserType } from "./user.model";
import {
	createUserQuery,
	getUserByEmailQuery,
	getUserByParamsQuery,
	getUserByUsernameQuery,
} from "./user.queries";
import { ROLES_LIST } from "../../constants/app.constants";
import { getPositionByParamsQuery } from "../position/position.queries";

export type CreatePositionType = {
	name: string;
};

class UserServices {
	private apolloServer: ApolloServer;

	constructor(apolloServer: ApolloServer) {
		this.apolloServer = apolloServer;
	}

	async createUser(createUserInput: CreateUserType): Promise<ResponseTypes> {
		try {
			if (!ROLES_LIST.includes(createUserInput.role))
				return SetRequestResponse({
					status: 409,
					error: true,
					message: "Selected Roles does not exists.",
				});

			const getUserByEmail = await customExecuteOperation<{
				email: string;
			} | null>(this.apolloServer, "getUserByParams", {
				query: getUserByParamsQuery,
				variables: { email: createUserInput.email },
			});

			if (getUserByEmail)
				return SetRequestResponse({
					status: 409,
					error: true,
					message: "Email is already exists.",
				});

			const getUserByUsername = await customExecuteOperation<{
				email: string;
			} | null>(this.apolloServer, "getUserByParams", {
				query: getUserByParamsQuery,
				variables: { username: createUserInput.username },
			});

			if (getUserByUsername)
				return SetRequestResponse({
					status: 409,
					error: true,
					message: "Username is already exists.",
				});

			const getUserByEmployeeNumber = await customExecuteOperation<{
				email: string;
			} | null>(this.apolloServer, "getUserByParams", {
				query: getUserByParamsQuery,
				variables: { employeeNumber: createUserInput.employeeNumber },
			});

			if (getUserByEmployeeNumber)
				return SetRequestResponse({
					status: 409,
					error: true,
					message: "Employee number is already exists.",
				});

			const getPositionByParams = await customExecuteOperation<{
				email: string;
			} | null>(this.apolloServer, "getPositionByParams", {
				query: getPositionByParamsQuery,
				variables: { id: createUserInput.positionId },
			});
			
			if (!getPositionByParams)
				return SetRequestResponse({
					status: 409,
					error: true,
					message: "Selected position does not exists.",
				});

			const hashedPassword = await Bun.password.hash(createUserInput.password);

			const result = await customExecuteOperation<CreateUserType>(
				this.apolloServer,
				"createUser",
				{
					query: createUserQuery,
					variables: { ...createUserInput, password: hashedPassword },
				}
			);

			let data = undefined;

			if (result) {
				const { password, ...otherResults } = result;
				data = otherResults;
			}

			return SetRequestResponse({
				data,
				message: "User is successfully created.",
			});
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

export default UserServices;
