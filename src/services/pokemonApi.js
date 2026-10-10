
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";

// Get the Pokémon list
export async function getPokemonList(limit = 24, offset = 0) {
  const response = await axios.get(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  return response.data.results;
}

// Get details of one Pokémon
export async function getPokemonDetails(nameOrId) {
  const response = await axios.get(
    `${API_URL}/pokemon/${nameOrId}`
  );

  return response.data;
}

// Get list and details together
export async function getPokemonCollection(limit = 24) {
  const list = await getPokemonList(limit);

  return Promise.all(
    list.map((pokemon) => getPokemonDetails(pokemon.name))
  );
}
