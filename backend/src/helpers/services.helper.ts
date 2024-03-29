import { ApolloServer } from "@apollo/server";
import { apolloServer } from "..";

class ServiceHelper {
	private apolloServer: ApolloServer;

	constructor() {
		this.apolloServer = apolloServer;
	}

	async executeGql<ResultType>(
		resolverKey: string,
		context: { query: string; variables?: any }
	): Promise<ResultType | undefined> {
		try {
			type ResponseData = {
				[resolverKey: string]: ResultType;
			};
			const result = await this.apolloServer.executeOperation<ResponseData>(context);
			let data: ResultType | undefined = undefined;

			if ("singleResult" in result.body && result.body.singleResult) {
				if (result?.body?.singleResult?.errors !== undefined) {
					console.log(result?.body?.singleResult?.errors)
					data = undefined;
				} else if (result?.body?.singleResult?.data) {
					data = result?.body?.singleResult?.data[resolverKey] || undefined;
				}
			}

			return data;
		} catch (error) {
			console.log(error);
			return undefined;
		}
	}
}

export default ServiceHelper;
