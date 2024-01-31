import { apollo, gql } from "@elysiajs/apollo";
import {
	AuthSiginType,
	RefreshTokenType,
	GetRefreshTokenInputType,
	UpdateRefreshTokenInputType,
} from "./auth.model";
import AuthModel from "./auth.model";
import PositionModel, { GetPositionByType } from "../position/position.model";
import DepartmentModel from "../department/department.model";
import UserModel from "../user/user.model";

const getPositionAndDepartment = {
	position: async (parent: any, args: any) => {
		const positionModel = new PositionModel();
		return await positionModel.getPositionByParams({ id: parent.positionId });
	},
	department: async (parent: any, args: any) => {
		const departmentModel = new DepartmentModel();
		return await departmentModel.getDepartmentByParams({
			id: parent.departmentId,
		});
	},
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
