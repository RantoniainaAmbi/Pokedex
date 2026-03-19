import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  const id = pokemon.url.split('/')[pokemon.url.split('/').length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-center">
        <img src={imageUrl} alt={pokemon.name} className="w-24 h-24 mx-auto mb-2" />
        <h3 className="text-lg font-semibold capitalize text-gray-800">{pokemon.name}</h3>
        <span className="text-gray-500">#{id}</span>
      </div>
    </Link>
  );
};

export default PokemonCard;