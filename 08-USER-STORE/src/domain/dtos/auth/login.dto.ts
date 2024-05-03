
export class LoginDTO {
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginDTO?] {
        const { email, password } = object;

        if (!email || !password) return ['email and password are required', undefined];

        return [undefined, new LoginDTO(email, password)];
    }
}