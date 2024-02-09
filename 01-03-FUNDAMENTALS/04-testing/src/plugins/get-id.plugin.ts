const {
    v4: uuidv4
} = require('uuid');


export const createId = () => {
    return uuidv4();
}
