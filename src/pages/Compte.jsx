import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

// ─── Styles ───────────────────────────────────────────────────────────────────

const css = `
  .compte-page {
    padding-top: 110px;
    min-height: 100vh;
    background: #fdfaf5;
  }

  /* ── Header ── */
  .compte-hero {
    background: var(--brand-red);
    padding: 3rem 5% 2.5rem;
    color: #fff;
  }
  .compte-hero h1 {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1;
  }
  .compte-hero p {
    font-family: var(--font-heading);
    opacity: 0.8;
    letter-spacing: 2px;
    margin-top: 0.4rem;
    font-size: 0.95rem;
  }

  /* ── Auth (login / register) ── */
  .auth-container {
    max-width: 480px;
    margin: 4rem auto;
    padding: 0 5%;
  }
  .auth-tabs {
    display: flex;
    border-bottom: 2px solid #f0e0d0;
    margin-bottom: 2.5rem;
  }
  .auth-tab {
    flex: 1;
    padding: 0.9rem;
    font-family: var(--font-heading);
    font-size: 1rem;
    letter-spacing: 0.5px;
    color: #aaa;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .auth-tab.active { color: var(--brand-red); border-bottom-color: var(--brand-red); }

  .auth-form { display: flex; flex-direction: column; gap: 1.2rem; }
  .auth-form label {
    font-family: var(--font-heading);
    font-size: 0.82rem;
    color: var(--brand-red);
    letter-spacing: 0.5px;
    display: block;
    margin-bottom: 0.4rem;
  }
  .auth-form input {
    width: 100%;
    padding: 0.85rem 1.1rem;
    border: 2px solid #e8d8c8;
    border-radius: 12px;
    font-family: var(--font-body);
    font-size: 0.95rem;
    background: #fff;
    transition: border-color 0.2s;
    outline: none;
  }
  .auth-form input:focus { border-color: var(--brand-red); }
  .auth-error {
    background: #fff0f0;
    border-left: 4px solid var(--brand-red);
    padding: 0.8rem 1rem;
    border-radius: 0 8px 8px 0;
    font-size: 0.88rem;
    color: var(--brand-red);
  }
  .btn-auth {
    width: 100%;
    background: var(--brand-red);
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 0.9rem;
    font-family: var(--font-heading);
    font-size: 1rem;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .btn-auth:hover { background: #c01010; transform: translateY(-2px); }
  .btn-auth:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* ── Dashboard ── */
  .compte-body {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 2.5rem;
    max-width: 1100px;
    margin: 3rem auto;
    padding: 0 5% 6rem;
    align-items: start;
  }
  @media (max-width: 760px) {
    .compte-body { grid-template-columns: 1fr; }
  }

  /* Sidebar */
  .compte-sidebar {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    position: sticky;
    top: 100px;
  }
  .compte-avatar-block {
    background: var(--brand-red);
    padding: 2rem 1.5rem;
    text-align: center;
    color: #fff;
  }
  .compte-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem;
    font-family: var(--font-heading);
    font-size: 1.8rem;
    color: #fff;
    border: 3px solid rgba(255,255,255,0.5);
  }
  .compte-avatar-name {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    line-height: 1.2;
  }
  .compte-avatar-email { font-size: 0.78rem; opacity: 0.75; margin-top: 0.3rem; }

  .compte-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--brand-yellow);
    color: var(--brand-red);
    font-family: var(--font-heading);
    font-size: 0.75rem;
    padding: 3px 12px;
    border-radius: 20px;
    margin-top: 0.8rem;
  }

  .compte-nav { padding: 0.6rem 0; }
  .compte-nav-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.85rem 1.5rem;
    font-family: var(--font-heading);
    font-size: 0.88rem;
    color: #777;
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    transition: background 0.2s, color 0.2s;
    letter-spacing: 0.3px;
  }
  .compte-nav-item:hover { background: #fdf6ee; color: var(--brand-red); }
  .compte-nav-item.active { background: #fff5f5; color: var(--brand-red); font-weight: 600; }
  .compte-nav-item svg { flex-shrink: 0; }

  .btn-logout {
    width: 100%;
    padding: 0.85rem 1.5rem;
    font-family: var(--font-heading);
    font-size: 0.88rem;
    color: #aaa;
    background: none;
    border: none;
    border-top: 1px solid #f0e0d0;
    cursor: pointer;
    display: flex; align-items: center; gap: 0.8rem;
    transition: color 0.2s;
  }
  .btn-logout:hover { color: var(--brand-red); }

  /* Contenu principal */
  .compte-panel {
    background: #fff;
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  }
  .compte-panel h2 {
    font-family: var(--font-heading);
    font-size: 1.6rem;
    color: var(--brand-red);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f0e0d0;
  }

  /* Profil */
  .profil-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  @media (max-width: 520px) { .profil-grid { grid-template-columns: 1fr; } }
  .profil-field label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.8rem;
    color: var(--brand-red);
    letter-spacing: 0.5px;
    margin-bottom: 0.4rem;
  }
  .profil-field input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e8d8c8;
    border-radius: 10px;
    font-size: 0.9rem;
    font-family: var(--font-body);
    outline: none;
    transition: border-color 0.2s;
    background: #fdfaf5;
  }
  .profil-field input:focus { border-color: var(--brand-red); background: #fff; }

  /* Commandes */
  .order-card {
    border: 1px solid #f0e0d0;
    border-radius: 14px;
    padding: 1.2rem 1.4rem;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s;
  }
  .order-card:hover { box-shadow: 0 4px 16px rgba(229,28,29,0.08); }
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .order-id { font-family: var(--font-heading); font-size: 1rem; color: var(--text-dark); }
  .order-status {
    font-family: var(--font-heading);
    font-size: 0.75rem;
    padding: 3px 12px;
    border-radius: 20px;
    background: #e8f5e9;
    color: #2d7a40;
  }
  .order-meta { font-size: 0.82rem; color: #999; margin-bottom: 0.5rem; }
  .order-items { font-size: 0.88rem; color: #555; }
  .order-total { font-family: var(--font-heading); font-size: 1rem; color: var(--brand-red); margin-top: 0.5rem; }

  /* Fidélité */
  .fid-progress-bar {
    height: 10px;
    border-radius: 10px;
    background: #f0e0d0;
    overflow: hidden;
    margin: 0.8rem 0;
  }
  .fid-progress-fill {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(to right, var(--brand-red), var(--brand-yellow));
    transition: width 0.6s ease;
  }
  .fid-levels-mini {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
    margin-top: 1.5rem;
  }
  @media (max-width: 520px) { .fid-levels-mini { grid-template-columns: repeat(2, 1fr); } }
  .fid-level-card {
    border-radius: 14px;
    padding: 1rem;
    text-align: center;
    border: 2px solid #f0e0d0;
    transition: border-color 0.2s;
  }
  .fid-level-card.current { border-color: var(--brand-yellow); background: #fffbef; }
  .fid-level-card .badge { font-size: 1.8rem; }
  .fid-level-card h4 { font-family: var(--font-heading); font-size: 0.85rem; margin: 0.4rem 0 0.2rem; }
  .fid-level-card p { font-size: 0.72rem; color: #999; }

  /* Adresses */
  .address-card {
    border: 1px solid #f0e0d0;
    border-radius: 14px;
    padding: 1.2rem 1.4rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .address-label { font-family: var(--font-heading); font-size: 0.9rem; color: var(--brand-red); margin-bottom: 0.3rem; }
  .address-text { font-size: 0.88rem; color: #555; }
  .btn-small-red {
    background: none;
    border: 2px solid #f0e0d0;
    border-radius: 8px;
    padding: 0.4rem 0.9rem;
    font-family: var(--font-heading);
    font-size: 0.78rem;
    color: #aaa;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    white-space: nowrap;
  }
  .btn-small-red:hover { border-color: var(--brand-red); color: var(--brand-red); }
`

