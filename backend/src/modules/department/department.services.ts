import { ApolloServer } from "@apollo/server";
import { ResponseTypes, SetRequestResponse } from "../../helpers/error.helper";
import { customExecuteOperation } from "../../helpers/response.helper";

export type CreatePositionType = {
	name: string;
};

class DepartmentServices {
	private apolloServer: ApolloServer;

	constructor(apolloServer: ApolloServer) {
		this.apolloServer = apolloServer;
	}

	async createPosition({ name }: CreatePositionType): Promise<ResponseTypes> {
		try {
			type PositionResultType = {
                id: number | string;
				name: string;
			};
			const result = await customExecuteOperation<PositionResultType>(
				this.apolloServer,
				"createPosition",
				{
					query: `
                    mutation createPosition ($name: String!) {
                        createPosition(name: $name){
                          id
                          name
                        }
                      }
                `,
					variables: { name },
				}
			);

			let data: PositionResultType | undefined = undefined;
            
            if (result) {
                data = result;
            }

            return SetRequestResponse({ data });
		} catch (error) {
			console.log(error);
			return SetRequestResponse({
				error: true,
				message: "Server error!",
				status: 500,
			});
		}
	}

	async getPositions(): Promise<ResponseTypes> {
		try {
			type Position = {
				id: number;
				name: string;
			};

			const result = await customExecuteOperation<Position[]>(
				this.apolloServer,
				"getPositions",
				{
					query: `
                query getPosition {
                    getPositions {
                      id
                      name
                      createdAt
                      updatedAt
                    }
                  }
                `,
				}
			);
			let data: Position[] = [];

			if (result) {
				data = result;
			}

			return SetRequestResponse({ data });
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

export default DepartmentServices;
