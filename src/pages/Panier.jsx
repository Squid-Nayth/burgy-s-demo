import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Panier() {
  const { items, removeItem, updateQty, clearCart, totalPrice, formatPrice } = useCart()
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(false)

  const handleOrder = () => {
    setConfirmed(true)
    clearCart()
    setTimeout(() => navigate('/'), 3000)
  }

  return (
    <>
      <style>{`
        .panier-page {
          padding-top: 110px;
          min-height: 100vh;
          background: #fdfaf5;
        }
        .panier-header {
          background: var(--brand-red);
          padding: 3rem 5% 2.5rem;
          color: #fff;
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

        .panier-body {
          max-width: 1000px;
          margin: 0 auto;
          padding: 3rem 5% 6rem;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 760px) {
          .panier-body { grid-template-columns: 1fr; }
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
          overflow: hidden;
          flex-shrink: 0;
        }
        .panier-item-img img {
          width: 100%; height: 100%;
          object-fit: contain;
          padding: 6px;
        }

        .panier-item-info h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--text-dark);
          margin-bottom: 0.3rem;
          line-height: 1.2;
        }
        .panier-item-price {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          color: var(--brand-red);
        }

        .panier-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.7rem;
        }
        .panier-item-total {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: var(--text-dark);
          white-space: nowrap;
        }

        .qty-control {
          display: flex;
          align-items: center;
          border: 2px solid #f0e0d0;
          border-radius: 50px;
          overflow: hidden;
        }
        .qty-btn {
          width: 32px; height: 32px;
          background: none; border: none; cursor: pointer;
          font-size: 1.1rem;
          color: var(--brand-red);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .qty-btn:hover { background: #fdf0e8; }
        .qty-value {
          width: 28px; text-align: center;
          font-family: var(--font-heading);
          font-size: 0.95rem;
        }

        .panier-remove {
          background: none; border: none; cursor: pointer;
          color: #ccc; transition: color 0.2s;
          display: flex; align-items: center;
        }
        .panier-remove:hover { color: var(--brand-red); }

        /* ── Récap commande ── */
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
          font-size: 1.4rem;
          color: var(--text-dark);
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0e0d0;
        }
        .recap-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          font-size: 0.9rem;
          color: #666;
        }
        .recap-line.total {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          color: var(--text-dark);
          border-top: 2px solid #f0e0d0;
          margin-top: 0.8rem;
          padding-top: 1rem;
        }
        .recap-line.total span:last-child { color: var(--brand-red); }

        .btn-order {
          width: 100%;
          background: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 1rem;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          margin-top: 1.5rem;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-order:hover { background: #c01010; transform: translateY(-2px); }

        .btn-continue {
          width: 100%;
          background: none;
          color: #888;
          border: 2px solid #e8d8c8;
          border-radius: 50px;
          padding: 0.75rem;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          cursor: pointer;
          margin-top: 0.8rem;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-continue:hover { border-color: var(--brand-red); color: var(--brand-red); }

        /* ── Panier vide ── */
        .panier-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem 0;
        }
        .panier-empty .icon { font-size: 5rem; margin-bottom: 1.5rem; }
        .panier-empty h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--brand-red);
          margin-bottom: 0.8rem;
        }
        .panier-empty p { color: #888; margin-bottom: 2rem; }

        /* ── Confirmation ── */
        .panier-confirmed {
          text-align: center;
          padding: 5rem 5%;
          max-width: 600px;
          margin: 0 auto;
        }
        .panier-confirmed .icon { font-size: 5rem; margin-bottom: 1.5rem; }
        .panier-confirmed h2 {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          color: #2d7a40;
          margin-bottom: 1rem;
        }
        .panier-confirmed p { color: #555; line-height: 1.8; }
      `}</style>

      <div className="panier-page">
        <div className="panier-header">
          <h1>MON PANIER</h1>
          <p>{confirmed ? '' : `${items.reduce((s, i) => s + i.qty, 0)} ARTICLE${items.reduce((s, i) => s + i.qty, 0) > 1 ? 'S' : ''}`}</p>
        </div>

        {confirmed ? (
          <div className="panier-confirmed">
            <div className="icon">🎉</div>
            <h2>COMMANDE CONFIRMÉE !</h2>
            <p>Merci pour votre commande. Nous préparons vos burgers avec amour.<br />Vous allez être redirigé vers l'accueil dans quelques secondes.</p>
          </div>
        ) : (
          <div className="panier-body">
            {items.length === 0 ? (
              <div className="panier-empty">
                <div className="icon">🛒</div>
                <h2>PANIER VIDE</h2>
                <p>Vous n'avez pas encore ajouté de produits à votre panier.</p>
                <Link to="/nos-produits" className="btn-primary">VOIR LA CARTE</Link>
              </div>
            ) : (
              <>
                {/* Liste articles */}
                <div className="panier-list">
                  {items.map(item => {
                    const unitPrice = parseInt(item.price.replace(/\s/g, '').replace('CFA', ''), 10) || 0
                    const lineTotal = unitPrice * item.qty
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
                            {lineTotal.toLocaleString('fr-FR').replace(',', ' ')} CFA
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

                {/* Récap */}
                <div className="panier-recap">
                  <h3>RÉCAPITULATIF</h3>
                  {items.map(item => {
                    const unitPrice = parseInt(item.price.replace(/\s/g, '').replace('CFA', ''), 10) || 0
                    return (
                      <div className="recap-line" key={item.key}>
                        <span>{item.name} ×{item.qty}</span>
                        <span>{(unitPrice * item.qty).toLocaleString('fr-FR').replace(',', ' ')} CFA</span>
                      </div>
                    )
                  })}
                  <div className="recap-line total">
                    <span>TOTAL</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <button className="btn-order" onClick={handleOrder}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    COMMANDER
                  </button>
                  <button className="btn-continue" onClick={() => navigate('/nos-produits')}>
                    CONTINUER MES ACHATS
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
