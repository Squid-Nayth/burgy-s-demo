import { useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const tabs = [
  { id: 'burgers',   label: 'Nos Burgers',     img: '/logos/image-removebg-preview (3).png',         color: 'orange' },
  { id: 'menus',     label: 'Nos Menus',        img: '/logos/image-removebg-preview (1) copie.png',   color: '#e51c1d' },
  { id: 'frites',    label: 'Frites & Salades', img: '/logos/image-removebg-preview (4) copie 2.png', color: '#f5a623' },
  { id: 'boissons',  label: 'Nos Boissons',     img: '/logos/image-removebg-preview (4).png',         color: '#1565c0' },
  { id: 'desserts',  label: 'Nos Desserts',     img: '/logos/image-removebg-preview (3) copie 3.png', color: '#7b1fa2' },
  { id: 'sucreries', label: 'Nos Sucreries',    img: '/logos/image-removebg-preview (3) copie 2.png', color: '#c2185b' },
  { id: 'sauces',    label: 'Nos Sauces',       img: '/logos/image-removebg-preview (4) copie 3.png', color: '#2e7d32' },
]

// ─── Données ──────────────────────────────────────────────────────────────────

const IMG = {
  burger:    "/assets/Capture d'écran 2026-03-05 à 19.04.42.png",
  burger2:   "/assets/Capture d'écran 2026-03-05 à 19.04.54.png",
  burger3:   "/assets/Capture d'écran 2026-03-05 à 19.05.04.png",
  menus:     '/logos/image-removebg-preview (1) copie.png',
  frites:    '/logos/image-removebg-preview (4) copie 2.png',
  boissons:  '/logos/image-removebg-preview (4).png',
  desserts:  '/logos/image-removebg-preview (3) copie 3.png',
  sucreries: '/logos/image-removebg-preview (3) copie 2.png',
  sauces:    '/logos/image-removebg-preview (4) copie 3.png',
}

const data = {
  burgers: [
    { slug: 'classique-smash', img: IMG.burger,  name: 'LE CLASSIQUE SMASHÉ', price: '4 500 CFA' },
    { slug: 'spicy-chicken',   img: IMG.burger2, name: 'LE SPICY CHICKEN',    price: '4 500 CFA' },
    { slug: 'big-burgy-xxl',   img: IMG.burger3, name: 'LE BIG BURGY XXL',    price: '6 500 CFA' },
  ],
  menus: [
    { img: IMG.menus, name: 'MENU CLASSIQUE',        price: '6 500 CFA' },
    { img: IMG.menus, name: 'MENU DOUBLE SMASH',     price: '8 500 CFA' },
    { img: IMG.menus, name: 'MENU SPICY CHICKEN',    price: '6 500 CFA' },
    { img: IMG.menus, name: 'MENU ENFANT',           price: '5 000 CFA' },
    { img: IMG.menus, name: 'BOX FAMILY (4 pers.)',  price: '24 000 CFA' },
    { img: IMG.menus, name: 'MENU DUO',              price: '13 000 CFA' },
  ],
  frites: [
    { img: IMG.frites, name: 'FRITES CLASSIQUES',      price: '1 500 CFA' },
    { img: IMG.frites, name: 'FRITES XXL ÉPICÉES',     price: '2 000 CFA' },
    { img: IMG.frites, name: 'FRITES PARMESAN',        price: '2 500 CFA' },
    { img: IMG.frites, name: 'ONION RINGS (6 pc)',     price: '2 000 CFA' },
    { img: IMG.frites, name: 'SALADE COLESLAW',        price: '1 500 CFA' },
    { img: IMG.frites, name: 'NUGGETS POULET (6 pc)',  price: '2 500 CFA' },
  ],
  boissons: [
    { img: IMG.boissons, name: 'COCA-COLA 50cl',      price: '1 000 CFA' },
    { img: IMG.boissons, name: 'FANTA 50cl',          price: '1 000 CFA' },
    { img: IMG.boissons, name: 'SPRITE 50cl',         price: '1 000 CFA' },
    { img: IMG.boissons, name: 'MILKSHAKE VANILLE',   price: '2 000 CFA' },
    { img: IMG.boissons, name: 'MILKSHAKE CHOCOLAT',  price: '2 000 CFA' },
    { img: IMG.boissons, name: "JUS D'ORANGE FRAIS",  price: '1 500 CFA' },
    { img: IMG.boissons, name: 'EAU MINÉRALE 50cl',   price: '500 CFA' },
  ],
  desserts: [
    { img: IMG.desserts, name: 'SUNDAE VANILLE',     price: '1 500 CFA' },
    { img: IMG.desserts, name: 'SUNDAE CHOCOLAT',    price: '1 500 CFA' },
    { img: IMG.desserts, name: 'COOKIE MAISON',      price: '1 000 CFA' },
    { img: IMG.desserts, name: 'BROWNIE FONDANT',    price: '1 500 CFA' },
    { img: IMG.desserts, name: 'CHEESECAKE DU JOUR', price: '2 000 CFA' },
  ],
  sucreries: [
    { img: IMG.sucreries, name: 'CHURROS (3 pc)',     price: '1 000 CFA' },
    { img: IMG.sucreries, name: 'DONUT GLACÉ',        price: '800 CFA' },
    { img: IMG.sucreries, name: 'MUFFIN MYRTILLES',   price: '1 000 CFA' },
    { img: IMG.sucreries, name: 'GUIMAUVES GRILLÉES', price: '800 CFA' },
    { img: IMG.sucreries, name: 'CARAMEL POPCORN',    price: '1 000 CFA' },
  ],
  sauces: [
    { img: IMG.sauces, name: "SAUCE BURGY'S SIGNATURE", price: '300 CFA' },
    { img: IMG.sauces, name: 'SAUCE PIQUANTE MAISON',   price: '300 CFA' },
    { img: IMG.sauces, name: 'MAYO AILÉE',              price: '300 CFA' },
    { img: IMG.sauces, name: 'BBQ FUMÉ',                price: '300 CFA' },
    { img: IMG.sauces, name: 'KETCHUP MAISON',          price: '300 CFA' },
    { img: IMG.sauces, name: 'SAUCE FROMAGÈRE',         price: '300 CFA' },
  ],
}

// ─── Section catégorie ────────────────────────────────────────────────────────

function CategorySection({ tab, sectionRefs }) {
  const items = data[tab.id] || []
  return (
    <section
      id={`section-${tab.id}`}
      ref={el => { sectionRefs.current[tab.id] = el }}
      style={{ padding: '4rem 0', borderBottom: '2px solid #f0e0d0' }}
    >
      {/* Titre de section */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        marginBottom: '3rem', paddingBottom: '1rem',
        borderBottom: `3px solid ${tab.color}`,
      }}>
        <img src={tab.img} alt={tab.label} style={{ width: '52px', height: '52px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }} />
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: tab.color, lineHeight: 1 }}>
          {tab.label.toUpperCase()}
        </h2>
      </div>

      {/* Grille produits */}
      <div className="burger-grid">
        {items.map((item, i) => {
          const inner = (
            <>
              <div className="burger-image-container">
                <img src={item.img} alt={item.name} className="interactive-img" />
              </div>
              <h4>{item.name}</h4>
              <div className="price-tag">{item.price}</div>
            </>
          )
          return item.slug
            ? (
              <Link key={item.slug} to={`/nos-produits/burgers/${item.slug}`} className="burger-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                {inner}
              </Link>
            )
            : <div key={i} className="burger-item">{inner}</div>
        })}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NosProduits() {
  const { categorie = 'burgers' } = useParams()
  const navigate = useNavigate()
  const sectionRefs = useRef({})
  const tabBarRef = useRef(null)
  const activeRef = useRef(categorie)
  const isScrollingTo = useRef(false) // évite le feedback loop click → scroll → update

  // ── Scroll-spy via scroll event ──
  useEffect(() => {
    const OFFSET = 140 // navbar + tabbar

    const onScroll = () => {
      if (isScrollingTo.current) return

      // On cherche la section dont le top est la plus proche (par en dessous) de l'offset
      let current = tabs[0].id
      for (const tab of tabs) {
        const el = sectionRefs.current[tab.id]
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= OFFSET + 10) {
          current = tab.id
        }
      }

      if (current !== activeRef.current) {
        activeRef.current = current
        navigate(`/nos-produits/${current}`, { replace: true })
        scrollTabIntoView(current)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navigate])

  // ── Scroll la tab active dans la barre ──
  const scrollTabIntoView = useCallback((id) => {
    const bar = tabBarRef.current
    if (!bar) return
    const btn = bar.querySelector(`[data-id="${id}"]`)
    if (!btn) return
    btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [])

  // ── Clic sur une tab : scroll vers la section ──
  const handleTabClick = useCallback((id) => {
    const el = sectionRefs.current[id]
    if (!el) return
    isScrollingTo.current = true
    activeRef.current = id
    navigate(`/nos-produits/${id}`, { replace: true })
    scrollTabIntoView(id)
    // Offset : navbar (70px) + tabbar (56px) + petit gap
    const top = el.getBoundingClientRect().top + window.scrollY - 134
    window.scrollTo({ top, behavior: 'smooth' })
    // On réactive le spy après la fin du scroll animé (~800ms)
    setTimeout(() => { isScrollingTo.current = false }, 900)
  }, [navigate, scrollTabIntoView])

  // ── Au montage : scroll vers la section de l'URL ──
  useEffect(() => {
    if (categorie && sectionRefs.current[categorie]) {
      setTimeout(() => handleTabClick(categorie), 100)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <style>{`
        .carte-hero {
          padding: 110px 5% 3rem;
          text-align: center;
          background: var(--brand-red);
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

        /* Barre collée sous la Navbar */
        .carte-tabs-bar {
          position: sticky;
          top: 70px;
          z-index: 100;
          background: #fff;
          border-bottom: 2px solid #f0e0d0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
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
          padding: 0.85rem 1.4rem;
          font-family: var(--font-heading);
          font-size: 0.88rem;
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
          width: 28px;
          height: 28px;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
        }

        .carte-content {
          background: #fdfdfd;
          padding: 0 5%;
          min-height: 100vh;
        }
      `}</style>

      {/* Hero fixe */}
      <div className="carte-hero">
        <h1>NOTRE CARTE GOURMET</h1>
        <p>DU GOÛT. DU PLAISIR. LA QUALITÉ BURGY'S.</p>
      </div>

      {/* Barre de tabs sticky sous la navbar */}
      <div className="carte-tabs-bar" ref={tabBarRef}>
        <div className="carte-tabs-inner">
          {tabs.map(tab => (
            <button
              key={tab.id}
              data-id={tab.id}
              className={`carte-tab ${categorie === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <img src={tab.img} alt={tab.label} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toutes les sections d'un coup */}
      <div className="carte-content">
        {tabs.map(tab => (
          <CategorySection key={tab.id} tab={tab} sectionRefs={sectionRefs} />
        ))}
      </div>
    </>
  )
}
