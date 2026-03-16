import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MODE_LABELS = { emporter: '🛍️ À emporter', table: '🍽️ Sur table', livraison: '🛵 Livraison' }
const STATUS_COLOR = { 'En cours': '#f5a623', 'Livré': '#2d7a40', 'Annulé': '#aaa' }

// Retourne { minutes, canCancel } depuis la création d'une commande
function useOrderTimer(createdAt) {
  const [elapsed, setElapsed] = useState(() => (Date.now() - new Date(createdAt).getTime()) / 60000)
  useEffect(() => {
    if (elapsed >= 20) return
    const id = setInterval(() => {
      setElapsed((Date.now() - new Date(createdAt).getTime()) / 60000)
    }, 10000)
    return () => clearInterval(id)
  }, [createdAt, elapsed])
  return { minutes: Math.floor(elapsed), canCancel: elapsed < 20 }
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  .compte-page { min-height: 100vh; background: #fdfaf5; }

  .compte-hero { text-align: center; background: var(--brand-red); padding: 110px 5% 3rem; color: #fff; }
  .compte-hero h1 { font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; }
  .compte-hero p { font-family: var(--font-heading); opacity: 0.8; letter-spacing: 2px; margin-top: 0.4rem; font-size: 0.95rem; }

  /* Auth */
  .auth-container { max-width: 480px; margin: 4rem auto; padding: 0 5%; }
  .auth-tabs { display: flex; border-bottom: 2px solid #f0e0d0; margin-bottom: 2.5rem; }
  .auth-tab { flex: 1; padding: 0.9rem; font-family: var(--font-heading); font-size: 1rem; color: #aaa; background: none; border: none; border-bottom: 3px solid transparent; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
  .auth-tab.active { color: var(--brand-red); border-bottom-color: var(--brand-red); }
  .auth-form { display: flex; flex-direction: column; gap: 1.2rem; }
  .auth-form label { font-family: var(--font-heading); font-size: 0.82rem; color: var(--brand-red); letter-spacing: 0.5px; display: block; margin-bottom: 0.4rem; }
  .auth-form input { width: 100%; padding: 0.85rem 1.1rem; border: 2px solid #e8d8c8; border-radius: 12px; font-family: var(--font-body); font-size: 0.95rem; background: #fff; transition: border-color 0.2s; outline: none; }
  .auth-form input:focus { border-color: var(--brand-red); }
  .auth-error { background: #fff0f0; border-left: 4px solid var(--brand-red); padding: 0.8rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.88rem; color: var(--brand-red); }
  .btn-auth { width: 100%; background: var(--brand-red); color: #fff; border: none; border-radius: 50px; padding: 0.9rem; font-family: var(--font-heading); font-size: 1rem; letter-spacing: 0.5px; cursor: pointer; transition: background 0.2s, transform 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
  .btn-auth:hover { background: #c01010; transform: translateY(-2px); }
  .btn-auth:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* Dashboard layout */
  .compte-body { display: grid; grid-template-columns: 260px 1fr; gap: 2.5rem; max-width: 1100px; margin: 3rem auto; padding: 0 5% 6rem; align-items: start; }
  @media (max-width: 760px) { .compte-body { grid-template-columns: 1fr; } }

  /* Sidebar */
  .compte-sidebar { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); position: sticky; top: 100px; }
  .compte-avatar-block { background: var(--brand-red); padding: 2rem 1.5rem; text-align: center; color: #fff; }
  .compte-avatar { width: 72px; height: 72px; border-radius: 50%; background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-family: var(--font-heading); font-size: 1.8rem; color: #fff; border: 3px solid rgba(255,255,255,0.5); }
  .compte-avatar-name { font-family: var(--font-heading); font-size: 1.1rem; line-height: 1.2; }
  .compte-avatar-email { font-size: 0.78rem; opacity: 0.75; margin-top: 0.3rem; }
  .compte-badge { display: inline-flex; align-items: center; gap: 0.4rem; background: var(--brand-yellow); color: var(--brand-red); font-family: var(--font-heading); font-size: 0.75rem; padding: 3px 12px; border-radius: 20px; margin-top: 0.8rem; }
  .compte-nav { padding: 0.6rem 0; }
  .compte-nav-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.85rem 1.5rem; font-family: var(--font-heading); font-size: 0.88rem; color: #777; cursor: pointer; background: none; border: none; width: 100%; text-align: left; transition: background 0.2s, color 0.2s; letter-spacing: 0.3px; }
  .compte-nav-item:hover { background: #fdf6ee; color: var(--brand-red); }
  .compte-nav-item.active { background: #fff5f5; color: var(--brand-red); font-weight: 600; }
  .compte-nav-item svg { flex-shrink: 0; }
  .nav-badge { margin-left: auto; background: #f0e0d0; color: var(--brand-red); border-radius: 10px; padding: 1px 8px; font-size: 0.72rem; font-family: var(--font-heading); }
  .btn-logout { width: 100%; padding: 0.85rem 1.5rem; font-family: var(--font-heading); font-size: 0.88rem; color: #aaa; background: none; border: none; border-top: 1px solid #f0e0d0; cursor: pointer; display: flex; align-items: center; gap: 0.8rem; transition: color 0.2s; }
  .btn-logout:hover { color: var(--brand-red); }

  /* Panel */
  .compte-panel { background: #fff; border-radius: 20px; padding: 2.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
  .compte-panel h2 { font-family: var(--font-heading); font-size: 1.6rem; color: var(--brand-red); margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #f0e0d0; }

  /* Profil */
  .profil-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  @media (max-width: 520px) { .profil-grid { grid-template-columns: 1fr; } }
  .profil-field label { display: block; font-family: var(--font-heading); font-size: 0.8rem; color: var(--brand-red); letter-spacing: 0.5px; margin-bottom: 0.4rem; }
  .profil-field input { width: 100%; padding: 0.75rem 1rem; border: 2px solid #e8d8c8; border-radius: 10px; font-size: 0.9rem; font-family: var(--font-body); outline: none; transition: border-color 0.2s; background: #fdfaf5; }
  .profil-field input:focus { border-color: var(--brand-red); background: #fff; }

  /* Commandes */
  .order-card { border: 1px solid #f0e0d0; border-radius: 16px; overflow: hidden; margin-bottom: 1.2rem; transition: box-shadow 0.2s; }
  .order-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.07); }
  .order-head { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.4rem; background: #fdfaf5; border-bottom: 1px solid #f0e0d0; flex-wrap: wrap; gap: 0.5rem; }
  .order-id { font-family: var(--font-heading); font-size: 1rem; color: var(--text-dark); }
  .order-status-badge { font-family: var(--font-heading); font-size: 0.75rem; padding: 3px 12px; border-radius: 20px; color: #fff; }
  .order-body { padding: 1rem 1.4rem; }
  .order-meta-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 0.8rem; font-size: 0.82rem; color: #888; }
  .order-items-list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.8rem; }
  .order-item-row { display: flex; align-items: center; gap: 0.8rem; font-size: 0.85rem; }
  .order-item-img { width: 36px; height: 36px; border-radius: 8px; background: #f5f0e8; overflow: hidden; flex-shrink: 0; }
  .order-item-img img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
  .order-item-name { flex: 1; color: #555; }
  .order-item-price { font-family: var(--font-heading); font-size: 0.82rem; color: var(--brand-red); white-space: nowrap; }
  .order-foot { display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1.4rem; border-top: 1px solid #f0e0d0; background: #fdfaf5; flex-wrap: wrap; gap: 0.8rem; }
  .order-total-label { font-family: var(--font-heading); font-size: 1rem; color: var(--text-dark); }
  .order-total-label span { color: var(--brand-red); }

  /* Timer d'annulation */
  .cancel-timer { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: #f5a623; font-family: var(--font-heading); letter-spacing: 0.3px; }
  .btn-cancel { background: none; border: 1.5px solid #f0e0d0; border-radius: 8px; padding: 0.4rem 0.9rem; font-family: var(--font-heading); font-size: 0.78rem; color: #aaa; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
  .btn-cancel:hover { border-color: var(--brand-red); color: var(--brand-red); }
  .btn-cancel-expired { font-size: 0.75rem; color: #ccc; font-family: var(--font-heading); }

  /* Favoris */
  .fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; }
  .fav-card { background: #fdfaf5; border-radius: 16px; padding: 1rem; text-align: center; border: 1px solid #f0e0d0; transition: box-shadow 0.2s, transform 0.2s; position: relative; }
  .fav-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-3px); }
  .fav-img { width: 100%; aspect-ratio: 1; object-fit: contain; padding: 0.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1)); }
  .fav-name { font-family: var(--font-heading); font-size: 0.82rem; color: var(--text-dark); margin: 0.5rem 0 0.3rem; line-height: 1.3; }
  .fav-price { font-family: var(--font-heading); font-size: 0.85rem; color: var(--brand-red); }
  .fav-remove { position: absolute; top: 8px; right: 8px; background: #fff; border: 1.5px solid #f0e0d0; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #ccc; transition: color 0.2s, border-color 0.2s; padding: 0; }
  .fav-remove:hover { color: var(--brand-red); border-color: var(--brand-red); }

  /* Fidélité */
  .fid-progress-bar { height: 10px; border-radius: 10px; background: #f0e0d0; overflow: hidden; margin: 0.8rem 0; }
  .fid-progress-fill { height: 100%; border-radius: 10px; background: linear-gradient(to right, var(--brand-red), var(--brand-yellow)); transition: width 0.6s ease; }
  .fid-levels-mini { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; margin-top: 1.5rem; }
  @media (max-width: 760px) { .compte-body { padding: 2rem 5% 4rem; } .compte-sidebar { position: static; } }
  @media (max-width: 520px) { .fid-levels-mini { grid-template-columns: repeat(2, 1fr); } .profil-grid { grid-template-columns: 1fr !important; } }
  .fid-level-card { border-radius: 14px; padding: 1rem; text-align: center; border: 2px solid #f0e0d0; transition: border-color 0.2s; }
  .fid-level-card.current { border-color: var(--brand-yellow); background: #fffbef; }
  .fid-level-card .badge { font-size: 1.8rem; }
  .fid-level-card h4 { font-family: var(--font-heading); font-size: 0.85rem; margin: 0.4rem 0 0.2rem; }
  .fid-level-card p { font-size: 0.72rem; color: #999; }

  /* Adresses */
  .address-card { border: 1px solid #f0e0d0; border-radius: 14px; padding: 1.2rem 1.4rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
  .address-label { font-family: var(--font-heading); font-size: 0.9rem; color: var(--brand-red); margin-bottom: 0.3rem; }
  .address-text { font-size: 0.88rem; color: #555; }
  .btn-small-red { background: none; border: 2px solid #f0e0d0; border-radius: 8px; padding: 0.4rem 0.9rem; font-family: var(--font-heading); font-size: 0.78rem; color: #aaa; cursor: pointer; transition: border-color 0.2s, color 0.2s; white-space: nowrap; }
  .btn-small-red:hover { border-color: var(--brand-red); color: var(--brand-red); }

  /* Moyens de paiement */
  .payment-card {
    border: 1px solid #f0e0d0; border-radius: 14px;
    padding: 1.1rem 1.4rem; margin-bottom: 0.8rem;
    display: flex; align-items: center; gap: 1rem;
    transition: box-shadow 0.2s;
  }
  .payment-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.07); }
  .payment-icon {
    width: 44px; height: 44px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 1.3rem;
  }
  .payment-info { flex: 1; }
  .payment-label { font-family: var(--font-heading); font-size: 0.92rem; color: var(--text-dark); }
  .payment-sub { font-size: 0.78rem; color: #aaa; margin-top: 0.15rem; }
  .payment-default-badge {
    font-family: var(--font-heading); font-size: 0.68rem;
    background: #f0fdf4; color: #2d7a40;
    border: 1px solid #bbf7d0; border-radius: 20px;
    padding: 2px 10px; white-space: nowrap;
  }

  /* Formulaire d'ajout inline */
  .add-form {
    background: #fdfaf5; border-radius: 16px;
    border: 2px dashed #f0e0d0; padding: 1.5rem;
    margin-top: 1rem;
  }
  .add-form-title {
    font-family: var(--font-heading); font-size: 1rem;
    color: var(--brand-red); margin-bottom: 1.2rem;
  }
  .add-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
  @media (max-width: 520px) { .add-form-grid { grid-template-columns: 1fr; } }
  .add-form-field label {
    display: block; font-family: var(--font-heading);
    font-size: 0.75rem; color: var(--brand-red);
    letter-spacing: 0.5px; margin-bottom: 0.35rem;
  }
  .add-form-field input, .add-form-field select {
    width: 100%; padding: 0.65rem 0.9rem;
    border: 2px solid #e8d8c8; border-radius: 10px;
    font-size: 0.88rem; font-family: var(--font-body);
    background: #fff; outline: none;
    transition: border-color 0.2s;
  }
  .add-form-field input:focus, .add-form-field select:focus { border-color: var(--brand-red); }
  .add-form-actions { display: flex; gap: 0.8rem; margin-top: 1.2rem; flex-wrap: wrap; }
  .btn-save { background: var(--brand-red); color: #fff; border: none; border-radius: 50px; padding: 0.65rem 1.4rem; font-family: var(--font-heading); font-size: 0.88rem; cursor: pointer; transition: background 0.2s; }
  .btn-save:hover { background: #c01010; }
  .btn-cancel-form { background: none; border: 2px solid #e8d8c8; border-radius: 50px; padding: 0.65rem 1.2rem; font-family: var(--font-heading); font-size: 0.88rem; color: #aaa; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
  .btn-cancel-form:hover { border-color: var(--brand-red); color: var(--brand-red); }

  /* Sécurité & Confidentialité */
  .sec-section { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #f0e0d0; }
  .sec-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .sec-section-title { font-family: var(--font-heading); font-size: 1rem; color: var(--text-dark); margin-bottom: 0.3rem; letter-spacing: 0.3px; }
  .sec-section-desc { font-size: 0.82rem; color: #aaa; line-height: 1.5; margin-bottom: 1.2rem; }
  .sec-field { margin-bottom: 0.9rem; }
  .sec-field label { display: block; font-family: var(--font-heading); font-size: 0.75rem; color: var(--brand-red); letter-spacing: 0.5px; margin-bottom: 0.35rem; }
  .sec-field input { width: 100%; padding: 0.7rem 1rem; border: 2px solid #e8d8c8; border-radius: 10px; font-size: 0.9rem; font-family: var(--font-body); background: #fdfaf5; outline: none; transition: border-color 0.2s; }
  .sec-field input:focus { border-color: var(--brand-red); background: #fff; }
  .sec-inline { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
  .sec-inline-info { flex: 1; }
  .sec-inline-info strong { display: block; font-family: var(--font-heading); font-size: 0.9rem; color: var(--text-dark); margin-bottom: 0.2rem; }
  .sec-inline-info span { font-size: 0.8rem; color: #aaa; line-height: 1.5; }
  .toggle-switch { position: relative; width: 44px; height: 24px; flex-shrink: 0; }
  .toggle-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track { position: absolute; inset: 0; background: #e0d0c0; border-radius: 24px; cursor: pointer; transition: background 0.25s; }
  .toggle-track::after { content: ''; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: transform 0.25s; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
  .toggle-switch input:checked + .toggle-track { background: var(--brand-red); }
  .toggle-switch input:checked + .toggle-track::after { transform: translateX(20px); }
  .session-card { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.1rem; border: 1px solid #f0e0d0; border-radius: 12px; margin-bottom: 0.6rem; }
  .session-icon { width: 36px; height: 36px; border-radius: 8px; background: #f5f0e8; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #888; }
  .session-info { flex: 1; }
  .session-info strong { display: block; font-family: var(--font-heading); font-size: 0.85rem; color: var(--text-dark); }
  .session-info span { font-size: 0.75rem; color: #aaa; }
  .session-current { font-family: var(--font-heading); font-size: 0.68rem; background: #f0fdf4; color: #2d7a40; border: 1px solid #bbf7d0; border-radius: 20px; padding: 2px 10px; }
  .danger-zone { background: #fff5f5; border: 1px solid #ffd0d0; border-radius: 14px; padding: 1.4rem; margin-top: 1rem; }
  .danger-title { font-family: var(--font-heading); font-size: 0.9rem; color: var(--brand-red); margin-bottom: 0.4rem; }
  .danger-desc { font-size: 0.8rem; color: #888; margin-bottom: 1rem; line-height: 1.5; }
  .btn-danger { background: none; border: 2px solid var(--brand-red); color: var(--brand-red); border-radius: 8px; padding: 0.55rem 1.2rem; font-family: var(--font-heading); font-size: 0.82rem; cursor: pointer; transition: background 0.2s, color 0.2s; }
  .btn-danger:hover { background: var(--brand-red); color: #fff; }
  .sec-success { display: flex; align-items: center; gap: 0.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.7rem 1rem; font-size: 0.84rem; color: #2d7a40; margin-top: 0.8rem; font-family: var(--font-heading); }
  .sec-error { display: flex; align-items: center; gap: 0.5rem; background: #fff0f0; border-left: 3px solid var(--brand-red); border-radius: 0 8px 8px 0; padding: 0.7rem 1rem; font-size: 0.84rem; color: var(--brand-red); margin-top: 0.8rem; }
  .twofa-code { display: flex; gap: 0.6rem; margin: 1rem 0; }
  .twofa-code input { width: 44px; height: 52px; text-align: center; font-family: var(--font-heading); font-size: 1.4rem; border: 2px solid #e8d8c8; border-radius: 10px; background: #fdfaf5; outline: none; transition: border-color 0.2s; }
  .twofa-code input:focus { border-color: var(--brand-red); background: #fff; }
  .notif-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.9rem 0; border-bottom: 1px solid #f8f0e8; }
  .notif-row:last-child { border-bottom: none; }
  .notif-info strong { display: block; font-size: 0.88rem; color: var(--text-dark); font-family: var(--font-heading); }
  .notif-info span { font-size: 0.76rem; color: #bbb; }
  .data-item { display: flex; justify-content: space-between; align-items: center; padding: 0.7rem 0; border-bottom: 1px solid #f8f0e8; font-size: 0.85rem; color: #555; }
  .data-item:last-child { border-bottom: none; }
  .data-item strong { font-family: var(--font-heading); font-size: 0.82rem; color: var(--text-dark); }
`

// ─── Auth ─────────────────────────────────────────────────────────────────────

function AuthForms() {
  const { login, register } = useAuth()
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (tab === 'register' && form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas'); return }
    setLoading(true)
    try {
      if (tab === 'login') await login(form.email, form.password)
      else await register(form.name, form.email, form.password)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError('') }}>CONNEXION</button>
        <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError('') }}>CRÉER UN COMPTE</button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {tab === 'register' && <div><label>PRÉNOM & NOM</label><input type="text" placeholder="Jean-Paul Moussavou" value={form.name} onChange={set('name')} required /></div>}
        <div><label>ADRESSE EMAIL</label><input type="email" placeholder="vous@email.com" value={form.email} onChange={set('email')} required /></div>
        <div><label>MOT DE PASSE</label><input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required /></div>
        {tab === 'register' && <div><label>CONFIRMER LE MOT DE PASSE</label><input type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} required /></div>}
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="btn-auth" disabled={loading}>
          {loading
            ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> CHARGEMENT...</>
            : tab === 'login' ? 'SE CONNECTER' : 'CRÉER MON COMPTE'}
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </form>
    </div>
  )
}

// ─── Sections dashboard ───────────────────────────────────────────────────────

function Profil({ user, updateProfile }) {
  const [form, setForm] = useState({ name: user.name, email: user.email })
  const [saved, setSaved] = useState(false)
  const handleSave = (e) => { e.preventDefault(); updateProfile(form); setSaved(true); setTimeout(() => setSaved(false), 2000) }
  return (
    <>
      <h2>MON PROFIL</h2>
      <form onSubmit={handleSave}>
        <div className="profil-grid">
          <div className="profil-field"><label>NOM COMPLET</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
          <div className="profil-field"><label>EMAIL</label><input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
          <div className="profil-field"><label>TÉLÉPHONE</label><input type="tel" placeholder="+241 ..." /></div>
          <div className="profil-field"><label>DATE DE NAISSANCE</label><input type="date" /></div>
        </div>
        <button type="submit" className="btn-auth" style={{ marginTop: '2rem', maxWidth: 220 }}>
          {saved ? '✓ ENREGISTRÉ' : 'SAUVEGARDER'}
        </button>
      </form>
    </>
  )
}

// ── Carte commande individuelle avec timer ──
function OrderCard({ order, onCancel }) {
  const { minutes, canCancel } = useOrderTimer(order.createdAt)
  const remaining = Math.max(0, 20 - minutes)
  const isActive = order.status === 'En cours'

  return (
    <div className="order-card">
      <div className="order-head">
        <span className="order-id">{order.id}</span>
        <span className="order-status-badge" style={{ background: STATUS_COLOR[order.status] || '#888' }}>
          {order.status === 'En cours' && '⏳ '}
          {order.status === 'Livré' && '✓ '}
          {order.status === 'Annulé' && '✕ '}
          {order.status}
        </span>
      </div>

      <div className="order-body">
        <div className="order-meta-row">
          <span>{MODE_LABELS[order.mode] || order.mode}</span>
          <span>💳 {order.paymentMethod}</span>
          {order.modeDetails?.table  && <span>📍 {order.modeDetails.table}</span>}
          {order.modeDetails?.zone   && <span>📍 {order.modeDetails.zone}</span>}
          {order.modeDetails?.heure  && <span>🕐 {order.modeDetails.heure}</span>}
        </div>

        <div className="order-items-list">
          {order.items.map((item, i) => (
            <div className="order-item-row" key={i}>
              <div className="order-item-img">
                <img src={item.img} alt={item.name} />
              </div>
              <span className="order-item-name">{item.name} ×{item.qty}</span>
              <span className="order-item-price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="order-foot">
        <div className="order-total-label">
          Total : <span>{order.total}</span>
        </div>

        {/* Logique d'annulation */}
        {isActive && (
          canCancel ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
              <div className="cancel-timer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Annulation possible encore {remaining} min
              </div>
              <button className="btn-cancel" onClick={() => onCancel(order.id)}>
                ANNULER
              </button>
            </div>
          ) : (
            <span className="btn-cancel-expired">Commande en préparation — annulation impossible</span>
          )
        )}
      </div>
    </div>
  )
}

function MesCommandes({ user, cancelOrder }) {
  if (user.orders.length === 0) return (
    <>
      <h2>MES COMMANDES</h2>
      <div style={{ textAlign: 'center', padding: '3rem 0', color: '#aaa' }}>
        <p style={{ fontSize: '3rem' }}>📦</p>
        <p style={{ fontFamily: 'var(--font-heading)', marginTop: '1rem' }}>AUCUNE COMMANDE POUR L'INSTANT</p>
        <Link to="/nos-produits" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>COMMANDER</Link>
      </div>
    </>
  )

  const active = user.orders.filter(o => o.status === 'En cours')
  const past   = user.orders.filter(o => o.status !== 'En cours')

  return (
    <>
      <h2>MES COMMANDES</h2>
      {active.length > 0 && (
        <>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', color: '#f5a623', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>EN COURS</div>
          {active.map(o => <OrderCard key={o.id} order={o} onCancel={cancelOrder} />)}
          <div style={{ height: '0.5rem' }} />
        </>
      )}
      {past.length > 0 && (
        <>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', color: '#aaa', letterSpacing: '0.5px', marginBottom: '0.8rem', marginTop: active.length ? '1rem' : 0 }}>HISTORIQUE</div>
          {past.map(o => <OrderCard key={o.id} order={o} onCancel={cancelOrder} />)}
        </>
      )}
    </>
  )
}

function MesFavoris({ user, removeFavorite }) {
  if (!user.favorites || user.favorites.length === 0) return (
    <>
      <h2>MES FAVORIS</h2>
      <div style={{ textAlign: 'center', padding: '3rem 0', color: '#aaa' }}>
        <p style={{ fontSize: '3rem' }}>🤍</p>
        <p style={{ fontFamily: 'var(--font-heading)', marginTop: '1rem' }}>AUCUN FAVORI POUR L'INSTANT</p>
        <p style={{ fontSize: '0.88rem', marginTop: '0.5rem' }}>Appuyez sur ♡ sur une page produit pour sauvegarder vos plats préférés.</p>
        <Link to="/nos-produits" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>VOIR LA CARTE</Link>
      </div>
    </>
  )

  return (
    <>
      <h2>MES FAVORIS</h2>
      <div className="fav-grid">
        {user.favorites.map(fav => (
          <div className="fav-card" key={`${fav.categorie}/${fav.slug}`}>
            <button className="fav-remove" onClick={() => removeFavorite(fav.slug, fav.categorie)} title="Retirer des favoris">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <Link to={`/nos-produits/${fav.categorie}/${fav.slug}`}>
              <img src={fav.img} alt={fav.name} className="fav-img" />
              <div className="fav-name">{fav.name}</div>
              <div className="fav-price">{fav.price}</div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

function MaFidelite({ user }) {
  const levels = [
    { id: 'BRONZE',  badge: '🥉', label: 'Bronze',  min: 0,    max: 499 },
    { id: 'SILVER',  badge: '🥈', label: 'Silver',  min: 500,  max: 1499 },
    { id: 'GOLD',    badge: '🥇', label: 'Gold',    min: 1500, max: 2999 },
    { id: 'DIAMOND', badge: '💎', label: 'Diamond', min: 3000, max: 5000 },
  ]
  const current = levels.find(l => l.id === user.level) || levels[0]
  const nextLevel = levels[levels.indexOf(current) + 1]
  const progress = Math.min(100, ((user.points - current.min) / (current.max - current.min)) * 100)

  return (
    <>
      <h2>MA FIDÉLITÉ</h2>
      <div style={{ background: '#fdfaf5', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{current.badge}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--brand-red)' }}>NIVEAU {current.label.toUpperCase()}</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem' }}>{user.points} <span style={{ fontSize: '0.9rem', color: '#aaa' }}>POINTS</span></div>
          </div>
        </div>
        {nextLevel && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#aaa', marginBottom: '0.3rem' }}>
              <span>{user.points} pts</span>
              <span>{nextLevel.min} pts pour {nextLevel.label}</span>
            </div>
            <div className="fid-progress-bar"><div className="fid-progress-fill" style={{ width: `${progress}%` }} /></div>
          </>
        )}
      </div>
      <div className="fid-levels-mini">
        {levels.map(l => (
          <div className={`fid-level-card ${l.id === user.level ? 'current' : ''}`} key={l.id}>
            <div className="badge">{l.badge}</div>
            <h4>{l.label}</h4>
            <p>{l.min}–{l.max} pts</p>
          </div>
        ))}
      </div>
    </>
  )
}

function MesAdresses({ user, addAddress, removeAddress }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ label: '', address: '' })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleAdd = () => {
    if (!form.label.trim() || !form.address.trim()) return
    addAddress({ label: form.label, address: form.address })
    setForm({ label: '', address: '' })
    setShowForm(false)
  }

  return (
    <>
      <h2>MES ADRESSES</h2>
      {user.addresses.length === 0 && !showForm && (
        <p style={{ color: '#aaa', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>AUCUNE ADRESSE ENREGISTRÉE</p>
      )}
      {user.addresses.map(a => (
        <div className="address-card" key={a.id}>
          <div>
            <div className="address-label">{a.label}</div>
            <div className="address-text">{a.address}</div>
          </div>
          <button className="btn-small-red" onClick={() => removeAddress(a.id)}>SUPPRIMER</button>
        </div>
      ))}

      {showForm ? (
        <div className="add-form">
          <div className="add-form-title">NOUVELLE ADRESSE</div>
          <div className="add-form-grid">
            <div className="add-form-field">
              <label>LIBELLÉ</label>
              <input placeholder="Domicile, Bureau…" value={form.label} onChange={set('label')} />
            </div>
            <div className="add-form-field">
              <label>ADRESSE COMPLÈTE</label>
              <input placeholder="Quartier, rue, repère…" value={form.address} onChange={set('address')} />
            </div>
          </div>
          <div className="add-form-actions">
            <button className="btn-save" onClick={handleAdd}>ENREGISTRER</button>
            <button className="btn-cancel-form" onClick={() => setShowForm(false)}>ANNULER</button>
          </div>
        </div>
      ) : (
        <button className="btn-auth" style={{ maxWidth: 260, marginTop: '1rem' }} onClick={() => setShowForm(true)}>
          + AJOUTER UNE ADRESSE
        </button>
      )}
    </>
  )
}

const PAYMENT_ICONS = {
  card: '💳',
  paypal: '🅿️',
  airtel: '📱',
  moov: '📲',
}

const PAYMENT_TYPE_LABELS = {
  card: 'Carte bancaire',
  paypal: 'PayPal',
  airtel: 'Airtel Money',
  moov: 'Moov Money',
}

function MesPaiements({ user, addPaymentMethod, removePaymentMethod }) {
  const [showForm, setShowForm] = useState(false)
  const [type, setType] = useState('card')
  const [form, setForm] = useState({})
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const buildLabel = () => {
    if (type === 'card')   return `Visa/MC •••• ${(form.number || '').replace(/\s/g, '').slice(-4) || '????'}`
    if (type === 'paypal') return `PayPal — ${form.email || ''}`
    if (type === 'airtel') return `Airtel Money — ${form.phone || ''}`
    if (type === 'moov')   return `Moov Money — ${form.phone || ''}`
    return PAYMENT_TYPE_LABELS[type]
  }

  const isValid = () => {
    if (type === 'card')   return form.number?.replace(/\s/g,'').length >= 12 && form.name?.trim() && form.expiry?.length === 5
    if (type === 'paypal') return form.email?.includes('@')
    return form.phone?.trim().length >= 8 && form.holder?.trim()
  }

  const handleAdd = () => {
    if (!isValid()) return
    addPaymentMethod({ type, label: buildLabel(), icon: type, details: { ...form } })
    setForm({})
    setShowForm(false)
  }

  return (
    <>
      <h2>MES MOYENS DE PAIEMENT</h2>

      {user.paymentMethods.length === 0 && !showForm && (
        <p style={{ color: '#aaa', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>AUCUN MOYEN DE PAIEMENT ENREGISTRÉ</p>
      )}

      {user.paymentMethods.map((pm, idx) => (
        <div className="payment-card" key={pm.id}>
          <div className="payment-icon" style={{ background: '#f5f0e8' }}>{PAYMENT_ICONS[pm.icon] || '💳'}</div>
          <div className="payment-info">
            <div className="payment-label">{pm.label}</div>
            <div className="payment-sub">{PAYMENT_TYPE_LABELS[pm.type]}</div>
          </div>
          {idx === 0 && <span className="payment-default-badge">✓ Par défaut</span>}
          <button className="btn-small-red" onClick={() => removePaymentMethod(pm.id)}>SUPPRIMER</button>
        </div>
      ))}

      {showForm ? (
        <div className="add-form">
          <div className="add-form-title">NOUVEAU MOYEN DE PAIEMENT</div>

          {/* Sélecteur de type */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
            {Object.entries(PAYMENT_TYPE_LABELS).map(([id, label]) => (
              <button
                key={id}
                onClick={() => { setType(id); setForm({}) }}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  border: `2px solid ${type === id ? 'var(--brand-red)' : '#f0e0d0'}`,
                  background: type === id ? '#fff5f5' : '#fff',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  color: type === id ? 'var(--brand-red)' : '#888',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {PAYMENT_ICONS[id]} {label}
              </button>
            ))}
          </div>

          {/* Formulaire selon le type */}
          {type === 'card' && (
            <div className="add-form-grid">
              <div className="add-form-field" style={{ gridColumn: '1 / -1' }}>
                <label>NUMÉRO DE CARTE</label>
                <input placeholder="1234 5678 9012 3456" maxLength={19}
                  value={form.number || ''}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g,'').slice(0,16)
                    set('number')({ target: { value: v.replace(/(.{4})/g,'$1 ').trim() }})
                  }}
                />
              </div>
              <div className="add-form-field">
                <label>NOM SUR LA CARTE</label>
                <input placeholder="JEAN MARTIN" value={form.name || ''} onChange={e => set('name')({ target: { value: e.target.value.toUpperCase() }})} />
              </div>
              <div className="add-form-field">
                <label>EXPIRATION</label>
                <input placeholder="MM/AA" maxLength={5}
                  value={form.expiry || ''}
                  onChange={e => {
                    let v = e.target.value.replace(/\D/g,'').slice(0,4)
                    if (v.length >= 2) v = v.slice(0,2) + '/' + v.slice(2)
                    set('expiry')({ target: { value: v }})
                  }}
                />
              </div>
            </div>
          )}

          {type === 'paypal' && (
            <div className="add-form-grid">
              <div className="add-form-field" style={{ gridColumn: '1 / -1' }}>
                <label>EMAIL PAYPAL</label>
                <input type="email" placeholder="votre@paypal.com" value={form.email || ''} onChange={set('email')} />
              </div>
            </div>
          )}

          {(type === 'airtel' || type === 'moov') && (
            <div className="add-form-grid">
              <div className="add-form-field">
                <label>NUMÉRO {type === 'airtel' ? 'AIRTEL' : 'MOOV'}</label>
                <input type="tel" placeholder="+241 ..." value={form.phone || ''} onChange={set('phone')} />
              </div>
              <div className="add-form-field">
                <label>NOM DU TITULAIRE</label>
                <input placeholder="Nom associé" value={form.holder || ''} onChange={set('holder')} />
              </div>
            </div>
          )}

          <div className="add-form-actions">
            <button className="btn-save" onClick={handleAdd} disabled={!isValid()}>ENREGISTRER</button>
            <button className="btn-cancel-form" onClick={() => { setShowForm(false); setForm({}) }}>ANNULER</button>
          </div>
        </div>
      ) : (
        <button className="btn-auth" style={{ maxWidth: 300, marginTop: '1rem' }} onClick={() => setShowForm(true)}>
          + AJOUTER UN MOYEN DE PAIEMENT
        </button>
      )}
    </>
  )
}


// ─── Sécurité ─────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-track" />
    </label>
  )
}

function Securite({ user, updateProfile, logout }) {
  // Changement de mot de passe
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwStatus, setPwStatus] = useState(null) // 'ok' | 'error' | null
  const [pwMsg, setPwMsg] = useState('')

  // 2FA simulé
  const [twofa, setTwofa] = useState(user.twofa || false)
  const [showTwofaSetup, setShowTwofaSetup] = useState(false)
  const [twofaCode, setTwofaCode] = useState(['','','','','',''])
  const [twofaStatus, setTwofaStatus] = useState(null)

  // Sessions fictives
  const sessions = [
    { id: 1, device: 'Chrome — Windows', location: 'Libreville, Gabon', time: 'Maintenant', current: true },
    { id: 2, device: 'Safari — iPhone 14', location: 'Libreville, Gabon', time: 'Il y a 2 jours', current: false },
  ]

  const handleChangePw = (e) => {
    e.preventDefault()
    if (pwForm.current.length < 4) { setPwStatus('error'); setPwMsg('Mot de passe actuel incorrect'); return }
    if (pwForm.next.length < 6)    { setPwStatus('error'); setPwMsg('Le nouveau mot de passe doit faire au moins 6 caractères'); return }
    if (pwForm.next !== pwForm.confirm) { setPwStatus('error'); setPwMsg('Les mots de passe ne correspondent pas'); return }
    setPwStatus('ok'); setPwMsg('Mot de passe modifié avec succès')
    setPwForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setPwStatus(null), 3000)
  }

  const handleTwofaCode = (i, val) => {
    const next = [...twofaCode]; next[i] = val.slice(-1); setTwofaCode(next)
    if (val && i < 5) document.getElementById(`tfa-${i+1}`)?.focus()
  }

  const handleTwofaConfirm = () => {
    const code = twofaCode.join('')
    if (code === '123456' || code.length === 6) {
      setTwofa(true); updateProfile({ twofa: true })
      setTwofaStatus('ok'); setShowTwofaSetup(false); setTwofaCode(['','','','','',''])
      setTimeout(() => setTwofaStatus(null), 3000)
    } else {
      setTwofaStatus('error')
    }
  }

  return (
    <>
      <h2>SÉCURITÉ</h2>

      {/* Changement de mot de passe */}
      <div className="sec-section">
        <div className="sec-section-title">Modifier le mot de passe</div>
        <div className="sec-section-desc">Utilisez un mot de passe fort d'au moins 8 caractères, avec des chiffres et des symboles.</div>
        <form onSubmit={handleChangePw}>
          <div className="sec-field"><label>MOT DE PASSE ACTUEL</label><input type="password" placeholder="••••••••" value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} /></div>
          <div className="sec-field"><label>NOUVEAU MOT DE PASSE</label><input type="password" placeholder="••••••••" value={pwForm.next} onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} /></div>
          <div className="sec-field"><label>CONFIRMER LE NOUVEAU MOT DE PASSE</label><input type="password" placeholder="••••••••" value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} /></div>
          {pwStatus === 'ok'    && <div className="sec-success"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{pwMsg}</div>}
          {pwStatus === 'error' && <div className="sec-error">{pwMsg}</div>}
          <button type="submit" className="btn-save" style={{ marginTop: '1rem' }}>MODIFIER LE MOT DE PASSE</button>
        </form>
      </div>

      {/* Double authentification */}
      <div className="sec-section">
        <div className="sec-inline">
          <div className="sec-inline-info">
            <strong>Double authentification (2FA)</strong>
            <span>Recevez un code SMS à chaque connexion pour sécuriser votre compte.</span>
            {twofa && <span style={{ display: 'block', color: '#2d7a40', fontSize: '0.78rem', marginTop: '0.2rem' }}>✓ Activée sur ce compte</span>}
          </div>
          <Toggle
            checked={twofa}
            onChange={v => {
              if (v) { setShowTwofaSetup(true) }
              else { setTwofa(false); updateProfile({ twofa: false }) }
            }}
          />
        </div>
        {showTwofaSetup && (
          <div style={{ marginTop: '1rem', background: '#fdfaf5', borderRadius: '12px', padding: '1.2rem', border: '1px solid #f0e0d0' }}>
            <div style={{ fontSize: '0.84rem', color: '#555', marginBottom: '0.6rem' }}>
              Un code a été envoyé au <strong>{user.email}</strong>. Entrez-le pour activer le 2FA.
              <br /><span style={{ fontSize: '0.75rem', color: '#bbb' }}>Code de démonstration : 123456</span>
            </div>
            <div className="twofa-code">
              {twofaCode.map((v, i) => (
                <input key={i} id={`tfa-${i}`} type="text" inputMode="numeric" maxLength={1}
                  value={v} onChange={e => handleTwofaCode(i, e.target.value)}
                  onKeyDown={e => e.key === 'Backspace' && !v && i > 0 && document.getElementById(`tfa-${i-1}`)?.focus()}
                />
              ))}
            </div>
            {twofaStatus === 'error' && <div className="sec-error">Code incorrect. Réessayez.</div>}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem' }}>
              <button className="btn-save" onClick={handleTwofaConfirm}>CONFIRMER</button>
              <button className="btn-cancel-form" onClick={() => { setShowTwofaSetup(false); setTwofaCode(['','','','','','']) }}>ANNULER</button>
            </div>
          </div>
        )}
        {twofaStatus === 'ok' && <div className="sec-success" style={{ marginTop: '0.8rem' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Double authentification activée</div>}
      </div>

      {/* Sessions actives */}
      <div className="sec-section">
        <div className="sec-section-title">Sessions actives</div>
        <div className="sec-section-desc">Appareils actuellement connectés à votre compte.</div>
        {sessions.map(s => (
          <div className="session-card" key={s.id}>
            <div className="session-icon">
              {s.device.includes('iPhone') || s.device.includes('Android')
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              }
            </div>
            <div className="session-info">
              <strong>{s.device}</strong>
              <span>{s.location} · {s.time}</span>
            </div>
            {s.current
              ? <span className="session-current">Session actuelle</span>
              : <button className="btn-small-red" onClick={() => {}}>DÉCONNECTER</button>
            }
          </div>
        ))}
        <button className="btn-cancel-form" style={{ marginTop: '0.5rem' }} onClick={logout}>
          Déconnecter toutes les autres sessions
        </button>
      </div>

      {/* Zone de danger */}
      <div className="sec-section">
        <div className="sec-section-title">Zone dangereuse</div>
        <div className="danger-zone">
          <div className="danger-title">Supprimer mon compte</div>
          <div className="danger-desc">Cette action est irréversible. Toutes vos données, commandes et points de fidélité seront définitivement supprimés.</div>
          <button className="btn-danger" onClick={() => { if (window.confirm('Supprimer définitivement votre compte ?')) logout() }}>
            SUPPRIMER MON COMPTE
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Confidentialité ──────────────────────────────────────────────────────────

function Confidentialite({ user, updateProfile }) {
  const prefs = user.notifPrefs || { orderUpdates: true, promos: false, newsletter: false, sms: true }
  const [notifs, setNotifs] = useState(prefs)

  const updateNotif = (key, val) => {
    const updated = { ...notifs, [key]: val }
    setNotifs(updated)
    updateProfile({ notifPrefs: updated })
  }

  const [cookieConsent, setCookieConsent] = useState(user.cookieConsent || { analytics: true, marketing: false })
  const updateCookie = (key, val) => {
    const updated = { ...cookieConsent, [key]: val }
    setCookieConsent(updated)
    updateProfile({ cookieConsent: updated })
  }

  const [dataReqSent, setDataReqSent] = useState(false)

  const notifItems = [
    { key: 'orderUpdates', label: 'Mises à jour de commande', desc: 'Statut de votre commande en temps réel' },
    { key: 'promos',       label: 'Offres & promotions',      desc: "Réductions et offres exclusives Burgy's" },
    { key: 'newsletter',   label: 'Newsletter',               desc: 'Actualités et nouveautés du restaurant' },
    { key: 'sms',          label: 'Notifications SMS',        desc: 'Messages texte pour les commandes urgentes' },
  ]

  return (
    <>
      <h2>CONFIDENTIALITÉ</h2>

      {/* Préférences de notifications */}
      <div className="sec-section">
        <div className="sec-section-title">Préférences de notifications</div>
        <div className="sec-section-desc">Choisissez les notifications que vous souhaitez recevoir.</div>
        {notifItems.map(n => (
          <div className="notif-row" key={n.key}>
            <div className="notif-info">
              <strong>{n.label}</strong>
              <span>{n.desc}</span>
            </div>
            <Toggle checked={notifs[n.key]} onChange={v => updateNotif(n.key, v)} />
          </div>
        ))}
      </div>

      {/* Gestion des cookies */}
      <div className="sec-section">
        <div className="sec-section-title">Gestion des cookies</div>
        <div className="sec-section-desc">Les cookies essentiels sont toujours actifs pour le bon fonctionnement du site.</div>
        <div className="notif-row">
          <div className="notif-info">
            <strong>Cookies essentiels</strong>
            <span>Nécessaires au fonctionnement du site</span>
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', color: '#2d7a40' }}>Toujours actif</span>
        </div>
        <div className="notif-row">
          <div className="notif-info">
            <strong>Cookies analytiques</strong>
            <span>Aide à améliorer l'expérience utilisateur</span>
          </div>
          <Toggle checked={cookieConsent.analytics} onChange={v => updateCookie('analytics', v)} />
        </div>
        <div className="notif-row">
          <div className="notif-info">
            <strong>Cookies marketing</strong>
            <span>Publicités personnalisées selon vos préférences</span>
          </div>
          <Toggle checked={cookieConsent.marketing} onChange={v => updateCookie('marketing', v)} />
        </div>
      </div>

      {/* Vos données */}
      <div className="sec-section">
        <div className="sec-section-title">Vos données personnelles</div>
        <div className="sec-section-desc">Conformément au RGPD, vous avez le droit d'accéder, de modifier et de supprimer vos données.</div>
        <div style={{ background: '#fdfaf5', borderRadius: '12px', padding: '1rem 1.2rem', marginBottom: '1.2rem', border: '1px solid #f0e0d0' }}>
          {[
            { label: 'Nom', value: user.name },
            { label: 'Email', value: user.email },
            { label: 'Membre depuis', value: user.joinedAt },
            { label: 'Commandes', value: `${user.orders.length} commande${user.orders.length > 1 ? 's' : ''}` },
            { label: 'Points fidélité', value: `${user.points} pts` },
            { label: 'Favoris', value: `${user.favorites?.length || 0} produit${(user.favorites?.length || 0) > 1 ? 's' : ''}` },
          ].map(d => (
            <div className="data-item" key={d.label}>
              <strong>{d.label}</strong>
              <span>{d.value}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button className="btn-save" onClick={() => { setDataReqSent(true); setTimeout(() => setDataReqSent(false), 4000) }}>
            EXPORTER MES DONNÉES
          </button>
        </div>
        {dataReqSent && <div className="sec-success" style={{ marginTop: '0.8rem' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Export en cours, vous recevrez un email sous 24h</div>}
      </div>

      {/* Politique */}
      <div className="sec-section">
        <div className="sec-section-title">Documents légaux</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { label: 'Politique de confidentialité', to: '/mentions-legales#confidentialite' },
            { label: 'Conditions Générales de Vente', to: '/mentions-legales#cgv' },
            { label: 'Gestion des cookies', to: '/mentions-legales#cookies' },
          ].map(l => (
            <a key={l.label} href={l.to} style={{ fontSize: '0.85rem', color: 'var(--brand-red)', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard() {
  const { user, logout, updateProfile, removeFavorite, cancelOrder, addAddress, removeAddress, addPaymentMethod, removePaymentMethod } = useAuth()
  const { totalItems } = useCart()
  const [section, setSection] = useState('profil')

  const initial = user.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'
  const activeOrders = user.orders.filter(o => o.status === 'En cours').length
  const favCount = user.favorites?.length || 0

  const NAV_ITEMS = [
    { id: 'profil',    label: 'Mon profil',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { id: 'commandes', label: 'Mes commandes', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>, badge: user.orders.length },
    { id: 'favoris',   label: 'Mes favoris',   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, badge: favCount },
    { id: 'fidelite',  label: 'Ma fidélité',   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
    { id: 'adresses',  label: 'Mes adresses',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> },
    { id: 'paiements',  label: 'Mes paiements',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, badge: user.paymentMethods?.length || 0 },
    { id: 'securite',    label: 'Sécurité',          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
    { id: 'confidentialite', label: 'Confidentialité', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  ]

  const renderSection = () => {
    switch (section) {
      case 'profil':    return <Profil user={user} updateProfile={updateProfile} />
      case 'commandes': return <MesCommandes user={user} cancelOrder={cancelOrder} />
      case 'favoris':   return <MesFavoris user={user} removeFavorite={removeFavorite} />
      case 'fidelite':  return <MaFidelite user={user} />
      case 'adresses':  return <MesAdresses user={user} addAddress={addAddress} removeAddress={removeAddress} />
      case 'paiements':  return <MesPaiements user={user} addPaymentMethod={addPaymentMethod} removePaymentMethod={removePaymentMethod} />
      case 'securite':    return <Securite user={user} updateProfile={updateProfile} logout={logout} />
      case 'confidentialite': return <Confidentialite user={user} updateProfile={updateProfile} />
      default: return null
    }
  }

  return (
    <div className="compte-body">
      <div className="compte-sidebar">
        <div className="compte-avatar-block">
          <div className="compte-avatar">{initial}</div>
          <div className="compte-avatar-name">{user.name}</div>
          <div className="compte-avatar-email">{user.email}</div>
          <div><span className="compte-badge">
            {user.level === 'BRONZE' ? '🥉' : user.level === 'SILVER' ? '🥈' : user.level === 'GOLD' ? '🥇' : '💎'} {user.level}
          </span></div>
        </div>

        <nav className="compte-nav">
          {NAV_ITEMS.map(item => (
            <button key={item.id} className={`compte-nav-item ${section === item.id ? 'active' : ''}`} onClick={() => setSection(item.id)}>
              {item.icon}
              {item.label}
              {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <button className="btn-logout" onClick={logout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Se déconnecter
        </button>
      </div>

      <div className="compte-panel">{renderSection()}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Compte() {
  const { user } = useAuth()
  return (
    <>
      <style>{css}</style>
      <div className="compte-page">
        <div className="compte-hero">
          <h1>{user ? `BONJOUR, ${user.name.split(' ')[0].toUpperCase()} 👋` : 'MON COMPTE'}</h1>
          <p>{user ? `${user.points} POINTS · NIVEAU ${user.level}` : 'CONNECTEZ-VOUS OU CRÉEZ VOTRE COMPTE'}</p>
        </div>
        {user ? <Dashboard /> : <AuthForms />}
      </div>
    </>
  )
}
