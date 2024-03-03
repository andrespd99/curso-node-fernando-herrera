import mongoose from "mongoose";

interface MongoConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: MongoConnectionOptions) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, { dbName });

            console.log('Mongo DB connected');
        } catch (error) {
            console.error('Mongo connection error');
            throw error;
        }
    }
}