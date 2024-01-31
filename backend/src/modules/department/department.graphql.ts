import { gql } from "@elysiajs/apollo";

export default gql`
	scalar Date

	type Department {
		id: ID!
		name: String!
		acronym: String!
		createdAt: Date
		updatedAt: Date
	}

	type Query {
		departments: [Department!]!
		getDepartments: [Department]!
	}

	type Mutation {
		createDepartment(name: String!, acronym: String!): Department!
	}
`;
