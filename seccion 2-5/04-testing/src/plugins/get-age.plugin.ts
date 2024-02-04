// const getAgePlugin = require('get-age');

export const getAge = (birthDate: string) => {
    if (!birthDate) {
        throw new Error('birthDate is required');
    }

    return new Date().getFullYear() - new Date(birthDate).getFullYear();
    // return getAgePlugin(birthDate);
}
