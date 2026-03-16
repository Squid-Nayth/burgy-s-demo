import { useParams, useNavigate, Link } from 'react-router-dom'

// ─── Données ────────────────────────────────────────────────────────────────

const tabs = [
  { id: 'burgers',   label: 'Nos Burgers',           img: '/logos/image-removebg-preview (3).png',        color: 'orange' },
  { id: 'menus',     label: 'Nos Menus',              img: '/logos/image-removebg-preview (1) copie.png',  color: '#e51c1d' },
  { id: 'frites',    label: 'Frites & Salades',       img: '/logos/image-removebg-preview (4) copie 2.png', color: '#f5a623' },
  { id: 'boissons',  label: 'Nos Boissons',           img: '/logos/image-removebg-preview (4).png',        color: '#1565c0' },
  { id: 'desserts',  label: 'Nos Desserts',           img: '/logos/image-removebg-preview (3) copie 3.png', color: '#7b1fa2' },
  { id: 'sucreries', label: 'Nos Sucreries',          img: '/logos/image-removebg-preview (3) copie 2.png', color: '#c2185b' },
  { id: 'sauces',    label: 'Nos Sauces',             img: '/logos/image-removebg-preview (4) copie 3.png', color: '#2e7d32' },
]

const burgers = [
  { slug: 'classique-smash', img: "/assets/Capture d'écran 2026-03-05 à 19.04.42.png", name: 'LE CLASSIQUE SMASHÉ', price: '4 500 CFA' },
  { slug: 'spicy-chicken',   img: "/assets/Capture d'écran 2026-03-05 à 19.04.54.png", name: 'LE SPICY CHICKEN',    price: '4 500 CFA' },
  { slug: 'big-burgy-xxl',   img: "/assets/Capture d'écran 2026-03-05 à 19.05.04.png", name: 'LE BIG BURGY XXL',   price: '6 500 CFA' },
]

// ─── Contenu par catégorie ───────────────────────────────────────────────────

function BurgersContent() {
  return (
    <div className="burger-grid">
      {burgers.map(b => (
        <Link to={`/nos-produits/burgers/${b.slug}`} className="burger-item" key={b.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="burger-image-container">
            <img src={b.img} alt={b.name} className="interactive-img" />
          </div>
          <h4>{b.name}</h4>
          <div className="price-tag">{b.price}</div>
        </Link>
      ))}
    </div>
  )
}

function ComingSoon() {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 5%' }}>
      <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</p>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--brand-red)', marginBottom: '1rem' }}>BIENTÔT DISPONIBLE</h3>
      <p style={{ opacity: 0.6 }}>Cette section est en cours de mise à jour. Revenez bientôt !</p>
    </div>
  )
}

const categoryContent = {
  burgers:   <BurgersContent />,
  menus:     <ComingSoon />,
  frites:    <ComingSoon />,
  boissons:  <ComingSoon />,
  desserts:  <ComingSoon />,
  sucreries: <ComingSoon />,
  sauces:    <ComingSoon />,
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NosProduits() {
  const { categorie = 'burgers' } = useParams()
  const navigate = useNavigate()
  const active = tabs.find(t => t.id === categorie) || tabs[0]

  return (
    <>
      <style>{`
        /* Header dynamique */
        .carte-hero {
          padding: 110px 5% 3rem;
          text-align: center;
          transition: background 0.4s ease;
        }
        .carte-hero h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: #fff;
          line-height: 1;
        }
        .carte-hero p {
          font-family: var(--font-heading);
          opacity: 0.8;
          letter-spacing: 2px;
          color: #fff;
          margin-top: 0.5rem;
        }

        /* Barre de tabs sticky */
        .carte-tabs-bar {
          position: sticky;
          top: 70px;
          z-index: 100;
          background: #fff;
          border-bottom: 2px solid #f0e0d0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .carte-tabs-bar::-webkit-scrollbar { display: none; }
        .carte-tabs-inner {
          display: flex;
          min-width: max-content;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .carte-tab {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 1.4rem;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          color: #777;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          text-transform: uppercase;
        }
        .carte-tab:hover { color: var(--brand-red); }
        .carte-tab.active {
          color: var(--brand-red);
          border-bottom-color: var(--brand-red);
        }
        .carte-tab img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
        }

        /* Zone de contenu */
        .carte-content {
          background: #fdfdfd;
          padding: 4rem 5%;
          min-height: 50vh;
        }
      `}</style>

      {/* Header dont la couleur change avec la catégorie */}
      <div className="carte-hero" style={{ background: active.color }}>
        <h1>NOTRE CARTE GOURMET</h1>
        <p>DU GOÛT. DU PLAISIR. LA QUALITÉ BURGY'S.</p>
      </div>

      {/* Barre de navigation par catégorie — sticky */}
      <div className="carte-tabs-bar">
        <div className="carte-tabs-inner">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`carte-tab ${categorie === tab.id ? 'active' : ''}`}
              onClick={() => navigate(`/nos-produits/${tab.id}`)}
            >
              <img src={tab.img} alt={tab.label} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu de la catégorie active */}
      <div className="carte-content">
        {categoryContent[categorie] || <ComingSoon />}
      </div>
    </>
  )
}
