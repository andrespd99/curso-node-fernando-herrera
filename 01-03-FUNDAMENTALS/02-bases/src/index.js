const {
    buildLogger
} = require('./plugins');


const logger = buildLogger('index.js');

logger.log('Hello, world!');