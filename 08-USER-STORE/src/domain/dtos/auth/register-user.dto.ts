import { regExps } from "../../../config";

export class RegisterUserDTO {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
        const { name, email, password } = object;

        if (!name) return ['name is required', undefined];
        if (!email) return ['email is required', undefined];
        if (!password) return ['password is required', undefined];

        if (!regExps.email.test(email)) return ['Invalid email', undefined];
        if (!regExps.password.test(password)) return ['Invalid password', undefined];

        return [undefined, new RegisterUserDTO(name, email, password)];
    }
}