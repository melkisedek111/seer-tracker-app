import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import positionRouter from "./server/routes/position.routes";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typedefs from "./gql/typedefs";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs } from "./modules";
import { PositionResolver } from "./modules/position/position.resolvers";
import userRouter from "./server/routes/user.routes";
import { UserResolver } from "./modules/user/user.resolvers";
import { AuthResolver } from "./modules/auth/auth.resolvers";
import authRouter from "./server/routes/auth.routes";
import { cookie } from "@elysiajs/cookie";
import { handleJWTVerification } from "./server/middleware/verifyJwt";
import { corsOptions } from "./config/corsOptions";
import { allowedOrigins } from "./config/allowedOrigins";
import { credentials } from "./server/middleware/credentials";

export interface CustomRequest extends Request {
	[x: string]: any;
	apolloServer: ApolloServer;
}

const app = new Elysia();
const server = new ApolloServer({
	typeDefs: typedefs,
	resolvers: [PositionResolver, UserResolver, AuthResolver],
});

await startStandaloneServer(server, {
	listen: { port: 4001 },
});

app.use(credentials);
app.use(cors({
	origin: ({ headers }: { headers: Headers}) => {
		const origin = headers.get("origin") || "";
		if(!allowedOrigins.includes(origin)) return false;
		return true;
	},
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}));
app.use(cookie());
app
	.use(
		jwt({
			name: "jwtAccessToken",
			secret: process.env.ACCESS_TOKEN_SECRET || "",
			exp: "1h",
		})
	)
	.use(
		jwt({
			name: "jwtRefreshToken",
			secret: process.env.REFRESH_TOKEN_SECRET || "",
			exp: "1d",
		})
	);

app.on("beforeHandle", (request: any) => {
	request.apolloServer = server;
});


app.use(authRouter);
app.onBeforeHandle(handleJWTVerification)
app.use(userRouter);
app.use(positionRouter);

app.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
