import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Fonction GET pour récupérer 6 Pokémon
export const getPokemons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=6`);
    return response.data.results; // Retourne la liste des 6 premiers Pokémon
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémon:', error);
    throw error;
  }
};

// Fonction POST (Note: PokeAPI est en lecture seule, cette fonction est un exemple/placeholder)
export const addPokemon = async (pokemonData) => {
  try {
    // PokeAPI ne supporte pas les POST, donc cette fonction simulera ou retournera une erreur
    console.warn('PokeAPI est en lecture seule. Impossible d\'ajouter un Pokémon.');
    // Simuler une réponse
    return { message: 'Pokémon ajouté localement (simulation)', data: pokemonData };
  } catch (error) {
    console.error('Erreur lors de l\'ajout du Pokémon:', error);
    throw error;
  }
};
