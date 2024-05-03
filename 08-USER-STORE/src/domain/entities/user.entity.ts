import { CustomError } from "../errors/custom.error";



export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public isVerified: boolean,
        public img: string | undefined,
        public role: [string],
    ) { }



    static fromObject(obj: { [key: string]: any }) {
        const { id, _id, name, email, password, isVerified, img, role } = obj;
        if (!_id && !id) {
            throw CustomError.badRequest('Missing `id` parameter');
        }
        if (!name) {
            throw CustomError.badRequest('Missing `name` parameter');
        }
        if (!email) {
            throw CustomError.badRequest('Missing `email` parameter');
        }
        if (!password) {
            throw CustomError.badRequest('Missing `password` parameter');
        }
        if (isVerified === undefined) {
            throw CustomError.badRequest('Missing `isVerified` parameter');
        }
        if (!role) {
            throw CustomError.badRequest('Missing `role` parameter');
        }

        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            isVerified,
            img,
            role,
        );
    }
}