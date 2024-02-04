import axios from 'axios';


export const httpClientPlugin = (headers: any) => {
    return {
        get: async (url: string) => {
            const {
                data,
            } = await axios.get(url, headers);

            return data;
        },
        post: async (url: string, body: any) => {
            throw new Error("Method not implemented")
        },
        put: async (url: string, body: any) => {
            throw new Error("Method not implemented")
        },
        delete: async (url: string) => {
            throw new Error("Method not implemented")
        },
    };
};

