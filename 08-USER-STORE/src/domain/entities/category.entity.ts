
import { CustomError } from "../errors/custom.error";



export class CategoryEntity {
    constructor(
        public id: string,
        public name: string,
        public available: boolean,
        public userId: string,
    ) { }



    static fromObject(obj: { [key: string]: any }) {
        const { id, _id, name, available, user: userId } = obj;
        if (!_id && !id) {
            throw CustomError.badRequest('Missing `id` parameter');
        }
        if (!name) {
            throw CustomError.badRequest('Missing `name` parameter');
        }

        if (!userId) {
            throw CustomError.badRequest('Missing `userId` parameter');
        }

        return new CategoryEntity(
            _id || id,
            name,
            available ?? true,
            userId,
        );
    }
}