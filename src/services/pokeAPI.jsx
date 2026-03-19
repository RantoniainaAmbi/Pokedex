import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=100`);
    return response.data.results;
  }
   catch (error) {
    console.error('Erreur lors de la récupération des Pokémon:', error);
    throw error;
  }
};

export const getPokemonDetails = async (nameOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur sur le Pokémon ${nameOrId}:`, error);
    throw error;
  }
};

export const addPokemon = async (pokemonData) => {
  console.warn('PokeAPI est en lecture seule. Impossible d\'ajouter un Pokémon.');
  return { message: 'Pokémon ajouté localement (simulation)', data: pokemonData };
};