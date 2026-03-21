import { Link } from 'react-router-dom';
import { TYPE_COLORS } from './CreatePokemonModal';

const PokemonCard = ({ pokemon, onAdd, onRemove, onDelete, isInTeam, teamFull }) => {
  if (pokemon.custom) {
    const added = isInTeam(pokemon.id);

    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-center relative border-2 border-blue-200">
        <span className="absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
          custom
        </span>

        <button
          onClick={() => onDelete(pokemon.id)}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors text-sm font-bold"
          title="Supprimer ce Pokémon"
        >
          ×
        </button>

        {pokemon.imageUrl
          ? <img src={pokemon.imageUrl} alt={pokemon.name} className="w-24 h-24 mx-auto mb-2 object-contain" />
          : <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center text-4xl">?</div>
        }

        <h3 className="text-lg font-semibold capitalize text-gray-800 mb-1">{pokemon.name}</h3>

        <div className="flex gap-1 justify-center flex-wrap mb-2">
          {pokemon.types.map(t => (
            <span key={t} style={{ background: TYPE_COLORS[t] }}
              className="text-white text-xs font-bold px-2 py-0.5 rounded-full capitalize">
              {t}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
          {[
            { label: 'HP', val: pokemon.stats.hp, color: '#22c55e' },
            { label: 'Atk', val: pokemon.stats.attack, color: '#ef4444' },
            { label: 'Déf', val: pokemon.stats.defense, color: '#3b82f6' },
            { label: 'Vit', val: pokemon.stats.speed, color: '#f59e0b' },
          ].map(({ label, val, color }) => (
            <div key={label} className="flex items-center gap-1">
              <span className="w-6 font-bold" style={{ color }}>{label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(val/255)*100}%`, background: color }} />
              </div>
              <span>{val}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => added ? onRemove(pokemon.id) : onAdd(pokemon)}
          disabled={!added && teamFull}
          className={`w-full py-1.5 px-3 rounded-full text-sm font-semibold transition-all duration-200
            ${added
              ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600'
              : teamFull
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
        >
          {added ? "✓ Dans l'équipe" : teamFull ? 'Équipe complète' : '+ Ajouter'}
        </button>
      </div>
    );
  }

  const id = pokemon.url.split('/').filter(Boolean).at(-1);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const added = isInTeam(id);

  const handleTeamClick = (e) => {
    e.preventDefault();
    if (added) {
      onRemove(id);
    } else {
      onAdd({ id, name: pokemon.name, url: pokemon.url });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-center relative">
      <Link to={`/pokemon/${pokemon.name}`} className="block">
        <img src={imageUrl} alt={pokemon.name} className="w-24 h-24 mx-auto mb-2" />
        <h3 className="text-lg font-semibold capitalize text-gray-800">{pokemon.name}</h3>
        <span className="text-gray-500 text-sm">#{id}</span>
      </Link>

      <button
        onClick={handleTeamClick}
        disabled={!added && teamFull}
        className={`mt-3 w-full py-1.5 px-3 rounded-full text-sm font-semibold transition-all duration-200
          ${added
            ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600'
            : teamFull
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        title={added ? "Retirer de l'équipe" : teamFull ? 'Équipe complète (6/6)' : "Ajouter à l'équipe"}
      >
        {added ? "✓ Dans l'équipe" : teamFull ? 'Équipe complète' : '+ Ajouter'}
      </button>
    </div>
  );
};

export default PokemonCard;
