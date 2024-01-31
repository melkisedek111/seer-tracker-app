import { gql } from "@elysiajs/apollo";
import PositionGQL from "../position/position.graphql";
import DepartmentGQL from "../department/department.graphql";

export default gql`
	scalar Date

	${PositionGQL}
	${DepartmentGQL}

	type User {
		id: ID!
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

	input GetUserByParams {
		id: String
		username: String
		email: String
		employeeNumber: String
	}

	type Query {
		getUsers: [User]!
		getUserByEmail(email: String!): User
		getUserByUsername(username: String!): User
		getUserByParams(
			username: String
			employeeNumber: String
			email: String
			id: Int
		): User
	}

	type Mutation {
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
	}
`;
