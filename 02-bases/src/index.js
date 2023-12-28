const getPokemonById = require('./js-foundation/06-promises.js')

getPokemonById(1).then((pokemon) => {
    console.log(pokemon.name)
}).catch((error) => {
    console.log(error)
});