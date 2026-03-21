import { useState } from 'react';
import usePokemon from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import CreatePokemonModal from '../components/CreatePokemonModal';

const Home = () => {
  const { pokemons, loading, error, team, addToTeam, removeFromTeam, isInTeam } = usePokemon();
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [customPokemons, setCustomPokemons] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredPokemons([]);
    } else {
      const allPokemons = [...customPokemons, ...pokemons];
      const filtered = allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  };

  const handleCreate = (newPokemon) => {
    setCustomPokemons(prev => [newPokemon, ...prev]);
  };

  const handleDelete = (id) => {
    setCustomPokemons(prev => prev.filter(p => p.id !== id));
    if (isInTeam(id)) removeFromTeam(id);
  };

  const displayPokemons = filteredPokemons.length > 0
    ? filteredPokemons
    : [...customPokemons, ...pokemons];

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">Erreur lors du chargement.</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-2 text-blue-600">Mon Pokédex</h1>

      <p className="text-center text-gray-500 mb-6 text-sm">
        Équipe : {team.length} / 6
      </p>

      <div className="max-w-md mx-auto mb-6 flex gap-3">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition-colors duration-200 whitespace-nowrap shadow-sm"
        >
          <span className="text-lg">+</span> Nouveau
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id || pokemon.name}
            pokemon={pokemon}
            onAdd={addToTeam}
            onRemove={removeFromTeam}
            onDelete={handleDelete}
            isInTeam={isInTeam}
            teamFull={team.length >= 6}
          />
        ))}
      </div>

      {showModal && (
        <CreatePokemonModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </main>
  );
};

export default Home;
