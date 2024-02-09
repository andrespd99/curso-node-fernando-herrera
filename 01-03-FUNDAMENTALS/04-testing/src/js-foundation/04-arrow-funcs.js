const users = [{
        id: 1,
        name: 'John',
    },
    {
        id: 2,
        name: 'Jane',
    }
];

const getUserById = (id, callback) => {
    const user = users.find((user) => user.id === id);

    if (!user) {
        return callback(`User not found with id ${id}`);
    }

    return callback(null, user);
}

module.exports = {
    getUserById
}