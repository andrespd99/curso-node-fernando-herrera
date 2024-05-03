
import { sign, verify, } from 'jsonwebtoken';
import { envs } from './envs';


const SECRET_KEY = envs.SECRET_KEY;

interface JwtSignOptions {
    /** Expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    duration?: string | number | undefined,
}

export const jwt = {
    sign: (payload: any, secret: string, options?: JwtSignOptions) => {
        return sign(payload, SECRET_KEY, {
            ...(options?.duration !== undefined ? { expiresIn: options.duration } : {})
        });
    },
    verify: (token: string, secret: string) => {
        return verify(token, secret);
    }

}