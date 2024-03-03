
import { PrismaClient } from "@prisma/client";
import { Server } from "./presentation/server";

(async () => {
    await main();
})()

async function main() {
    // NOTE: To init Mongo database
    // await MongoDatabase.connect({
    //     mongoUrl: env.MONGO_URL,
    //     dbName: env.MONGO_DB_NAME,
    // });

    // NOTE: To init Prisma client (for Postgres)
    const prisma = new PrismaClient();

    Server.start();
}