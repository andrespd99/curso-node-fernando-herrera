import { envs } from "../../../config";
import { MongoDatabase } from "../mongo-database";
import { seedData } from "./data";



(async () => {
    MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUri: envs.MONGO_URL,
    });

    await main();

    await MongoDatabase.disconnect();
})();

async function main() {
    await MongoDatabase.populateFromSeed(seedData);
}