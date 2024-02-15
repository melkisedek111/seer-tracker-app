import { apollo, gql } from "@elysiajs/apollo";
import {
	AuthSiginType,
	RefreshTokenType,
	GetRefreshTokenInputType,
	UpdateRefreshTokenInputType,
} from "./auth.model";
import AuthModel from "./auth.model";
import PositionModel from "../position/position.model";
import DepartmentModel from "../department/department.model";
import UserModel from "../user/user.model";
import { DepartmentResolver } from "../department/department.resolvers";
import { PositionResolver } from "../position/position.resolvers";

const getPositionAndDepartment = {
	position: PositionResolver.Query.getPosition,
	department: DepartmentResolver.Query.getDepartment
};

/**
 * Resolver for the Auth Queries
 */
export const AuthResolver = {
	Query: {
		getUserAuthSignin: async (parent: any, args: { username: string }) => {
			const authModel = new AuthModel();
			return await authModel.getUserAuthSignin(args);
		},
		getRefreshToken: async (parent: any, args: GetRefreshTokenInputType) => {
			const authModel = new AuthModel();
			return await authModel.getRefreshToken(args);
		},
	},
	UserPositionAndDepartment: {
		...getPositionAndDepartment,
		refreshToken: async (parent: any, args: any) => {
			const authModel = new AuthModel();
			const userId = parent.id;
			return await authModel.getRefreshToken({ userId });
		},
	},
	UserDetailsToRefreshToken: getPositionAndDepartment,
	UserWithRefreshToken: {
		user: async (parent: any, args: any) => {
			const userModel = new UserModel();
			return await userModel.getUserByParams({ id: parent.userId });
		},
	},
	Mutation: {
		saveRefreshToken: async (parent: any, inputs: RefreshTokenType) => {
			const authModel = new AuthModel();
			return await authModel.saveRefreshToken(inputs);
		},
		updateRefreshToken: async (parent: any, args: UpdateRefreshTokenInputType) => {
			const authModel = new AuthModel();
			return await authModel.updateRefreshToken(args);
		},
	},
};
