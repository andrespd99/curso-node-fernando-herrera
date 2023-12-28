const {
    emailTemplate
} = require('./js-foundation/01-template');

require('./js-foundation/02-destructuring');

const {
    getUserById
} = require('./js-foundation/03-callbacks');


const id = 1;

getUserById(id, (err, user) => {
    if (err) {
        throw new Error(err);
    }

    console.log(user);
});