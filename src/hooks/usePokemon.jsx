import { useState, useEffect } from 'react';
import { getPokemons } from '../services/pokeAPI';

const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [team, setTeam] = useState([]);          // 🆕

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemons();
        setPokemons(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const addToTeam = (pokemon) => {
    setTeam((prev) => {
      if (prev.find((p) => p.id === pokemon.id)) return prev;
      if (prev.length >= 6) return prev;
      return [...prev, pokemon];
    });
  };

  const removeFromTeam = (pokemonId) => {
    setTeam((prev) => prev.filter((p) => p.id !== pokemonId));
  };

  const isInTeam = (pokemonId) => team.some((p) => p.id === pokemonId);

  return { pokemons, loading, error, team, addToTeam, removeFromTeam, isInTeam };
};

export default usePokemon;