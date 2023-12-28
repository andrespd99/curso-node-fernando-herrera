const {
    httpClient
} = require('../plugins');

const baseUrl = `https://pokeapi.co/api/v2/pokemon`;
const client = httpClient();

const getPokemonById = async (id) => {
    const url = baseUrl + `/${id}`

    return await client.get(url);

}

module.exports = getPokemonById