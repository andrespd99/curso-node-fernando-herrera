const {
    createId
} = require('../plugins/get-id.plugin');
const {
    getAge
} = require('../plugins/get-age.plugin')
const {
    httpClient
} = require('../plugins/http-client.plugin')
const
    buildLogger = require('../plugins/logger.plugin')

module.exports = {
    createId,
    getAge,
    httpClient,
    buildLogger,
};