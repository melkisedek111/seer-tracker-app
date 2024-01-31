import { apollo, gql } from "@elysiajs/apollo";
import UserModel, { CreateUserType, GetUserByParamsType } from "./user.model";




export const UserResolver = {
	Query: {
		getUsers: async () => {
			const userModel = new UserModel();
		},
		getUserByParams: async (parent: any, args: GetUserByParamsType) => {
			const userModel = new UserModel();
			return await userModel.getUserByParams(args);
		},
	},
	Mutation: {
		createUser: async (parent: any, createUserInput: CreateUserType) => {
			const userModel = new UserModel();
			return await userModel.createUser(createUserInput);
		},
	},
};
