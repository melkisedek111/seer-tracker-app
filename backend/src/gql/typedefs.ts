import { gql } from "@elysiajs/apollo";

export default gql`
	scalar Date

	type Position {
		id: Int!
		name: String!
		createdAt: Date
		updatedAt: Date
	}

	type Department {
		id: Int!
		name: String!
		acronym: String!
		createdAt: Date
		updatedAt: Date
	}

	type User {
		id: Int!
		employeeNumber: String
		username: String
		password: String
		firstName: String
		middleName: String
		lastName: String
		email: String
		homeAddress: String
		gender: String
		contactNo: String
		role: String
		position: Position
		department: Department
		status: String
		createdAt: Date
		updatedAt: Date
	}

	type UserPositionAndDepartment {
		id: Int!
		employeeNumber: String
		username: String
		password: String
		firstName: String
		lastName: String
		email: String
		role: String
		position(name: String, id: Int): Position
		department(name: String, id: Int, acronym: String): Department
		refreshToken(userId: Int): RefreshToken
	}

	type UserDetailsToRefreshToken {
		id: Int!
		employeeNumber: String
		username: String
		password: String
		firstName: String
		lastName: String
		email: String
		role: String
		position(name: String, id: Int): Position
		department(name: String, id: Int, acronym: String): Department
	}

	type UserWithRefreshToken {
		id: Int!
		userId: Int!
		token: [String]
		user(id: Int): UserDetailsToRefreshToken
	}

    type RefreshToken {
        id: Int!
        userId: Int!
        token: [String]
        createdAt: Date
		updatedAt: Date
    }

	input UpdateRefreshTokenData {
		userId: Int
		token: [String]
	}

	type Query {
		positions: [Position!]!
		getPositions: [Position]!
		getPositionByParams(name: String, id: Int): Position
		getDepartmentByParams($id: Int, name: String, acronym: String): Department

		departments: [Department!]!
		getDepartments: [Department]!

		getUsers: [User]!
		getUserByEmail(email: String!): User
		getUserByUsername(username: String!): User
		getUserByParams(
			username: String
			employeeNumber: String
			email: String
			id: Int
		): User

		getUserAuthSignin(username: String): UserPositionAndDepartment

		getRefreshToken(id: Int userId: Int token: String): UserWithRefreshToken
	}

	type Mutation {
		createPosition(name: String!): Position!

		createDepartment(name: String!, acronym: String!): Department!

		createUser(
			employeeNumber: String
			username: String
			password: String
			firstName: String
			middleName: String
			lastName: String
			email: String
			homeAddress: String
			gender: String
			contactNo: String
			role: String
			positionId: Int
			departmentId: Int
			status: String
		): User!

        saveRefreshToken(userId: Int token: [String]): RefreshToken

		updateRefreshToken(findToken: String data: UpdateRefreshTokenData isRemoveToken: Boolean): UserWithRefreshToken

		updatePosition(id: Int name: String): Position!

		updateDepartment(id: Int! name: String! acronym: String!): Department!
	}
`;
