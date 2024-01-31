import { ApolloServer } from "@apollo/server";

export const customExecuteOperation = async <ResultType>(
	server: ApolloServer,
	resolverKey: string,
	context: { query: string; variables?: any }
): Promise<ResultType | undefined> => {
	try {
		type ResponseData = {
			[resolverKey: string]: ResultType;
		};
		const result = await server.executeOperation<ResponseData>(context);
		let data: ResultType | undefined = undefined;
		
		if ("singleResult" in result.body && result.body.singleResult) {

			if (result?.body?.singleResult?.errors !== undefined) {
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
};
