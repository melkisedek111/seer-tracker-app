import { gql } from "@elysiajs/apollo";

export default gql`
	scalar Date

	type Position {
		id: ID!
		name: String!
		createdAt: Date
		updatedAt: Date
	}

	type Query {
		positions: [Position!]!
		getPositions: [Position]!
		getPositionByParams(
			name: String
			id: Int
		): Position
	}

	type Mutation {
		createPosition(name: String!): Position!
	}
`;
