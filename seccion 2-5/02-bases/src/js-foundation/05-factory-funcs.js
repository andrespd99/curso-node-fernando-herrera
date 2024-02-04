const buildMakePerson = ({
    createId,
    getAge
}) => {
    return ({
        name,
        birthDate
    }) => {
        return {
            id: createId(),
            name,
            birthDate,
            age: getAge(birthDate)
        }
    }

}

module.exports = {
    buildMakePerson,
}