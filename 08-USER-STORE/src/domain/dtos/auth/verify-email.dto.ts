
export class VerifyEmailDTO {
    private constructor(
        public readonly token: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, VerifyEmailDTO?] {
        const { token } = object;

        if (!token) return ['token parameter missing', undefined];

        return [undefined, new VerifyEmailDTO(token)];
    }
}