const axios = require('axios');


const buildHttpClient = (headers) => {
    return {
        get: async (url) => {
            const {
                data,
            } = await axios.get(url, headers);

            return data;
        },
        post: async (url, body) => {},
        put: async (url, body) => {},
        delete: async (url) => {},
    };
};


module.exports = {
    httpClient: buildHttpClient,
}