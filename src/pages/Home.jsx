import { useState } from 'react';
import usePokemon from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

const Home = () => {
  const { pokemons, loading, error } = usePokemon();
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredPokemons([]);
    } else {
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  };

  const displayPokemons = filteredPokemons.length > 0 ? filteredPokemons : pokemons;

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">Erreur lors du chargement.</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Mon Pokédex</h1>
      <div className="max-w-md mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </main>
  );
};

export default Home;