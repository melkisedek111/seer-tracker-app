// Import the PrismaClient class from the @prisma/client module
import { PrismaClient } from "@prisma/client";

// Initialize a new instance of PrismaClient
const prismaClient = new PrismaClient({
  log: ["info"],
});

// Export the prisma object directly
export default prismaClient;

// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
// 	return new PrismaClient();
// };

// declare global {
// 	var prismaClient: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const prismaClient = globalThis.prismaClient ?? prismaClientSingleton();

// export default prismaClient;

// if (process.env.NODE_ENV !== "production") globalThis.prismaClient = prismaClient;
