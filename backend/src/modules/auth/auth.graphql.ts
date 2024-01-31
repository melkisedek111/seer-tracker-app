import { gql } from "@elysiajs/apollo";
import PositionGQL from "../position/position.graphql";
import DepartmentGQL from "../department/department.graphql";
import UserGQL from "../user/user.graphql"

export default gql`
	scalar Date

	${UserGQL}

	type Query {
		getUserAuthSignin(
			username: String
		): User
	}

 
	type UserPositionAndDepartment {
		position (
			name: String
			id: Int
		): Position
		department (
			name: String
			id: Int
			acronym: String
		): Department
	}
`;
