import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../services/pokeAPI';
import Loader from '../components/Loader';

const PokemonDetail = () => {
  const { name } = useParams(); 
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPokemonDetails(name);
        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [name]);

  if (loading) return <Loader />;
  if (!pokemon) return <p className="text-center text-red-500">Pokémon introuvable.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        Retour
      </button>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4 uppercase">{pokemon.name}</h1>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className="w-48 h-48 mx-auto mb-4"
        />
        
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map(t => (
            <span key={t.type.name} className={`px-3 py-1 rounded-full text-white text-sm font-semibold capitalize ${getTypeColor(t.type.name)}`}>
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Statistiques</h3>
          {pokemon.stats.map(s => (
            <div key={s.stat.name} className="flex justify-between mb-1">
              <span className="capitalize">{s.stat.name}:</span>
              <span className="font-bold">{s.base_stat}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600">
          Poids: {pokemon.weight / 10} kg | Taille: {pokemon.height / 10} m
        </p>
      </div>
    </div>
  );
};

const getTypeColor = (type) => {
  const colors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  return colors[type] || 'bg-gray-400';
};

export default PokemonDetail;