import { useState } from 'react';

const TYPES = [
  'feu', 'eau', 'plante', 'électrik', 'glace', 'combat', 'poison',
  'sol', 'vol', 'psy', 'insecte', 'roche', 'spectre', 'dragon',
  'acier', 'fée', 'normal', 'ténèbres',
];

const TYPE_COLORS = {
  feu: '#FF6B35', eau: '#4A90D9', plante: '#5DAA3E', électrik: '#F7C948',
  glace: '#74CFC2', combat: '#C03028', poison: '#A040A0', sol: '#E0C068',
  vol: '#7CB8F0', psy: '#F85888', insecte: '#A8B820', roche: '#B8A038',
  spectre: '#705898', dragon: '#7038F8', acier: '#B8B8D0', fée: '#EE99AC',
  normal: '#A8A878', ténèbres: '#705848',
};

const CreatePokemonModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: '',
    imageUrl: '',
    types: [],
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
  });
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const toggleType = (type) => {
    setForm(f => {
      if (f.types.includes(type)) return { ...f, types: f.types.filter(t => t !== type) };
      if (f.types.length >= 2) return f;
      return { ...f, types: [...f.types, type] };
    });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Le nom est requis';
    if (form.types.length === 0) e.types = 'Choisis au moins un type';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const id = `custom-${Date.now()}`;
    onCreate({
      id,
      name: form.name.trim().toLowerCase(),
      imageUrl: form.imageUrl || null,
      types: form.types,
      stats: { hp: form.hp, attack: form.attack, defense: form.defense, speed: form.speed },
      custom: true,
    });
    onClose();
  };

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: fadeIn .15s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

        .modal-box {
          background: #fff;
          border-radius: 20px;
          width: 100%; max-width: 480px;
          max-height: 90vh; overflow-y: auto;
          animation: slideUp .2s ease;
          box-shadow: 0 24px 60px rgba(0,0,0,0.2);
        }

        .modal-header {
          padding: 24px 24px 0;
          display: flex; align-items: center; justify-content: space-between;
        }

        .modal-title {
          font-size: 20px; font-weight: 800;
          color: #1e293b;
          display: flex; align-items: center; gap: 8px;
        }

        .modal-close {
          width: 32px; height: 32px; border-radius: 50%;
          border: none; background: #f1f5f9; cursor: pointer;
          font-size: 18px; display: flex; align-items: center; justify-content: center;
          transition: background .15s;
        }
        .modal-close:hover { background: #e2e8f0; }

        .modal-body { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 16px; }

        .field label {
          display: block; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .06em;
          color: #64748b; margin-bottom: 6px;
        }

        .field input[type="text"], .field input[type="url"] {
          width: 100%; padding: 10px 14px;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-size: 14px; color: #1e293b;
          outline: none; transition: border-color .15s;
          box-sizing: border-box;
        }
        .field input:focus { border-color: #3b82f6; }
        .field .err { color: #ef4444; font-size: 12px; margin-top: 4px; }

        .type-grid {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .type-chip {
          padding: 4px 12px; border-radius: 20px;
          font-size: 12px; font-weight: 600;
          border: 2px solid transparent;
          cursor: pointer; transition: all .15s;
          color: #fff; opacity: .55;
        }
        .type-chip.selected { opacity: 1; transform: scale(1.08); }
        .type-chip:hover { opacity: .85; }

        .stat-row {
          display: flex; align-items: center; gap: 10px;
        }
        .stat-label {
          width: 68px; font-size: 12px; font-weight: 700;
          text-transform: uppercase; color: #64748b;
        }
        .stat-bar-bg {
          flex: 1; height: 6px; background: #f1f5f9;
          border-radius: 3px; overflow: hidden;
        }
        .stat-bar-fill { height: 100%; border-radius: 3px; transition: width .2s; }
        .stat-val { width: 30px; text-align: right; font-size: 13px; font-weight: 700; color: #1e293b; }

        .stat-row input[type="range"] {
          flex: 1; accent-color: #3b82f6; cursor: pointer;
        }

        .preview-card {
          border: 2px dashed #e2e8f0; border-radius: 14px;
          padding: 16px; text-align: center;
          background: #f8fafc;
        }
        .preview-img {
          width: 80px; height: 80px; object-fit: contain;
          margin: 0 auto 8px;
        }
        .preview-placeholder {
          width: 80px; height: 80px; border-radius: 50%;
          background: #e2e8f0; margin: 0 auto 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
        }

        .modal-footer {
          display: flex; gap: 10px; padding-top: 4px;
        }
        .btn-cancel {
          flex: 1; padding: 11px; border-radius: 12px;
          border: 1.5px solid #e2e8f0; background: #fff;
          font-size: 14px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: background .15s;
        }
        .btn-cancel:hover { background: #f8fafc; }
        .btn-create {
          flex: 2; padding: 11px; border-radius: 12px;
          border: none; background: #3b82f6; color: #fff;
          font-size: 14px; font-weight: 700;
          cursor: pointer; transition: background .15s;
        }
        .btn-create:hover { background: #2563eb; }
      `}</style>

      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-box">
          <div className="modal-header">
            <span className="modal-title">✨ Nouveau Pokémon</span>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">
            <div className="field">
              <label>Nom *</label>
              <input
                type="text"
                placeholder="ex: Flamosaure"
                value={form.name}
                onChange={e => { set('name', e.target.value); setErrors(er => ({ ...er, name: '' })); }}
              />
              {errors.name && <p className="err">{errors.name}</p>}
            </div>

            <div className="field">
              <label>Image (URL)</label>
              <input
                type="url"
                placeholder="https://..."
                value={form.imageUrl}
                onChange={e => set('imageUrl', e.target.value)}
              />
            </div>

            <div className="field">
              <label>Type(s) * <span style={{ fontWeight: 400, textTransform: 'none' }}>(max 2)</span></label>
              <div className="type-grid">
                {TYPES.map(type => (
                  <button
                    key={type}
                    className={`type-chip ${form.types.includes(type) ? 'selected' : ''}`}
                    style={{ backgroundColor: TYPE_COLORS[type] }}
                    onClick={() => { toggleType(type); setErrors(er => ({ ...er, types: '' })); }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.types && <p className="err">{errors.types}</p>}
            </div>

            <div className="field">
              <label>Stats</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { key: 'hp', label: 'HP', color: '#22c55e' },
                  { key: 'attack', label: 'Atk', color: '#ef4444' },
                  { key: 'defense', label: 'Déf', color: '#3b82f6' },
                  { key: 'speed', label: 'Vit', color: '#f59e0b' },
                ].map(({ key, label, color }) => (
                  <div key={key} className="stat-row">
                    <span className="stat-label">{label}</span>
                    <input
                      type="range" min="1" max="255" value={form[key]}
                      onChange={e => set(key, Number(e.target.value))}
                    />
                    <span className="stat-val">{form[key]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Aperçu</label>
              <div className="preview-card">
                {form.imageUrl
                  ? <img className="preview-img" src={form.imageUrl} alt="preview" onError={e => e.target.style.display='none'} />
                  : <div className="preview-placeholder">?</div>
                }
                <p style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', textTransform: 'capitalize', margin: '0 0 6px' }}>
                  {form.name || 'Nom du Pokémon'}
                </p>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {form.types.map(t => (
                    <span key={t} style={{
                      background: TYPE_COLORS[t], color: '#fff',
                      padding: '2px 10px', borderRadius: 20,
                      fontSize: 11, fontWeight: 700,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={onClose}>Annuler</button>
              <button className="btn-create" onClick={handleSubmit}>Créer le Pokémon</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { TYPE_COLORS };
export default CreatePokemonModal;
