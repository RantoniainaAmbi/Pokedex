import { useState } from 'react';

const AddPokemonButton = ({ pokemon, onAdd, isAdded }) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (isAdded || animating) return;
    setAnimating(true);
    onAdd(pokemon);
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;700;900&display=swap');

        .add-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          background: linear-gradient(135deg, #FF6B6B, #FF4757);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4), 0 2px 0 #c0392b;
          user-select: none;
        }

        .add-btn:hover:not(.added):not(.animating) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 71, 87, 0.5), 0 3px 0 #c0392b;
        }

        .add-btn:active:not(.added) {
          transform: translateY(1px);
          box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4), 0 1px 0 #c0392b;
        }

        .add-btn.added {
          background: linear-gradient(135deg, #2ed573, #1abc9c);
          box-shadow: 0 4px 15px rgba(46, 213, 115, 0.4), 0 2px 0 #16a085;
          cursor: default;
        }

        .add-btn.animating {
          animation: pokeball-shake 0.4s ease;
        }

        .btn-icon {
          font-size: 16px;
          transition: transform 0.3s ease;
        }

        .add-btn:hover:not(.added) .btn-icon {
          transform: rotate(15deg) scale(1.2);
        }

        .add-btn.added .btn-icon {
          animation: checkmark-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          transform: scale(0);
          animation: ripple-effect 0.5s linear;
          pointer-events: none;
          width: 80px;
          height: 80px;
          top: 50%;
          left: 50%;
          margin-left: -40px;
          margin-top: -40px;
        }

        @keyframes ripple-effect {
          to { transform: scale(3); opacity: 0; }
        }

        @keyframes pokeball-shake {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg) scale(0.95); }
          40% { transform: rotate(8deg) scale(1.05); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(5deg); }
        }

        @keyframes checkmark-pop {
          0% { transform: scale(0) rotate(-180deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>

      <button
        className={`add-btn ${isAdded ? 'added' : ''} ${animating ? 'animating' : ''}`}
        onClick={handleClick}
        title={isAdded ? 'Déjà dans ton équipe !' : `Ajouter ${pokemon?.name} à ton équipe`}
      >
        {animating && <span className="ripple" />}
        <span className="btn-icon">{isAdded ? '✓' : '＋'}</span>
        <span>{isAdded ? 'Dans l\'équipe' : 'Ajouter'}</span>
      </button>
    </>
  );
};

export default AddPokemonButton;
