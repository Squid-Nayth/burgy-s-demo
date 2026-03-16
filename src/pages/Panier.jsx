import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

// ─── Constantes restaurant ────────────────────────────────────────────────────
const RESTAURANT = {
  name: "Burgy's Glass",
  address: 'Après KFC, Glass, Libreville, Gabon',
  phone: '+241 0 0 000 0',
  hours: '11h00 – 23h00, 7j/7',
  tables: ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5',
           'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Terrasse 1', 'Terrasse 2'],
  deliveryFee: 1000,
  deliveryZones: ['Glass', 'Montagne Sainte', 'Louis', 'Nombakélé', 'Léon MBA', 'Sotega'],
}

// ─── Étape 1 : choix du mode ──────────────────────────────────────────────────
function ModeSelector({ selected, onSelect }) {
  const modes = [
    {
      id: 'emporter',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
      label: 'À emporter',
      desc: 'Venez chercher votre commande au comptoir',
      color: '#f5a623',
    },
    {
      id: 'table',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18"/><path d="M3 15h18"/><path d="M8 9V3"/><path d="M16 9V3"/><path d="M8 21v-6"/><path d="M16 21v-6"/>
        </svg>
      ),
      label: 'Sur table',
      desc: 'Commandez directement depuis votre table',
      color: 'var(--brand-red)',
    },
    {
      id: 'livraison',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="19" r="2"/><circle cx="20" cy="19" r="2"/>
        </svg>
      ),
      label: 'Livraison',
      desc: 'Recevez votre commande à domicile',
      color: '#1565c0',
    },
  ]

  return (
    <div className="mode-selector">
      <p className="mode-intro">Comment souhaitez-vous recevoir votre commande ?</p>
      <div className="mode-grid">
        {modes.map(m => (
          <button
            key={m.id}
            className={`mode-card ${selected === m.id ? 'active' : ''}`}
            onClick={() => onSelect(m.id)}
            style={{ '--mode-color': m.color }}
          >
            <div className="mode-icon">{m.icon}</div>
            <strong className="mode-label">{m.label}</strong>
            <p className="mode-desc">{m.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Étape 2 : formulaire contextuel ─────────────────────────────────────────
function OrderForm({ mode, details, onChange }) {
  if (mode === 'emporter') return (
    <div className="order-form">
      <div className="order-form-info">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div>
          <strong>{RESTAURANT.name}</strong>
          <span>{RESTAURANT.address}</span>
          <span>Ouvert {RESTAURANT.hours}</span>
        </div>
      </div>
      <div className="form-row-order">
        <div className="form-field">
          <label>VOTRE NOM *</label>
          <input
            type="text"
            placeholder="Pour récupérer votre commande"
            value={details.nom || ''}
            onChange={e => onChange({ ...details, nom: e.target.value })}
            required
          />
        </div>
        <div className="form-field">
          <label>TÉLÉPHONE *</label>
          <input
            type="tel"
            placeholder="+241 ..."
            value={details.tel || ''}
            onChange={e => onChange({ ...details, tel: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-field">
        <label>HEURE DE RETRAIT SOUHAITÉE</label>
        <input
          type="time"
          value={details.heure || ''}
          onChange={e => onChange({ ...details, heure: e.target.value })}
          min="11:00" max="23:00"
        />
      </div>
      <div className="form-field">
        <label>REMARQUES (optionnel)</label>
        <textarea
          placeholder="Sans oignons, sauce à part..."
          value={details.note || ''}
          onChange={e => onChange({ ...details, note: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  )

  if (mode === 'table') return (
    <div className="order-form">
      <div className="order-form-info">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div>
          <strong>Commande sur place</strong>
          <span>Votre commande sera servie directement à votre table</span>
        </div>
      </div>
      <div className="form-row-order">
        <div className="form-field">
          <label>VOTRE TABLE *</label>
          <select
            value={details.table || ''}
            onChange={e => onChange({ ...details, table: e.target.value })}
            required
          >
            <option value="">Sélectionnez votre table</option>
            {RESTAURANT.tables.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>NB PERSONNES</label>
          <select
            value={details.personnes || '1'}
            onChange={e => onChange({ ...details, personnes: e.target.value })}
          >
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>)}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label>REMARQUES (optionnel)</label>
        <textarea
          placeholder="Allergie, préférence de cuisson..."
          value={details.note || ''}
          onChange={e => onChange({ ...details, note: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  )

  if (mode === 'livraison') return (
    <div className="order-form">
      <div className="order-form-info">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div>
          <strong>Livraison à domicile</strong>
          <span>Zones : {RESTAURANT.deliveryZones.join(', ')}</span>
          <span>Frais de livraison : {RESTAURANT.deliveryFee.toLocaleString('fr-FR')} CFA</span>
        </div>
      </div>
      <div className="form-row-order">
        <div className="form-field">
          <label>VOTRE NOM *</label>
          <input
            type="text"
            placeholder="Prénom et nom"
            value={details.nom || ''}
            onChange={e => onChange({ ...details, nom: e.target.value })}
            required
          />
        </div>
        <div className="form-field">
          <label>TÉLÉPHONE *</label>
          <input
            type="tel"
            placeholder="+241 ..."
            value={details.tel || ''}
            onChange={e => onChange({ ...details, tel: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-field">
        <label>ADRESSE DE LIVRAISON *</label>
        <input
          type="text"
          placeholder="Quartier, rue, repère..."
          value={details.adresse || ''}
          onChange={e => onChange({ ...details, adresse: e.target.value })}
          required
        />
      </div>
      <div className="form-row-order">
        <div className="form-field">
          <label>QUARTIER *</label>
          <select
            value={details.zone || ''}
            onChange={e => onChange({ ...details, zone: e.target.value })}
            required
          >
            <option value="">Choisir le quartier</option>
            {RESTAURANT.deliveryZones.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>HEURE SOUHAITÉE</label>
          <input
            type="time"
            value={details.heure || ''}
            onChange={e => onChange({ ...details, heure: e.target.value })}
            min="11:00" max="22:30"
          />
        </div>
      </div>
      <div className="form-field">
        <label>REMARQUES (optionnel)</label>
        <textarea
          placeholder="Instructions de livraison, code d'entrée..."
          value={details.note || ''}
          onChange={e => onChange({ ...details, note: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  )

  return null
}

// ─── Validation formulaire ────────────────────────────────────────────────────
function isFormValid(mode, details) {
  if (mode === 'emporter') return details.nom?.trim() && details.tel?.trim()
  if (mode === 'table')    return details.table?.trim()
  if (mode === 'livraison') return details.nom?.trim() && details.tel?.trim() && details.adresse?.trim() && details.zone?.trim()
  return false
}

// ─── Labels confirmation ──────────────────────────────────────────────────────
function confirmLabel(mode, details) {
  if (mode === 'emporter') return `À emporter — ${details.nom}${details.heure ? ` à ${details.heure}` : ''}`
  if (mode === 'table')    return `Sur table — ${details.table}${details.personnes ? `, ${details.personnes} pers.` : ''}`
  if (mode === 'livraison') return `Livraison — ${details.adresse}, ${details.zone}`
  return ''
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function Panier() {
  const { items, removeItem, updateQty, clearCart, totalPrice, formatPrice,
          orderType, setOrderType, orderDetails, setOrderDetails } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Étapes : 'cart' → 'mode' → 'form' → 'confirm' → 'done'
  const [step, setStep] = useState('cart')
  const [localDetails, setLocalDetails] = useState({})

  // Pré-sélectionner le mode si passé en query param (?mode=emporter)
  useEffect(() => {
    const m = searchParams.get('mode')
    if (m && ['emporter', 'table', 'livraison'].includes(m)) {
      setOrderType(m)
      if (items.length > 0) setStep('form')
    }
  }, [])

  const deliveryFee = orderType === 'livraison' ? RESTAURANT.deliveryFee : 0
  const totalWithFee = totalPrice + deliveryFee

  const handleConfirmOrder = () => {
    setOrderDetails(localDetails)
    setStep('confirm')
  }

  const handlePlaceOrder = () => {
    setOrderDetails(localDetails)
    navigate('/paiement')
  }

  const modeLabels = { emporter: 'À emporter', table: 'Sur table', livraison: 'Livraison' }



  return (
    <>
      <style>{panier_css}</style>
      <div>

        {/* Header */}
        <div className="panier-header">
          <h1>MON PANIER</h1>
          <p>{items.reduce((s, i) => s + i.qty, 0)} ARTICLE{items.reduce((s, i) => s + i.qty, 0) > 1 ? 'S' : ''}</p>
        </div>

        {/* Fil d'étapes */}
        {items.length > 0 && (
          <div className="panier-steps">
            {['cart', 'mode', 'form', 'confirm', 'paiement'].map((s, idx) => {
              const labels = ['Panier', 'Mode', 'Infos', 'Récap', 'Paiement']
              const stepIndex = ['cart','mode','form','confirm','paiement'].indexOf(step)
              return (
                <div key={s} className={`panier-step ${stepIndex >= idx ? 'done' : ''} ${step === s ? 'active' : ''}`}>
                  <div className="step-dot">{stepIndex > idx ? '✓' : idx + 1}</div>
                  <span>{labels[idx]}</span>
                </div>
              )
            })}
          </div>
        )}

        {!user ? (
          <div className="panier-body">
            <div className="panier-empty">
              <div className="icon">🔒</div>
              <h2>CONNEXION REQUISE</h2>
              <p>Vous devez être connecté pour accéder à votre panier et passer commande.</p>
              <Link to="/compte" className="btn-primary">SE CONNECTER</Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="panier-body">
            <div className="panier-empty">
              <div className="icon">🛒</div>
              <h2>PANIER VIDE</h2>
              <p>Vous n'avez pas encore ajouté de produits.</p>
              <Link to="/nos-produits" className="btn-primary">VOIR LA CARTE</Link>
            </div>
          </div>
        ) : (

          <div className="panier-body">

            {/* ── ÉTAPE 1 : liste du panier ── */}
            {step === 'cart' && (
              <>
                <div className="panier-list">
                  {items.map(item => {
                    const unitPrice = parseInt(item.price.replace(/\s/g, '').replace('CFA', ''), 10) || 0
                    return (
                      <div className="panier-item" key={item.key}>
                        <div className="panier-item-img">
                          <img src={item.img} alt={item.name} />
                        </div>
                        <div className="panier-item-info">
                          <h4>{item.name}</h4>
                          <div className="panier-item-price">{item.price} / unité</div>
                        </div>
                        <div className="panier-item-right">
                          <div className="panier-item-total">
                            {(unitPrice * item.qty).toLocaleString('fr-FR').replace(',', ' ')} CFA
                          </div>
                          <div className="qty-control">
                            <button className="qty-btn" onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                            <span className="qty-value">{item.qty}</span>
                            <button className="qty-btn" onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                          </div>
                          <button className="panier-remove" onClick={() => removeItem(item.key)} aria-label="Supprimer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="panier-recap">
                  <h3>SOUS-TOTAL</h3>
                  {items.map(item => {
                    const u = parseInt(item.price.replace(/\s/g, '').replace('CFA', ''), 10) || 0
                    return (
                      <div className="recap-line" key={item.key}>
                        <span>{item.name} ×{item.qty}</span>
                        <span>{(u * item.qty).toLocaleString('fr-FR').replace(',', ' ')} CFA</span>
                      </div>
                    )
                  })}
                  <div className="recap-line total">
                    <span>TOTAL</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  {/* Sélecteur de mode inline dans l'étape cart */}
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: '2px solid #f0e0d0' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', color: '#aaa', letterSpacing: '0.5px', marginBottom: '0.8rem' }}>MODE DE COMMANDE</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        { id: 'emporter', label: '🛍️ À emporter', desc: 'Récupérer au comptoir' },
                        { id: 'table',    label: '🍽️ Sur table',  desc: 'Servi à votre table' },
                        { id: 'livraison',label: '🛵 Livraison',  desc: 'À domicile +1 000 CFA' },
                      ].map(m => (
                        <button
                          key={m.id}
                          onClick={() => setOrderType(m.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.7rem',
                            padding: '0.65rem 0.9rem', borderRadius: '10px', cursor: 'pointer',
                            border: `2px solid ${orderType === m.id ? 'var(--brand-red)' : '#f0e0d0'}`,
                            background: orderType === m.id ? '#fff5f5' : '#fff',
                            transition: 'all 0.2s', textAlign: 'left',
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', flex: 1, color: 'var(--text-dark)' }}>{m.label}</span>
                          <span style={{ fontSize: '0.72rem', color: '#aaa' }}>{m.desc}</span>
                          {orderType === m.id && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="btn-order" disabled={!orderType} onClick={() => setStep('form')} style={{ marginTop: '1.2rem' }}>
                    CONTINUER →
                  </button>
                  <button className="btn-continue" onClick={() => navigate('/nos-produits')}>
                    CONTINUER MES ACHATS
                  </button>
                </div>
              </>
            )}

            {/* ── ÉTAPE 2 : choix du mode ── */}
            {step === 'mode' && (
              <div className="panier-full-col">
                <ModeSelector selected={orderType} onSelect={m => { setOrderType(m); setLocalDetails({}) }} />
                <div className="step-nav">
                  <button className="btn-back" onClick={() => setStep('cart')}>← Retour au panier</button>
                  <button
                    className="btn-order"
                    style={{ maxWidth: 260 }}
                    disabled={!orderType}
                    onClick={() => setStep('form')}
                  >
                    CONTINUER →
                  </button>
                </div>
              </div>
            )}

            {/* ── ÉTAPE 3 : formulaire ── */}
            {step === 'form' && (
              <div className="panier-full-col">
                <div className="form-header">
                  <h3>
                    {orderType === 'emporter'  && '🛍️ Commande à emporter'}
                    {orderType === 'table'     && '🍽️ Commande sur table'}
                    {orderType === 'livraison' && '🛵 Livraison à domicile'}
                  </h3>
                </div>
                <OrderForm mode={orderType} details={localDetails} onChange={setLocalDetails} />
                <div className="step-nav">
                  <button className="btn-back" onClick={() => setStep('mode')}>← Changer de mode</button>
                  <button
                    className="btn-order"
                    style={{ maxWidth: 260 }}
                    disabled={!isFormValid(orderType, localDetails)}
                    onClick={handleConfirmOrder}
                  >
                    VOIR LE RÉCAP →
                  </button>
                </div>
              </div>
            )}

            {/* ── ÉTAPE 4 : récapitulatif final ── */}
            {step === 'confirm' && (
              <>
                <div className="panier-list panier-list-readonly">
                  <div className="confirm-mode-badge">
                    {orderType === 'emporter'  && '🛍️'}
                    {orderType === 'table'     && '🍽️'}
                    {orderType === 'livraison' && '🛵'}
                    <span>{confirmLabel(orderType, localDetails)}</span>
                    <button className="edit-link" onClick={() => setStep('form')}>Modifier</button>
                  </div>
                  {items.map(item => {
                    const u = parseInt(item.price.replace(/\s/g, '').replace('CFA', ''), 10) || 0
                    return (
                      <div className="panier-item" key={item.key}>
                        <div className="panier-item-img"><img src={item.img} alt={item.name} /></div>
                        <div className="panier-item-info">
                          <h4>{item.name}</h4>
                          <div className="panier-item-price">{item.price} / unité</div>
                        </div>
                        <div className="panier-item-right">
                          <div className="panier-item-total">{(u * item.qty).toLocaleString('fr-FR').replace(',', ' ')} CFA</div>
                          <div className="qty-readonly">×{item.qty}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="panier-recap">
                  <h3>RÉCAPITULATIF</h3>
                  {items.map(item => {
                    const u = parseInt(item.price.replace(/\s/g, '').replace('CFA', ''), 10) || 0
                    return (
                      <div className="recap-line" key={item.key}>
                        <span>{item.name} ×{item.qty}</span>
                        <span>{(u * item.qty).toLocaleString('fr-FR').replace(',', ' ')} CFA</span>
                      </div>
                    )
                  })}
                  {deliveryFee > 0 && (
                    <div className="recap-line">
                      <span>Frais de livraison</span>
                      <span>{deliveryFee.toLocaleString('fr-FR')} CFA</span>
                    </div>
                  )}
                  <div className="recap-line total">
                    <span>TOTAL</span>
                    <span>{formatPrice(totalWithFee)}</span>
                  </div>

                  <button className="btn-order" onClick={handlePlaceOrder}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    PROCÉDER AU PAIEMENT
                  </button>
                  <button className="btn-back" style={{ marginTop: '0.8rem', width: '100%' }} onClick={() => setStep('cart')}>
                    ← Modifier le panier
                  </button>
                </div>
              </>
            )}

          </div>
        )}
      </div>
    </>
  )
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const panier_css = `
  .panier-page {
    padding-top: 110px;
    min-height: 100vh;
    background: #fdfaf5;
  }
  .panier-header {
    background: var(--brand-red);
    padding: 110px 5% 3rem;
    color: #fff;
    transition: background 0.4s;
    text-align: center;
  }
  .panier-header h1 {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1;
  }
  .panier-header p {
    font-family: var(--font-heading);
    opacity: 0.8;
    letter-spacing: 2px;
    margin-top: 0.4rem;
    font-size: 0.95rem;
  }

  /* ── Fil d'étapes ── */
  .panier-steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 1.4rem 5%;
    background: #fff;
    border-bottom: 1px solid #f0e0d0;
    overflow-x: auto;
  }
  .panier-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-heading);
    font-size: 0.82rem;
    color: #bbb;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .panier-step:not(:last-child)::after {
    content: '›';
    margin: 0 0.8rem;
    color: #ddd;
    font-size: 1.2rem;
  }
  .panier-step.done .step-dot { background: #2d7a40; color: #fff; }
  .panier-step.active { color: var(--brand-red); }
  .panier-step.active .step-dot { background: var(--brand-red); color: #fff; }
  .panier-step.done { color: #2d7a40; }
  .step-dot {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: #eee;
    color: #999;
    font-size: 0.72rem;
    font-family: var(--font-heading);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* ── Layout body ── */
  .panier-body {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 5% 6rem;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2.5rem;
    align-items: start;
  }
  .panier-full-col {
    grid-column: 1 / -1;
    max-width: 700px;
    margin: 0 auto;
    width: 100%;
  }
  @media (max-width: 760px) {
    .panier-body { grid-template-columns: 1fr; padding: 2rem 5% 4rem; gap: 2rem; }
    .panier-recap { position: static; }
    .panier-full-col { grid-column: 1; }
  }
  @media (max-width: 480px) {
    .panier-header h1 { font-size: 2.5rem; }
    .panier-item { grid-template-columns: 60px 1fr; }
    .panier-item-right { flex-direction: row; flex-wrap: wrap; align-items: center; }
  }

  /* ── Liste articles ── */
  .panier-list { display: flex; flex-direction: column; gap: 1rem; }
  .panier-item {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: 1.2rem;
    align-items: center;
    background: #fff;
    border-radius: 18px;
    padding: 1.2rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s;
  }
  .panier-item:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.09); }
  .panier-item-img {
    width: 80px; height: 80px;
    border-radius: 12px;
    background: #f5f0e8;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; flex-shrink: 0;
  }
  .panier-item-img img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
  .panier-item-info h4 {
    font-family: var(--font-heading);
    font-size: 1rem;
    color: var(--text-dark);
    margin-bottom: 0.3rem;
    line-height: 1.2;
  }
  .panier-item-price { font-family: var(--font-heading); font-size: 0.9rem; color: var(--brand-red); }
  .panier-item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem; }
  .panier-item-total { font-family: var(--font-heading); font-size: 1.05rem; white-space: nowrap; }
  .qty-readonly { font-family: var(--font-heading); font-size: 0.9rem; color: #999; }
  .qty-control {
    display: flex; align-items: center;
    border: 2px solid #f0e0d0; border-radius: 50px; overflow: hidden;
  }
  .qty-btn {
    width: 32px; height: 32px;
    background: none; border: none; cursor: pointer;
    font-size: 1.1rem; color: var(--brand-red);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .qty-btn:hover { background: #fdf0e8; }
  .qty-value { width: 28px; text-align: center; font-family: var(--font-heading); font-size: 0.95rem; }
  .panier-remove {
    background: none; border: none; cursor: pointer;
    color: #ccc; transition: color 0.2s; display: flex; align-items: center;
  }
  .panier-remove:hover { color: var(--brand-red); }

  /* ── Récap sidebar ── */
  .panier-recap {
    background: #fff;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.07);
    position: sticky;
    top: 100px;
  }
  .panier-recap h3 {
    font-family: var(--font-heading);
    font-size: 1.3rem;
    color: var(--text-dark);
    margin-bottom: 1.4rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f0e0d0;
  }
  .recap-line {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.45rem 0; font-size: 0.88rem; color: #666;
  }
  .recap-line.total {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    color: var(--text-dark);
    border-top: 2px solid #f0e0d0;
    margin-top: 0.8rem;
    padding-top: 1rem;
  }
  .recap-line.total span:last-child { color: var(--brand-red); }
  .btn-order {
    width: 100%;
    background: var(--brand-red); color: #fff;
    border: none; border-radius: 50px;
    padding: 0.9rem 1.2rem;
    font-family: var(--font-heading); font-size: 1rem; letter-spacing: 0.5px;
    cursor: pointer; margin-top: 1.4rem;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: background 0.2s, transform 0.2s;
  }
  .btn-order:hover:not(:disabled) { background: #c01010; transform: translateY(-2px); }
  .btn-order:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-continue, .btn-back {
    background: none; border: 2px solid #e8d8c8; border-radius: 50px;
    padding: 0.7rem 1.2rem;
    font-family: var(--font-heading); font-size: 0.88rem;
    color: #888; cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-continue { width: 100%; margin-top: 0.8rem; }
  .btn-back { display: inline-block; }
  .btn-continue:hover, .btn-back:hover { border-color: var(--brand-red); color: var(--brand-red); }

  /* ── Mode selector ── */
  .mode-selector { padding: 1rem 0; }
  .mode-intro {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    color: var(--text-dark);
    margin-bottom: 1.5rem;
    letter-spacing: 0.5px;
  }
  .mode-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-bottom: 2rem;
  }
  @media (max-width: 600px) {
    .mode-grid { grid-template-columns: 1fr; }
  }
  .mode-card {
    background: #fff;
    border: 2px solid #f0e0d0;
    border-radius: 20px;
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    display: flex; flex-direction: column; align-items: center; gap: 0.8rem;
  }
  .mode-card:hover { border-color: var(--mode-color, var(--brand-red)); transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
  .mode-card.active { border-color: var(--mode-color, var(--brand-red)); background: #fff9f5; box-shadow: 0 0 0 4px color-mix(in srgb, var(--mode-color, var(--brand-red)) 15%, transparent); }
  .mode-icon { color: var(--mode-color, var(--brand-red)); }
  .mode-label { font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-dark); }
  .mode-desc { font-size: 0.82rem; color: #888; line-height: 1.5; }

  /* ── Formulaire commande ── */
  .form-header h3 {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    color: var(--text-dark);
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0e0d0;
  }
  .order-form { background: #fff; border-radius: 20px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-bottom: 1.5rem; }
  .order-form-info {
    display: flex; gap: 1rem; align-items: flex-start;
    background: #f5f0e8; border-radius: 12px; padding: 1rem 1.2rem;
    margin-bottom: 1.5rem; font-size: 0.85rem;
  }
  .order-form-info svg { flex-shrink: 0; color: var(--brand-red); margin-top: 2px; }
  .order-form-info div { display: flex; flex-direction: column; gap: 0.2rem; }
  .order-form-info strong { font-family: var(--font-heading); font-size: 0.9rem; color: var(--text-dark); }
  .order-form-info span { color: #666; }
  .form-row-order { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 520px) { .form-row-order { grid-template-columns: 1fr; } }
  .form-field { margin-bottom: 1rem; }
  .form-field label {
    display: block;
    font-family: var(--font-heading); font-size: 0.78rem;
    color: var(--brand-red); letter-spacing: 0.5px; margin-bottom: 0.4rem;
  }
  .form-field input, .form-field select, .form-field textarea {
    width: 100%; padding: 0.75rem 1rem;
    border: 2px solid #e8d8c8; border-radius: 12px;
    font-family: var(--font-body); font-size: 0.9rem;
    background: #fdfaf5; outline: none;
    transition: border-color 0.2s;
  }
  .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: var(--brand-red); background: #fff; }
  .form-field textarea { resize: vertical; }

  /* ── Navigation entre étapes ── */
  .step-nav {
    display: flex; justify-content: space-between; align-items: center;
    gap: 1rem; flex-wrap: wrap;
  }

  /* ── Badge mode sélectionné (recap) ── */
  .confirm-mode-badge {
    display: flex; align-items: center; gap: 0.8rem;
    background: #f5f0e8; border-radius: 12px;
    padding: 0.9rem 1.2rem; margin-bottom: 1rem;
    font-family: var(--font-heading); font-size: 0.9rem;
    color: var(--text-dark);
  }
  .confirm-mode-badge span { flex: 1; }
  .edit-link {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-heading); font-size: 0.8rem;
    color: var(--brand-red); text-decoration: underline;
  }

  /* ── Panier vide ── */
  .panier-empty {
    grid-column: 1 / -1; text-align: center; padding: 5rem 0;
  }
  .panier-empty .icon { font-size: 5rem; margin-bottom: 1.5rem; }
  .panier-empty h2 { font-family: var(--font-heading); font-size: 2rem; color: var(--brand-red); margin-bottom: 0.8rem; }
  .panier-empty p { color: #888; margin-bottom: 2rem; }

  /* ── Confirmation finale ── */
  .panier-confirmed { text-align: center; padding: 4rem 5%; max-width: 520px; margin: 0 auto; }
  .confirmed-icon { font-size: 5rem; margin-bottom: 1.5rem; }
  .panier-confirmed h2 { font-family: var(--font-heading); font-size: 2.2rem; color: #2d7a40; margin-bottom: 1.5rem; }
  .confirmed-details {
    background: #f5f0e8; border-radius: 16px;
    padding: 1.5rem; margin-bottom: 1.5rem;
    text-align: left; font-size: 0.9rem; color: #555;
    display: flex; flex-direction: column; gap: 0.5rem;
  }
  .confirmed-details strong { color: var(--brand-red); font-family: var(--font-heading); }
  .confirmed-sub { color: #aaa; font-size: 0.85rem; }
`
