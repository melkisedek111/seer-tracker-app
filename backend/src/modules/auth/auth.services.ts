import { ApolloServer } from "@apollo/server";
import { ResponseTypes, SetRequestResponse } from "../../helpers/error.helper";
import { customExecuteOperation } from "../../helpers/response.helper";
import { AuthGetUserType, AuthSiginType, RefreshTokenType, UserWithRefreshTokenType } from "./auth.model";
import {
	getRefreshTokenQuery,
	getUserAuthSigninQuery,
	updateRefreshTokenQuery,
	saveRefreshTokenQuery,
} from "./auth.queries";
import { CustomRequest } from "../..";
import { getUserByParamsQuery } from "../user/user.queries";
import { CustomUserType } from "../user/user.model";
import ServiceHelper from "../../helpers/services.helper";

export type CreatePositionType = {
	name: string;
};

class AuthServices extends ServiceHelper {
	private request: CustomRequest;

	constructor(request: CustomRequest) {
		super();
		this.request = request;
	}

	/**
	 * This is used for user signin and setting up cookies
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @param signinInput: AuthSiginType 
	 * @returns ResponseTypes
	 */
	async authSignin(signinInput: AuthSiginType): Promise<ResponseTypes> {
		try {
			const cookie = this.request.cookie;
			console.log(`cookie available at login: ${JSON.stringify(cookie)}`);

			const { username, password: inputPassword } = signinInput;

			if (!username || !inputPassword)
				return SetRequestResponse({
					message: "Username or password is required",
					status: 400,
					error: true,
				});
			
			// get user details with refrseh token details based on the giver username
			const getUserAuthSignin = await this.executeGql<AuthGetUserType | null>(
				"getUserAuthSignin",
					{
						query: getUserAuthSigninQuery,
						variables: { username: signinInput.username },
					}
				);

			// if user doest not exists by the provided credentials return status error
			if (!getUserAuthSignin) return SetRequestResponse({
				message: "Username or password does not matched",
				status: 400,
				error: true,
			});
			const { password, refreshToken, ...otherUserDetails } = getUserAuthSignin;
			
			const isMatch = await Bun.password.verify(inputPassword, password);

			// check if the password match return error
			if (!isMatch)
				return SetRequestResponse({
					message: "Username or password is required",
					status: 400,
					error: true,
				});

			// set access token
			const accessToken = await this.request.jwtAccessToken.sign({
				...otherUserDetails,
			});

			// set refresh token
			const newRefreshToken = await this.request.jwtRefreshToken.sign({
				...otherUserDetails,
			});

			// if current cookie does not exist then get the refresh token from the database as new refresh tokens else remove the token from the database
			let newRefreshTokens = !cookie?.jwt ? getUserAuthSignin.refreshToken.token : getUserAuthSignin.refreshToken.token.filter(token => token !== cookie.jwt);

			// cookie exists
			if (cookie?.jwt) {
				const refreshToken = cookie?.jwt;

				// get user details based on the current cookie (jwt: refresh token)
				const foundUserWithToken = await this.executeGql<UserWithRefreshTokenType | null>(
					"getRefreshToken",
					{
						query: getRefreshTokenQuery,
						variables: { token: refreshToken },
					}
				);

				// if user is not found then remove then entire refresh token from the database
				if(!foundUserWithToken) {
					newRefreshTokens = [];
				}
			}

			// add / set new refresh token from the database
			const saveRefreshToken = await this.executeGql<UserWithRefreshTokenType | null>(
				"updateRefreshToken",
				{
					query: updateRefreshTokenQuery,
					variables: {
						data: { userId: getUserAuthSignin.id, token: [...newRefreshTokens, newRefreshToken] },
					},
				}
			);

			this.request.setCookie("jwt", newRefreshToken, {
				httpOnly: true,
				// sameSite: 'None', 
				// secure: true, 
				maxAge: 24 * 60 * 60 * 1000
			})

			return SetRequestResponse({
				data: { token: accessToken, user: {...otherUserDetails} },
				message: "You are successfully signed in.",
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

	/**
	 * This function is used remove cookies
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @returns ResponseTypes
	 */
	async handleAuthLogout(): Promise<ResponseTypes> {
		try {
			const refreshToken = this.request.cookie.jwt;

			// if jwt refresh token does not exist then return status 204
			if (!refreshToken) return SetRequestResponse({ status: 204 });

			// get user details from database by refreshToken
			const foundUserWithToken = await this.executeGql<UserWithRefreshTokenType | null>(
				"getRefreshToken",
				{
					query: getRefreshTokenQuery,
					variables: { token: refreshToken },
				}
			);

			// if user is not found the remove cookie and return status 204
			if (!foundUserWithToken) {
				this.request.removeCookie("jwt", {
					httpOnly: true,
					// sameSite: "None",
					// secure: true,
				});
				return SetRequestResponse({ status: 204 });
			}

			const refreshTokens = foundUserWithToken.token.filter(token => token !== refreshToken);

			// update the user tokens by deletin all existed token from the database
			const updateRefreshToken = await this.executeGql<RefreshTokenType | null>(
				"updateRefreshToken",
				{
					query: updateRefreshTokenQuery,
					variables: {
						data: { userId: foundUserWithToken.userId },
						isRemoveToken: true,
					},
				}
			);

			// remove current cookie
			this.request.removeCookie("jwt", {
				httpOnly: true,
				// sameSite: "None",
				// secure: true
			});

			return SetRequestResponse({ status: 204 });
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
	 * This function is used to remove cookies and logout the user
	 * Updated by: Mel Ubalde @ Friday, January 26, 2024 3:49 PM
	 * @returns ResponseTypes
	 */
	async handleRefreshToken(): Promise<ResponseTypes> {
		try {
			const refreshToken = this.request?.cookie?.jwt;

			// if refresh token is not exists then return status 401
			if (!refreshToken) return SetRequestResponse({ status: 401 });

			// remove the current jwt refresh token cookie
			this.request.removeCookie("jwt", {
				httpOnly: true,
				// sameSite: "None",
				// secure: true
			});

			// get user details from the database by refresh token
			const foundUserWithToken = await this.executeGql<RefreshTokenType | null>(
				"getRefreshToken",
				{
					query: getRefreshTokenQuery,
					variables: { token: refreshToken },
				}
			);

			// If no user was found then the token has be reused
			if (!foundUserWithToken) {

				// veritfy the current jwt refresh token
				const verifyRefreshToken = await this.request.jwtRefreshToken.verify(refreshToken);

				// if refresh token is not vertify then return status 403 forbiden
				if(!verifyRefreshToken) return SetRequestResponse({ status: 403 });

				// delete all the existing refresh token from the database
				const updateRefreshToken = await this.executeGql<RefreshTokenType | null>(
					"updateRefreshToken",
					{
						query: updateRefreshTokenQuery,
						variables: {
							data: { userId: verifyRefreshToken.id },
							isRemoveToken: true,
						},
					}
				);

				return SetRequestResponse({ status: 403 });
			}

			// filter all refresh token that are not equal to the current jwt cookie refresh token
			const newRefreshTokens = foundUserWithToken.token.filter((token) => token !== refreshToken);

			const verifyRefreshToken = await this.request.jwtRefreshToken.verify(refreshToken);

			// if refresh token is not verify or has an error then
			if(!verifyRefreshToken) {
				// get the existed refresh token and exclude the current refresh token then update 
				const updateRefreshToken = await this.executeGql<RefreshTokenType | null>(
					"updateRefreshToken",
					{
						query: updateRefreshTokenQuery,
						variables: {
							findToken: refreshToken,
							data: { token: [...newRefreshTokens] },
							isRemoveToken: true,
						},
					}
				);

				return SetRequestResponse({ status: 403 });
			}

			// if current refresh token is not verify/has error OR user does not match on the current refresh token then return status 403 forbiden
			if (!verifyRefreshToken || foundUserWithToken?.userId !== verifyRefreshToken?.id) return SetRequestResponse({ status: 403 });

			const { exp, ...otherUserDetails } = verifyRefreshToken;

			// set new access token
			const accessToken = await this.request.jwtAccessToken.sign({
				...otherUserDetails,
			});

			// set new refresh token
			const newRefreshToken = await this.request.jwtRefreshToken.sign({
				...otherUserDetails,
			});

			// update the user token with new set of refresh token
			const updateUserNewRefreshToken = await this.executeGql<RefreshTokenType | null>(
				"updateRefreshToken",
				{
					query: updateRefreshTokenQuery,
					variables: {
						data: { userId: foundUserWithToken.userId, token: [...newRefreshTokens, newRefreshToken] },
					},
				}
			);

			// set cookie jwt with new refresh token
			this.request.setCookie("jwt", newRefreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
				// sameSite: "None",
				// secure: true
			})

			console.log("token is refreshed");
			return SetRequestResponse({
				data: { token: accessToken, user: {...otherUserDetails} },
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

export default AuthServices;
