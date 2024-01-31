import { Prisma } from "@prisma/client";

export const prismaQueryHandler = async <T>(callback: () => Promise<T>, keyword?: string): Promise<T | null> => {
    try {
        return await callback();
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("--------------------------------")
            console.log(keyword || "SOME FUNCTION", error.message)
            console.log("--------------------------------")
        }
    }

    return null; 
}