import {
	PrismaClient,
	User as UserType,
	Position as PositionType,
	Department as DepartmentType,
} from "@prisma/client";
import prismaClient from "../../helpers/prismaClient";

export type AuthSiginType = {
	username: string;
	password: string;
};

export type GetUserType = {
	id: number;
	employeeNumber: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	position: {
		id: number;
		name: string;
	};
	department: {
		id: number;
		name: string;
		acronym: string;
	};
}

export type AuthGetUserType = GetUserType & {
	refreshToken: {
		id: number;
		userId: number;
		token: string[];
	}
};

export type RefreshTokenType = {
	id: number;
	userId: number;
	token: string[];
};

export type GetRefreshTokenInputType = {
	id?: number;
	userId?: number;
	token?: string;
};

export type UpdateRefreshTokenInputType = {
	findToken?: string;
	isRemoveToken?: boolean;
	data: {
		token: string[];
		userId: number;
	};
};

export type UserWithRefreshTokenType = {
	id: number;
	token: string[];
	userId: number;
	user: GetUserType
}

/**
 * 
 */
class AuthModel {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = prismaClient;
	}

	/**
	 * This function is used the get the user details when login
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param inputs 
	 * @returns UserType
	 */
	async getUserAuthSignin(inputs: {username: string;}): Promise<UserType | null> {
		
		const user =  await this.prisma.user.findFirst({
			where: {
				OR: [
					{
						employeeNumber: inputs.username,
					},
					{
						email: inputs.username,
					},
					{
						username: inputs.username,
					},
				],
			},
		});

		return user;
	}

	/**
	 * This function is used create new refresht token
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params RefreshTokenType
	 * @returns UserType
	 */
	async saveRefreshToken(params: RefreshTokenType): Promise<RefreshTokenType | null>{
		const refreshToken =  await this.prisma.refreshToken.create({
			data: { ...params },
		});

		return refreshToken;
	}

	/**
	 * This function is used create new refresht token
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params GetRefreshTokenInputType
	 * @returns RefreshTokenType
	 */
	async getRefreshToken(params: GetRefreshTokenInputType): Promise<RefreshTokenType | null> {
		const { token, ...otherParams } = params;

		// optional where params: if token exists then get token by refresh token else use the other fields
		const whereParams = {
			...(token ? { token: { has: token }} : {}),
			...otherParams
		}

		const refreshToken = await this.prisma.refreshToken.findFirst({
			where: whereParams,
		});

		return refreshToken;
	}

	/**
	 * This function is used to update refersh token
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param params UpdateRefreshTokenInputType
	 * @returns RefreshTokenType
	 */	
	async updateRefreshToken(params: UpdateRefreshTokenInputType): Promise<RefreshTokenType | null> {
		const { findToken, data, isRemoveToken } = params;

		// initialize token with empty array
		let tokenData: { token: any } = { token: [] };

		// check if the token is to remove
		if (!isRemoveToken) {

			// if token is string then append new token to the existing array of token in the database
			if (typeof params.data.token === "string") {
				tokenData = {
					token: {
						push: params.data.token,
					},
				};
			// if token is a array then set a new set of refresh token
			} else if (Array.isArray(params.data.token)) {
				tokenData = {
					token: params.data.token as string[],
				};
			}
		}

		// initialize where clause
		let whereClause: any = {
			userId: data.userId,
			token: {
				has: findToken,
			},
		};

		// if token(refresh token) for fetching is exists and there is no user id then update the refresh token by findToken (refrehs token)
		if(findToken && !data.userId) {
			whereClause = {
				token: {
					has: findToken,
				}
			}
		// if findToken is not exists and user Id is exist then use the user id to update the refresh token 
		} else if (!findToken && data.userId) {
			whereClause = { userId: data.userId }
		}

		const refreshToken = await this.prisma.refreshToken.update({
			where: whereClause,
			data: tokenData,
		});

		return refreshToken;
	}
}

export default AuthModel;
