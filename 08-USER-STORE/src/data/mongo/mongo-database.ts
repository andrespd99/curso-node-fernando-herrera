import mongoose from "mongoose";



interface Options {
    mongoUri: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: Options) {
        const { mongoUri, dbName } = options;

        try {
            await mongoose.connect(mongoUri, { dbName });
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }

}