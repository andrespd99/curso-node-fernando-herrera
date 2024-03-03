
import { env } from "./config/plugins/env.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
    await main();
})()

async function main() {
    // NOTE: To init Mongo database
    await MongoDatabase.connect({
        mongoUrl: env.MONGO_URL,
        dbName: env.MONGO_DB_NAME,
    });

    Server.start();
}