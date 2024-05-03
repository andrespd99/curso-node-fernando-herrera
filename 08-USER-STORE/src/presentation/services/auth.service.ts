import { jwt, passwordEncryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDTO } from "../../domain";
import { LoginDTO } from "../../domain/dtos/auth/login.dto";
import { UserEntity } from "../../domain/entities/user.entity";



export class AuthService {
    constructor() { }

    // Normalize execution time to 150 ms to avoid timing attacks...
    private static _execTime = 200;

    async login(dto: LoginDTO) {
        const _start = new Date().getTime();

        try {

            const user = await UserModel.findOne({ email: dto.email });

            if (!user) throw CustomError.badRequest('Wrong email or password');
            // Encrypt password
            const passwordIsValid = await passwordEncryptAdapter.compare(dto.password, user.password);

            if (!passwordIsValid) throw CustomError.badRequest('Wrong email or password');

            // Generate JWT
            const userEntity = UserEntity.fromObject(user);

            const { id, email, role, } = userEntity;

            const token = jwt.sign({ id, email, role }, 'Shhhhh!', { duration: '2h' })

            return { user: userEntity, token: token, };
        } catch (error) {
            throw CustomError.internal(`${error}`);
        } finally {
            if (new Date().getTime() - _start < AuthService._execTime) {
                await new Promise((resolve) => setTimeout(resolve, AuthService._execTime - (new Date().getTime() - _start)));
            }
        }

    }

    async registerUser(dto: RegisterUserDTO) {
        const _start = new Date().getTime();
        try {
            const emailExists = await UserModel.findOne({ email: dto.email });

            if (emailExists) throw CustomError.badRequest('Email already exists');
            const user = new UserModel(dto);
            // Encrypt password
            user.password = await passwordEncryptAdapter.encrypt(user.password);

            await user.save();



            // Generate JWT

            // Send verification email

            const userEntity = UserEntity.fromObject(user);

            return { user: userEntity, token: 'token_test' };
        } catch (error) {
            throw CustomError.internal(`${error}`);
        } finally {
            if (new Date().getTime() - _start < AuthService._execTime) {
                await new Promise((resolve) => setTimeout(resolve, AuthService._execTime - (new Date().getTime() - _start)));
            }
        }

    }
}