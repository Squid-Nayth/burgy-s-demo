import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const METHODS = [
  { id: 'card',   label: 'Carte bancaire',  sub: 'Visa, Mastercard',       color: '#1a1a2e', icon: '💳', logos: ['VISA','MC'] },
  { id: 'paypal', label: 'PayPal',          sub: 'Paiement rapide',         color: '#003087', icon: '🅿️', logos: ['PayPal'] },
  { id: 'airtel', label: 'Airtel Money',    sub: 'Mobile Airtel Gabon',     color: '#e40000', icon: '📱', logos: ['Airtel'] },
  { id: 'moov',   label: 'Moov Money',      sub: 'Mobile Moov Africa',      color: '#0066cc', icon: '📲', logos: ['Moov'] },
]

// ─── Formulaires ─────────────────────────────────────────────────────────────

function CardForm({ data, onChange }) {
  return (
    <div className="pay-form">
      <div className="pay-field">
        <label>NUMÉRO DE CARTE</label>
        <input type="text" placeholder="1234 5678 9012 3456" maxLength={19}
          value={data.number || ''}
          onChange={e => {
            const v = e.target.value.replace(/\D/g, '').slice(0, 16)
            onChange({ ...data, number: v.replace(/(.{4})/g, '$1 ').trim() })
          }}
        />
      </div>
      <div className="pay-field">
        <label>NOM SUR LA CARTE</label>
        <input type="text" placeholder="JEAN MARTIN" value={data.name || ''}
          onChange={e => onChange({ ...data, name: e.target.value.toUpperCase() })} />
      </div>
      <div className="pay-row">
        <div className="pay-field">
          <label>EXPIRATION</label>
          <input type="text" placeholder="MM/AA" maxLength={5} value={data.expiry || ''}
            onChange={e => {
              let v = e.target.value.replace(/\D/g, '').slice(0, 4)
              if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2)
              onChange({ ...data, expiry: v })
            }}
          />
        </div>
        <div className="pay-field">
          <label>CVV</label>
          <input type="text" placeholder="•••" maxLength={4} value={data.cvv || ''}
            onChange={e => onChange({ ...data, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
        </div>
      </div>
    </div>
  )
}

function PaypalForm({ data, onChange }) {
  return (
    <div className="pay-form">
      <div className="paypal-info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Vous serez redirigé vers PayPal pour finaliser en toute sécurité.
      </div>
      <div className="pay-field">
        <label>EMAIL PAYPAL</label>
        <input type="email" placeholder="votre@paypal.com" value={data.email || ''}
          onChange={e => onChange({ ...data, email: e.target.value })} />
      </div>
    </div>
  )
}

function MobileForm({ operator, data, onChange }) {
  const label = operator === 'airtel' ? 'Airtel Money' : 'Moov Money'
  const prefix = operator === 'airtel' ? '077 / 074' : '062 / 065'
  return (
    <div className="pay-form">
      <div className="paypal-info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Vous recevrez une notification {label} pour confirmer.
      </div>
      <div className="pay-field">
        <label>NUMÉRO {label.toUpperCase()}</label>
        <input type="tel" placeholder={`+241 ${prefix} ...`} value={data.phone || ''}
          onChange={e => onChange({ ...data, phone: e.target.value })} />
      </div>
      <div className="pay-field">
        <label>NOM DU TITULAIRE</label>
        <input type="text" placeholder="Nom associé au compte" value={data.holder || ''}
          onChange={e => onChange({ ...data, holder: e.target.value })} />
      </div>
    </div>
  )
}

function isValid(type, data) {
  if (!type) return false
  if (type === 'card')   return data.number?.length >= 19 && data.name?.trim() && data.expiry?.length === 5 && data.cvv?.length >= 3
  if (type === 'paypal') return data.email?.includes('@')
  return data.phone?.trim().length >= 8 && data.holder?.trim()
}

// ─── Sélecteur de livraison enregistrée ──────────────────────────────────────

function SavedAddressSelector({ addresses, selectedId, onSelect }) {
  if (!addresses?.length) return null
  return (
    <div className="saved-section">
      <div className="saved-title">ADRESSES ENREGISTRÉES</div>
      {addresses.map(a => (
        <button key={a.id} className={`saved-card ${selectedId === a.id ? 'active' : ''}`} onClick={() => onSelect(selectedId === a.id ? null : a.id)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <div className="saved-card-info">
            <strong>{a.label}</strong>
            <span>{a.address}</span>
          </div>
          {selectedId === a.id && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
        </button>
      ))}
      <div className="saved-or">ou entrer une nouvelle adresse</div>
    </div>
  )
}

// ─── Sélecteur de moyen de paiement enregistré ───────────────────────────────

function SavedPaymentSelector({ paymentMethods, selectedId, onSelect }) {
  if (!paymentMethods?.length) return null
  const icons = { card: '💳', paypal: '🅿️', airtel: '📱', moov: '📲' }
  return (
    <div className="saved-section">
      <div className="saved-title">MOYENS DE PAIEMENT ENREGISTRÉS</div>
      {paymentMethods.map(pm => (
        <button key={pm.id} className={`saved-card ${selectedId === pm.id ? 'active' : ''}`} onClick={() => onSelect(selectedId === pm.id ? null : pm.id)}>
          <span style={{ fontSize: '1.2rem' }}>{icons[pm.icon] || '💳'}</span>
          <div className="saved-card-info">
            <strong>{pm.label}</strong>
          </div>
          {selectedId === pm.id && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
        </button>
      ))}
      <div className="saved-or">ou utiliser un nouveau moyen de paiement</div>
    </div>
  )
}

// ─── Prompt enregistrement ────────────────────────────────────────────────────

function SavePrompt({ label, onYes, onNo }) {
  return (
    <div className="save-prompt">
      <div className="save-prompt-text">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        Enregistrer <strong>{label}</strong> dans votre compte ?
      </div>
      <div className="save-prompt-btns">
        <button className="save-yes" onClick={onYes}>OUI</button>
        <button className="save-no" onClick={onNo}>NON MERCI</button>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Paiement() {
  const { items, totalPrice, formatPrice, clearCart, orderType, orderDetails } = useCart()
  const { user, addOrder, addPaymentMethod, addAddress } = useAuth()
  const navigate = useNavigate()

  // Paiement
  const [selectedSavedPayment, setSelectedSavedPayment] = useState(null)
  const [newPayMethod, setNewPayMethod] = useState(null)   // type id
  const [formData, setFormData] = useState({})
  const [askSavePayment, setAskSavePayment] = useState(false)

  // Adresse (livraison uniquement)
  const [selectedSavedAddr, setSelectedSavedAddr] = useState(null)
  const [newAddrForm, setNewAddrForm] = useState({ address: '', zone: '' })
  const [askSaveAddr, setAskSaveAddr] = useState(false)

  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)
  const [usedPaymentLabel, setUsedPaymentLabel] = useState('')

  const deliveryFee = orderType === 'livraison' ? 1000 : 0
  const totalWithFee = totalPrice + deliveryFee
  const modeLabels = { emporter: '🛍️ À emporter', table: '🍽️ Sur table', livraison: '🛵 Livraison' }

  // Moyen de paiement effectivement utilisé
  const savedPM = user?.paymentMethods?.find(p => p.id === selectedSavedPayment)
  const payReady = savedPM
    ? true
    : newPayMethod && isValid(newPayMethod, formData)

  // Adresse effectivement utilisée (livraison uniquement)
  const savedAddr = user?.addresses?.find(a => a.id === selectedSavedAddr)
  const addrReady = orderType !== 'livraison' || savedAddr || (newAddrForm.address?.trim() && newAddrForm.zone?.trim())

  if (!orderType && !done) return (
    <>
      <style>{css}</style>
      <div className="pay-page">
        <div className="pay-hero"><h1>PAIEMENT</h1></div>
        <div style={{ textAlign: 'center', padding: '5rem 5%' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-red)', marginBottom: '1rem' }}>AUCUNE COMMANDE EN COURS</h2>
          <Link to="/panier" className="btn-primary">RETOUR AU PANIER</Link>
        </div>
      </div>
    </>
  )

  const handlePay = () => {
    // Détermine l'adresse finale pour livraison
    const finalAddr = savedAddr
      ? { adresse: savedAddr.address, zone: savedAddr.label }
      : orderType === 'livraison' ? { adresse: newAddrForm.address, zone: newAddrForm.zone } : {}

    const finalModeDetails = { ...orderDetails, ...finalAddr }

    // Label du moyen utilisé
    const pmLabel = savedPM
      ? savedPM.label
      : METHODS.find(m => m.id === newPayMethod)?.label || newPayMethod

    setUsedPaymentLabel(pmLabel)

    // Demande si on veut sauvegarder avant de continuer ?
    // Si adresse non enregistrée et mode livraison
    const shouldAskAddr = orderType === 'livraison' && !savedAddr && newAddrForm.address?.trim()
    // Si moyen de paiement non enregistré
    const shouldAskPay = !savedPM && newPayMethod

    if (shouldAskAddr || shouldAskPay) {
      if (shouldAskAddr) setAskSaveAddr(true)
      if (shouldAskPay) setAskSavePayment(true)
      return
    }

    doPayment(finalModeDetails, pmLabel)
  }

  const doPayment = (finalModeDetails, pmLabel) => {
    setProcessing(true)
    setTimeout(() => {
      addOrder({
        items: items.map(i => ({ name: i.name, price: i.price, qty: i.qty, img: i.img })),
        total: formatPrice(totalWithFee),
        totalAmount: totalWithFee,
        mode: orderType,
        modeDetails: finalModeDetails || orderDetails,
        paymentMethod: pmLabel || usedPaymentLabel,
      })
      clearCart()
      setProcessing(false)
      setDone(true)
    }, 2200)
  }

  const handleSaveAnswered = () => {
    // Les deux prompts ont été répondus, on procède
    const finalAddr = savedAddr
      ? { adresse: savedAddr.address, zone: savedAddr.label }
      : orderType === 'livraison' ? { adresse: newAddrForm.address, zone: newAddrForm.zone } : {}
    const finalModeDetails = { ...orderDetails, ...finalAddr }
    const pmLabel = savedPM
      ? savedPM.label
      : METHODS.find(m => m.id === newPayMethod)?.label || newPayMethod
    doPayment(finalModeDetails, pmLabel || usedPaymentLabel)
  }

  // ── Écran succès ──
  if (done) return (
    <>
      <style>{css}</style>
      <div>
        <div className="pay-hero" style={{ background: '#2d7a40' }}>
          <h1>PAIEMENT CONFIRMÉ !</h1>
          <p>VOTRE COMMANDE EST EN COURS DE PRÉPARATION</p>
        </div>
        <div className="pay-success">
          <div className="success-icon">🎉</div>
          <h2>Merci pour votre commande !</h2>
          <div className="success-details">
            <div className="success-row"><span>Mode</span><strong>{modeLabels[orderType]}</strong></div>
            {orderDetails?.nom     && <div className="success-row"><span>Nom</span><strong>{orderDetails.nom}</strong></div>}
            {orderDetails?.table   && <div className="success-row"><span>Table</span><strong>{orderDetails.table}</strong></div>}
            {orderDetails?.adresse && <div className="success-row"><span>Livraison</span><strong>{orderDetails.adresse}</strong></div>}
            <div className="success-row"><span>Total</span><strong style={{ color: 'var(--brand-red)' }}>{formatPrice(totalWithFee)}</strong></div>
            <div className="success-row"><span>Paiement</span><strong>{usedPaymentLabel}</strong></div>
          </div>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Temps de préparation estimé : <strong>15–20 min</strong>
          </p>
          <button className="btn-order" style={{ maxWidth: 280, margin: '0 auto' }} onClick={() => navigate('/')}>
            RETOUR À L'ACCUEIL
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{css}</style>
      <div>
        <div className="pay-hero">
          <h1>PAIEMENT</h1>
          <p>SÉCURISÉ • RAPIDE • FIABLE</p>
        </div>

        <div className="pay-body">
          {/* ── Colonne gauche ── */}
          <div className="pay-left">

            {/* Adresse de livraison si mode livraison */}
            {orderType === 'livraison' && (
              <div className="pay-block">
                <h3 className="pay-section-title">ADRESSE DE LIVRAISON</h3>
                <SavedAddressSelector
                  addresses={user?.addresses}
                  selectedId={selectedSavedAddr}
                  onSelect={id => { setSelectedSavedAddr(id); if (id) setNewAddrForm({ address: '', zone: '' }) }}
                />
                {!selectedSavedAddr && (
                  <div className="pay-form">
                    <div className="pay-field">
                      <label>ADRESSE COMPLÈTE *</label>
                      <input placeholder="Quartier, rue, repère…" value={newAddrForm.address}
                        onChange={e => setNewAddrForm(p => ({ ...p, address: e.target.value }))} />
                    </div>
                    <div className="pay-field">
                      <label>QUARTIER *</label>
                      <select value={newAddrForm.zone} onChange={e => setNewAddrForm(p => ({ ...p, zone: e.target.value }))}>
                        <option value="">Choisir le quartier</option>
                        {['Glass','Montagne Sainte','Louis','Nombakélé','Léon MBA','Sotega'].map(z => <option key={z}>{z}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {/* Prompt sauvegarde adresse */}
                {askSaveAddr && !selectedSavedAddr && (
                  <SavePrompt
                    label={newAddrForm.address}
                    onYes={() => {
                      addAddress({ label: newAddrForm.zone, address: newAddrForm.address })
                      setAskSaveAddr(false)
                      if (!askSavePayment) handleSaveAnswered()
                    }}
                    onNo={() => {
                      setAskSaveAddr(false)
                      if (!askSavePayment) handleSaveAnswered()
                    }}
                  />
                )}
              </div>
            )}

            {/* Moyen de paiement */}
            <div className="pay-block">
              <h3 className="pay-section-title">MODE DE PAIEMENT</h3>

              <SavedPaymentSelector
                paymentMethods={user?.paymentMethods}
                selectedId={selectedSavedPayment}
                onSelect={id => { setSelectedSavedPayment(id); if (id) { setNewPayMethod(null); setFormData({}) } }}
              />

              {!selectedSavedPayment && (
                <>
                  {/* Sélecteur de type */}
                  <div className="pay-methods">
                    {METHODS.map(m => (
                      <button
                        key={m.id}
                        className={`pay-method-card ${newPayMethod === m.id ? 'active' : ''}`}
                        style={{ '--pay-color': m.color }}
                        onClick={() => { setNewPayMethod(m.id); setFormData({}) }}
                      >
                        <div className="pay-method-icon">{m.icon}</div>
                        <div className="pay-method-info">
                          <strong>{m.label}</strong>
                          <span>{m.sub}</span>
                        </div>
                        <div className="pay-method-logos">
                          {m.logos.map(l => <span key={l} className="pay-logo-badge">{l}</span>)}
                        </div>
                        <div className="pay-method-radio">
                          {newPayMethod === m.id
                            ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                          }
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Formulaire */}
                  {newPayMethod && (
                    <div style={{ marginTop: '1.2rem' }}>
                      {newPayMethod === 'card'   && <CardForm data={formData} onChange={setFormData} />}
                      {newPayMethod === 'paypal' && <PaypalForm data={formData} onChange={setFormData} />}
                      {(newPayMethod === 'airtel' || newPayMethod === 'moov') && <MobileForm operator={newPayMethod} data={formData} onChange={setFormData} />}
                    </div>
                  )}

                  {/* Prompt sauvegarde paiement */}
                  {askSavePayment && newPayMethod && (
                    <SavePrompt
                      label={METHODS.find(m => m.id === newPayMethod)?.label}
                      onYes={() => {
                        addPaymentMethod({
                          type: newPayMethod,
                          label: newPayMethod === 'card'
                            ? `Visa/MC •••• ${formData.number?.replace(/\s/g,'').slice(-4)}`
                            : newPayMethod === 'paypal'
                            ? `PayPal — ${formData.email}`
                            : `${newPayMethod === 'airtel' ? 'Airtel' : 'Moov'} — ${formData.phone}`,
                          icon: newPayMethod,
                          details: { ...formData },
                        })
                        setAskSavePayment(false)
                        if (!askSaveAddr) handleSaveAnswered()
                      }}
                      onNo={() => {
                        setAskSavePayment(false)
                        if (!askSaveAddr) handleSaveAnswered()
                      }}
                    />
                  )}
                </>
              )}
            </div>

            <div className="pay-security">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Paiement 100% sécurisé — données chiffrées
            </div>
          </div>

          {/* ── Récap ── */}
          <div className="pay-recap">
            <h3>VOTRE COMMANDE</h3>
            <div className="pay-mode-badge">
              {modeLabels[orderType]}
              {orderDetails?.nom   && <span> · {orderDetails.nom}</span>}
              {orderDetails?.table && <span> · {orderDetails.table}</span>}
            </div>
            <div className="pay-items">
              {items.map(item => {
                const u = parseInt(item.price.replace(/\s/g, '').replace('CFA', ''), 10) || 0
                return (
                  <div className="pay-item" key={item.key}>
                    <div className="pay-item-img"><img src={item.img} alt={item.name} /></div>
                    <div className="pay-item-info">
                      <span className="pay-item-name">{item.name}</span>
                      <span className="pay-item-qty">×{item.qty}</span>
                    </div>
                    <span className="pay-item-total">{(u * item.qty).toLocaleString('fr-FR').replace(',', ' ')} CFA</span>
                  </div>
                )
              })}
            </div>
            <div className="pay-totals">
              <div className="pay-total-line"><span>Sous-total</span><span>{formatPrice(totalPrice)}</span></div>
              {deliveryFee > 0 && <div className="pay-total-line"><span>Livraison</span><span>{deliveryFee.toLocaleString('fr-FR')} CFA</span></div>}
              <div className="pay-total-line grand"><span>TOTAL</span><span>{formatPrice(totalWithFee)}</span></div>
            </div>
            <button
              className="btn-order"
              disabled={!payReady || !addrReady || processing || askSavePayment || askSaveAddr}
              onClick={handlePay}
            >
              {processing
                ? <><span className="pay-spinner" /> TRAITEMENT…</>
                : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> PAYER {formatPrice(totalWithFee)}</>
              }
            </button>
            <Link to="/panier" className="pay-back-link">← Modifier la commande</Link>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
  .pay-page { padding-top: 110px; min-height: 100vh; background: #fdfaf5; }
  .pay-hero { background: var(--brand-red); padding: 110px 5% 3rem; color: #fff; }
  .pay-hero h1 { font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1; }
  .pay-hero p { font-family: var(--font-heading); opacity: 0.75; letter-spacing: 2px; margin-top: 0.4rem; font-size: 0.85rem; }

  .pay-body { max-width: 1020px; margin: 0 auto; padding: 3rem 5% 6rem; display: grid; grid-template-columns: 1fr 320px; gap: 2.5rem; align-items: start; }
  @media (max-width: 760px) { .pay-body { grid-template-columns: 1fr; } .pay-recap { position: static; } }

  .pay-block { margin-bottom: 2rem; }
  .pay-section-title { font-family: var(--font-heading); font-size: 0.95rem; color: var(--text-dark); letter-spacing: 0.5px; margin-bottom: 1rem; }

  /* Moyens / adresses sauvegardés */
  .saved-section { margin-bottom: 1rem; }
  .saved-title { font-family: var(--font-heading); font-size: 0.72rem; color: #aaa; letter-spacing: 1px; margin-bottom: 0.6rem; }
  .saved-card {
    width: 100%; display: flex; align-items: center; gap: 0.8rem;
    background: #fff; border: 2px solid #f0e0d0; border-radius: 12px;
    padding: 0.75rem 1rem; margin-bottom: 0.5rem; cursor: pointer;
    text-align: left; transition: border-color 0.2s;
  }
  .saved-card:hover { border-color: #e8c8b0; }
  .saved-card.active { border-color: var(--brand-red); background: #fff8f5; }
  .saved-card-info { flex: 1; }
  .saved-card-info strong { display: block; font-family: var(--font-heading); font-size: 0.88rem; color: var(--text-dark); }
  .saved-card-info span { font-size: 0.78rem; color: #aaa; }
  .saved-or { font-size: 0.78rem; color: #bbb; text-align: center; margin: 0.8rem 0 1rem; font-family: var(--font-heading); letter-spacing: 0.5px; }

  /* Méthodes de paiement */
  .pay-methods { display: flex; flex-direction: column; gap: 0.7rem; }
  .pay-method-card {
    display: grid; grid-template-columns: 42px 1fr auto auto;
    gap: 0.9rem; align-items: center;
    background: #fff; border: 2px solid #f0e0d0; border-radius: 14px;
    padding: 0.9rem 1.1rem; cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
    text-align: left;
  }
  .pay-method-card:hover { border-color: var(--pay-color, var(--brand-red)); transform: translateX(3px); }
  .pay-method-card.active { border-color: var(--pay-color, var(--brand-red)); background: #fffaf7; }
  .pay-method-icon { font-size: 1.4rem; display: flex; align-items: center; justify-content: center; }
  .pay-method-info { display: flex; flex-direction: column; gap: 0.15rem; }
  .pay-method-info strong { font-family: var(--font-heading); font-size: 0.88rem; color: var(--text-dark); }
  .pay-method-info span { font-size: 0.75rem; color: #aaa; }
  .pay-method-logos { display: flex; gap: 0.3rem; flex-wrap: wrap; }
  .pay-logo-badge { font-family: var(--font-heading); font-size: 0.62rem; background: #f5f0e8; color: #555; padding: 2px 7px; border-radius: 5px; }
  .pay-method-radio { color: var(--pay-color, var(--brand-red)); }
  @media (max-width: 480px) { .pay-method-card { grid-template-columns: 36px 1fr auto; } .pay-method-logos { display: none; } }

  /* Formulaires */
  .pay-form { display: flex; flex-direction: column; gap: 0.9rem; background: #fff; border-radius: 14px; padding: 1.4rem; box-shadow: 0 3px 14px rgba(0,0,0,0.05); }
  .pay-field label { display: block; font-family: var(--font-heading); font-size: 0.72rem; color: var(--brand-red); letter-spacing: 0.5px; margin-bottom: 0.35rem; }
  .pay-field input, .pay-field select { width: 100%; padding: 0.7rem 0.9rem; border: 2px solid #e8d8c8; border-radius: 10px; font-family: var(--font-body); font-size: 0.88rem; background: #fdfaf5; outline: none; transition: border-color 0.2s; }
  .pay-field input:focus, .pay-field select:focus { border-color: var(--brand-red); background: #fff; }
  .pay-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
  .paypal-info { display: flex; align-items: flex-start; gap: 0.6rem; background: #eef3ff; border-radius: 8px; padding: 0.75rem 0.9rem; font-size: 0.82rem; color: #334; }
  .paypal-info svg { flex-shrink: 0; color: #003087; }

  /* Prompt sauvegarde */
  .save-prompt {
    display: flex; flex-direction: column; gap: 0.8rem;
    background: #fffbef; border: 2px solid var(--brand-yellow);
    border-radius: 12px; padding: 1rem 1.2rem; margin-top: 1rem;
  }
  .save-prompt-text { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #555; }
  .save-prompt-text svg { flex-shrink: 0; color: var(--brand-yellow); }
  .save-prompt-btns { display: flex; gap: 0.6rem; }
  .save-yes { background: var(--brand-red); color: #fff; border: none; border-radius: 20px; padding: 0.45rem 1.2rem; font-family: var(--font-heading); font-size: 0.82rem; cursor: pointer; transition: background 0.2s; }
  .save-yes:hover { background: #c01010; }
  .save-no { background: none; border: 2px solid #f0e0d0; border-radius: 20px; padding: 0.45rem 1rem; font-family: var(--font-heading); font-size: 0.82rem; color: #aaa; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
  .save-no:hover { border-color: #bbb; color: #777; }

  /* Sécurité */
  .pay-security { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #bbb; margin-top: 1.5rem; }
  .pay-security svg { color: #2d7a40; }

  /* Récap */
  .pay-recap { background: #fff; border-radius: 22px; padding: 1.8rem; box-shadow: 0 8px 32px rgba(0,0,0,0.07); position: sticky; top: 100px; }
  .pay-recap h3 { font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-dark); margin-bottom: 1.1rem; padding-bottom: 0.8rem; border-bottom: 2px solid #f0e0d0; }
  .pay-mode-badge { background: #f5f0e8; border-radius: 10px; padding: 0.6rem 0.9rem; font-family: var(--font-heading); font-size: 0.8rem; color: var(--text-dark); margin-bottom: 1rem; }
  .pay-items { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 1rem; }
  .pay-item { display: flex; align-items: center; gap: 0.7rem; }
  .pay-item-img { width: 40px; height: 40px; border-radius: 8px; background: #f5f0e8; overflow: hidden; flex-shrink: 0; }
  .pay-item-img img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
  .pay-item-info { flex: 1; display: flex; flex-direction: column; }
  .pay-item-name { font-family: var(--font-heading); font-size: 0.8rem; color: var(--text-dark); line-height: 1.3; }
  .pay-item-qty { font-size: 0.72rem; color: #aaa; }
  .pay-item-total { font-family: var(--font-heading); font-size: 0.85rem; white-space: nowrap; }
  .pay-totals { border-top: 1px solid #f0e0d0; padding-top: 0.8rem; margin-bottom: 1.2rem; }
  .pay-total-line { display: flex; justify-content: space-between; padding: 0.32rem 0; font-size: 0.83rem; color: #666; }
  .pay-total-line.grand { font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-dark); border-top: 2px solid #f0e0d0; margin-top: 0.5rem; padding-top: 0.8rem; }
  .pay-total-line.grand span:last-child { color: var(--brand-red); }

  .btn-order { width: 100%; background: var(--brand-red); color: #fff; border: none; border-radius: 50px; padding: 0.85rem 1.2rem; font-family: var(--font-heading); font-size: 0.95rem; letter-spacing: 0.5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: background 0.2s, transform 0.2s; }
  .btn-order:hover:not(:disabled) { background: #c01010; transform: translateY(-2px); }
  .btn-order:disabled { opacity: 0.45; cursor: not-allowed; }
  .pay-back-link { display: block; text-align: center; margin-top: 0.8rem; font-family: var(--font-heading); font-size: 0.8rem; color: #bbb; text-decoration: none; transition: color 0.2s; }
  .pay-back-link:hover { color: var(--brand-red); }

  .pay-spinner { width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Succès */
  .pay-success { max-width: 500px; margin: 0 auto; text-align: center; padding: 4rem 5%; }
  .success-icon { font-size: 5rem; margin-bottom: 1.5rem; }
  .pay-success h2 { font-family: var(--font-heading); font-size: 2rem; color: #2d7a40; margin-bottom: 1.5rem; }
  .success-details { background: #f5f0e8; border-radius: 14px; padding: 1.4rem; margin-bottom: 1.5rem; text-align: left; display: flex; flex-direction: column; gap: 0.5rem; }
  .success-row { display: flex; justify-content: space-between; font-size: 0.87rem; color: #555; }
  .success-row strong { color: var(--text-dark); font-family: var(--font-heading); font-size: 0.88rem; }
`