// ─── Formulaires Auth ─────────────────────────────────────────────────────────

function AuthForms() {
  const { login, register } = useAuth()
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (tab === 'register' && form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    setLoading(true)
    try {
      if (tab === 'login') await login(form.email, form.password)
      else await register(form.name, form.email, form.password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError('') }}>
          CONNEXION
        </button>
        <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError('') }}>
          CRÉER UN COMPTE
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {tab === 'register' && (
          <div>
            <label>PRÉNOM & NOM</label>
            <input type="text" placeholder="Jean-Paul Moussavou" value={form.name} onChange={set('name')} required />
          </div>
        )}
        <div>
          <label>ADRESSE EMAIL</label>
          <input type="email" placeholder="vous@email.com" value={form.email} onChange={set('email')} required />
        </div>
        <div>
          <label>MOT DE PASSE</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required />
        </div>
        {tab === 'register' && (
          <div>
            <label>CONFIRMER LE MOT DE PASSE</label>
            <input type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} required />
          </div>
        )}
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="btn-auth" disabled={loading}>
          {loading
            ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> CHARGEMENT...</>
            : tab === 'login' ? 'SE CONNECTER' : 'CRÉER MON COMPTE'
          }
        </button>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </form>
    </div>
  )
}

// ─── Dashboard sections ───────────────────────────────────────────────────────

