import {
	PrismaClient,
	User as UserType,
	Position as PositionType,
	Department as DepartmentType,
} from "@prisma/client";
import prismaClient from "../../helpers/prismaClient";

export type CreateUserType = {
	employeeNumber: string;
	username: string;
	password: string;
	firstName: string;
	middleName: string;
	lastName: string;
	email: string;
	homeAddress: string;
	gender: string;
	contactNo: string;
	role: string;
	positionId: number;
	departmentId: number;
	status: string;
};

export type CustomUserType = UserType;

export type GetUserByParamsType = {
	id?: number;
	username?: string;
	email?: string;
	employeeNumber?: string;
};

class UserModel {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = prismaClient;
	}

	async createUser(inputs: CreateUserType): Promise<UserType> {
		const user = await this.prisma.user.create({
			data: {
				...inputs,
				RefreshToken: {
					create: [
						{
							token: [],
						},
					],
				},
			},
			include: {
				position: true,
				department: true,
			},
		});

		await this.prisma.$disconnect();

		return user;
	}

	async getUserByParams(params: GetUserByParamsType): Promise<UserType | null> {
		const user = await this.prisma.user.findFirst({
			where: { ...params },
		});

		await this.prisma.$disconnect();

		return user;
	}
}

export default UserModel;
