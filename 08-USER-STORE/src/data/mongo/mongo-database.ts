import mongoose from "mongoose";
import { CategoryModel } from "./models/category.model";
import { ProductModel } from "./models/product.model";
import { UserModel } from "./models/user.model";



interface Options {
    mongoUri: string;
    dbName: string;
}

const random = (x: number) => {
    return Math.floor(Math.random() * x);
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

    static async disconnect() {
        await mongoose.disconnect();
    }

    static async populateFromSeed(seed: any) {
        // Drop DB

        console.clear()
        console.info('Clearing database...')
        await Promise.all([
            ProductModel.deleteMany(),
            CategoryModel.deleteMany(),
            UserModel.deleteMany(),
        ]);

        // Populate DB
        console.info('Creating users...')
        const users = await UserModel.insertMany(seed.users);

        console.info('Creating categories...')
        const categories = await CategoryModel.insertMany(
            seed.categories.map((category: any) => {
                return {
                    ...category,
                    user: users[random(seed.users.length - 1)]._id,
                }
            }));

        console.info('Creating products...')
        const products = await ProductModel.insertMany(
            seed.products.map((product: any) => {
                return {
                    ...product,
                    user: users[random(seed.users.length - 1)]._id,
                    category: categories[random(seed.categories.length - 1)]._id,
                }
            }));


        console.info('Database populated!')

        await setTimeout(() => {
            console.clear()
        }, 2000)



    }

}