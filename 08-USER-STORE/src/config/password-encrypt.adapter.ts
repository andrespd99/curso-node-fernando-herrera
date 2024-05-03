import { compare, genSalt, hashSync, } from 'bcryptjs';

export const passwordEncryptAdapter = {
    encrypt: async (password: string) => {
        const salt = await genSalt();
        return hashSync(password, salt);
    },
    compare: async (password: string, hash: string) => {
        return await compare(password, hash);
    }
}