function Profil({ user, updateProfile }) {
  const [form, setForm] = useState({ name: user.name, email: user.email })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <h2>MON PROFIL</h2>
      <form onSubmit={handleSave}>
        <div className="profil-grid">
          <div className="profil-field">
            <label>NOM COMPLET</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="profil-field">
            <label>EMAIL</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="profil-field">
            <label>TÉLÉPHONE</label>
            <input type="tel" placeholder="+241 ..." />
          </div>
          <div className="profil-field">
            <label>DATE DE NAISSANCE</label>
            <input type="date" />
          </div>
        </div>
        <button type="submit" className="btn-auth" style={{ marginTop: '2rem', maxWidth: 220 }}>
          {saved ? '✓ ENREGISTRÉ' : 'SAUVEGARDER'}
        </button>
      </form>
    </>
  )
}

function MesCommandes({ user }) {
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

  return (
    <>
      <h2>MES COMMANDES</h2>
      {user.orders.map(order => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <span className="order-id">{order.id}</span>
            <span className="order-status">✓ {order.status}</span>
          </div>
          <div className="order-meta">{order.date}</div>
          <div className="order-items">{order.items.join(', ')}</div>
          <div className="order-total">{order.total}</div>
        </div>
      ))}
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
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--brand-red)' }}>
              NIVEAU {current.label.toUpperCase()}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem' }}>
              {user.points} <span style={{ fontSize: '0.9rem', color: '#aaa' }}>POINTS</span>
            </div>
          </div>
        </div>
        {nextLevel && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#aaa', marginBottom: '0.3rem' }}>
              <span>{user.points} pts</span>
              <span>{nextLevel.min} pts pour {nextLevel.label}</span>
            </div>
            <div className="fid-progress-bar">
              <div className="fid-progress-fill" style={{ width: `${progress}%` }} />
            </div>
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

function MesAdresses({ user }) {
  return (
    <>
      <h2>MES ADRESSES</h2>
      {user.addresses.length === 0
        ? <p style={{ color: '#aaa', fontFamily: 'var(--font-heading)' }}>AUCUNE ADRESSE ENREGISTRÉE</p>
        : user.addresses.map(a => (
          <div className="address-card" key={a.id}>
            <div>
              <div className="address-label">{a.label}</div>
              <div className="address-text">{a.address}</div>
            </div>
            <button className="btn-small-red">MODIFIER</button>
          </div>
        ))
      }
      <button className="btn-auth" style={{ maxWidth: 240, marginTop: '1rem' }}>
        + AJOUTER UNE ADRESSE
      </button>
    </>
  )
}

// ─── Dashboard principal ──────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'profil',    label: 'Mon profil',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: 'commandes', label: 'Mes commandes',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { id: 'fidelite',  label: 'Ma fidélité',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { id: 'adresses',  label: 'Mes adresses',   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> },
]

function Dashboard() {
  const { user, logout, updateProfile } = useAuth()
  const { totalItems } = useCart()
  const [section, setSection] = useState('profil')

  const initial = user.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?'

  const renderSection = () => {
    switch (section) {
      case 'profil':    return <Profil user={user} updateProfile={updateProfile} />
      case 'commandes': return <MesCommandes user={user} />
      case 'fidelite':  return <MaFidelite user={user} />
      case 'adresses':  return <MesAdresses user={user} />
      default:          return null
    }
  }

  return (
    <div className="compte-body">
      {/* Sidebar */}
      <div className="compte-sidebar">
        <div className="compte-avatar-block">
          <div className="compte-avatar">{initial}</div>
          <div className="compte-avatar-name">{user.name}</div>
          <div className="compte-avatar-email">{user.email}</div>
          <div><span className="compte-badge">🥉 {user.level}</span></div>
        </div>

        <nav className="compte-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`compte-nav-item ${section === item.id ? 'active' : ''}`}
              onClick={() => setSection(item.id)}
            >
              {item.icon}
              {item.label}
              {item.id === 'commandes' && user.orders.length > 0 && (
                <span style={{ marginLeft: 'auto', background: '#f0e0d0', color: 'var(--brand-red)', borderRadius: '10px', padding: '1px 8px', fontSize: '0.72rem', fontFamily: 'var(--font-heading)' }}>
                  {user.orders.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button className="btn-logout" onClick={logout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Se déconnecter
        </button>
      </div>

      {/* Contenu */}
      <div className="compte-panel">
        {renderSection()}
      </div>
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function Compte() {
  const { user } = useAuth()

  return (
    <>
      <style>{css}</style>
      <div className="compte-page">
        <div className="compte-hero">
          <h1>{user ? `BONJOUR, ${user.name.split(' ')[0].toUpperCase()} 👋` : 'MON COMPTE'}</h1>
          <p>{user ? `${user.points} POINTS FIDÉLITÉ · NIVEAU ${user.level}` : 'CONNECTEZ-VOUS OU CRÉEZ VOTRE COMPTE'}</p>
        </div>

        {user ? <Dashboard /> : <AuthForms />}
      </div>
    </>
  )
}
