const {
    createId
} = require('../plugins/get-id.plugin');
const {
    getAge
} = require('../plugins/get-age.plugin')
const {
    httpClient
} = require('../plugins/http-client.plugin')


module.exports = {
    createId,
    getAge,
    httpClient
};