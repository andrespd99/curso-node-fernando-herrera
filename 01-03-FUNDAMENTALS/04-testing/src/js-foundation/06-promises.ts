const {
    httpClient
} = require('../plugins');

const baseUrl = `https://pokeapi.co/api/v2/pokemon`;

const client = httpClient();

export const getPokemonById = async (id: string | number): Promise<string> => {
    try {
        const url = baseUrl + `/${id}`



        const response = await client.get(url);

        return response.name;
    } catch (error) {
        throw new Error(`Pokemon not found with id ${id}`);
    }

}

