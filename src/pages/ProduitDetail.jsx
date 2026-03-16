import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// ─── Images partagées ─────────────────────────────────────────────────────────

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

// ─── Catalogue complet ────────────────────────────────────────────────────────

const catalogue = {
  burgers: {
    'classique-smash': {
      name: 'LE CLASSIQUE SMASHÉ',
      price: '4 500 CFA',
      description: 'Notre burger signature, smashé à la perfection. Un steak bœuf pressé sur la plancha, fromage fondu, salade croquante, tomates fraîches et notre sauce maison secrète.',
      ingredients: ['Pain brioché toasté', 'Steak bœuf smashé 130g', 'Cheddar fondu', 'Salade iceberg', 'Tomates fraîches', 'Oignons caramélisés', "Sauce Burgy's maison"],
      images: [IMG.burger, IMG.burger2, "/assets/Capture d'écran 2026-03-05 à 19.06.07.png"],
    },
    'spicy-chicken': {
      name: 'LE SPICY CHICKEN',
      price: '4 500 CFA',
      description: 'Un poulet croustillant mariné aux épices, nappé de sauce piquante maison. Pour les amateurs de sensations fortes.',
      ingredients: ['Pain brioché toasté', 'Filet de poulet croustillant', 'Sauce piquante maison', 'Coleslaw', 'Cornichons', 'Sauce ranch'],
      images: [IMG.burger2, IMG.burger],
    },
    'big-burgy-xxl': {
      name: 'LE BIG BURGY XXL',
      price: '6 500 CFA',
      description: 'Le monstre de la carte. Double steak, double fromage, le tout dans un pain XXL. Pour les plus affamés.',
      ingredients: ['Pain XXL toasté', '2 steaks bœuf smashés 130g', 'Double cheddar', 'Bacon croustillant', 'Salade iceberg', 'Tomates', 'Sauce spéciale XXL'],
      images: [IMG.burger3, IMG.burger2],
    },
  },
  menus: {
    'menu-classique': {
      name: 'MENU CLASSIQUE',
      price: '6 500 CFA',
      description: 'Le menu complet par excellence : notre Classique Smashé accompagné de frites croustillantes et d\'une boisson de votre choix.',
      ingredients: ['1 Classique Smashé', 'Frites classiques', 'Boisson 50cl au choix'],
      images: [IMG.menus],
    },
    'menu-double-smash': {
      name: 'MENU DOUBLE SMASH',
      price: '8 500 CFA',
      description: 'Pour les grands appétits : deux steaks smashés, double fromage, frites XXL et boisson incluse.',
      ingredients: ['1 Big Burgy XXL', 'Frites XXL', 'Boisson 50cl au choix'],
      images: [IMG.menus],
    },
    'menu-spicy-chicken': {
      name: 'MENU SPICY CHICKEN',
      price: '6 500 CFA',
      description: 'Le menu qui pique : Spicy Chicken avec ses frites classiques et une boisson bien fraîche pour éteindre le feu.',
      ingredients: ['1 Spicy Chicken', 'Frites classiques', 'Boisson 50cl au choix'],
      images: [IMG.menus],
    },
    'menu-enfant': {
      name: 'MENU ENFANT',
      price: '5 000 CFA',
      description: 'Un menu équilibré et savoureux pour les petits. Burger tendre, frites légères et jus de fruit.',
      ingredients: ['1 Petit burger', 'Petites frites', 'Jus de fruit'],
      images: [IMG.menus],
    },
    'box-family': {
      name: 'BOX FAMILY (4 pers.)',
      price: '24 000 CFA',
      description: 'Le pack parfait pour toute la famille. 4 burgers au choix, 2 grandes frites partagées, 4 boissons et des sauces maison.',
      ingredients: ['4 burgers au choix', '2 grandes frites', '4 boissons 50cl', 'Sauces maison'],
      images: [IMG.menus],
    },
    'menu-duo': {
      name: 'MENU DUO',
      price: '13 000 CFA',
      description: 'Parfait pour partager un bon moment à deux. 2 burgers, 1 grande frite partagée et 2 boissons.',
      ingredients: ['2 burgers au choix', '1 grande frite', '2 boissons 50cl'],
      images: [IMG.menus],
    },
  },
  frites: {
    'frites-classiques': {
      name: 'FRITES CLASSIQUES',
      price: '1 500 CFA',
      description: 'Dorées, croustillantes à l\'extérieur et fondantes à l\'intérieur. Assaisonnées avec notre mélange d\'épices signature.',
      ingredients: ['Pommes de terre fraîches', 'Huile végétale', 'Sel de mer', 'Épices maison'],
      images: [IMG.frites],
    },
    'frites-xxl-epicees': {
      name: 'FRITES XXL ÉPICÉES',
      price: '2 000 CFA',
      description: 'Le format XXL pour les amateurs de grosses frites. Une touche d\'épices pour relever le tout.',
      ingredients: ['Pommes de terre fraîches XXL', 'Huile végétale', 'Piment', 'Paprika', 'Sel'],
      images: [IMG.frites],
    },
    'frites-parmesan': {
      name: 'FRITES PARMESAN',
      price: '2 500 CFA',
      description: 'Nos frites classiques généreusement recouvertes de parmesan râpé et de persil frais. Une touche italienne irrésistible.',
      ingredients: ['Frites classiques', 'Parmesan AOP râpé', 'Persil frais', 'Ail'],
      images: [IMG.frites],
    },
    'onion-rings': {
      name: 'ONION RINGS (6 pc)',
      price: '2 000 CFA',
      description: 'Rondelles d\'oignon enrobées d\'une panure légère et croustillante. Idéal en accompagnement ou en snack.',
      ingredients: ['Oignons frais', 'Panure maison', 'Épices', 'Huile végétale'],
      images: [IMG.frites],
    },
    'salade-coleslaw': {
      name: 'SALADE COLESLAW',
      price: '1 500 CFA',
      description: 'Une salade fraîche et crémeuse à base de chou blanc, carottes râpées et notre sauce coleslaw maison.',
      ingredients: ['Chou blanc', 'Carottes râpées', 'Sauce coleslaw maison', 'Herbes fraîches'],
      images: [IMG.frites],
    },
    'nuggets-poulet': {
      name: 'NUGGETS POULET (6 pc)',
      price: '2 500 CFA',
      description: 'Six nuggets de poulet tendre enrobés d\'une panure croustillante dorée. Servis avec la sauce de votre choix.',
      ingredients: ['Filet de poulet', 'Panure croustillante', 'Épices', 'Sauce au choix'],
      images: [IMG.frites],
    },
  },
  boissons: {
    'coca-cola': {
      name: 'COCA-COLA 50cl',
      price: '1 000 CFA',
      description: 'Le Coca-Cola original, toujours aussi rafraîchissant. Servi bien frais.',
      ingredients: ['Coca-Cola 50cl', 'Servi avec glaçons'],
      images: [IMG.boissons],
    },
    'fanta': {
      name: 'FANTA 50cl',
      price: '1 000 CFA',
      description: 'La saveur orange Fanta, pétillante et désaltérante. Parfaite pour accompagner votre repas.',
      ingredients: ['Fanta Orange 50cl', 'Servi avec glaçons'],
      images: [IMG.boissons],
    },
    'sprite': {
      name: 'SPRITE 50cl',
      price: '1 000 CFA',
      description: 'Citron et citron vert, Sprite vous rafraîchit à chaque gorgée.',
      ingredients: ['Sprite 50cl', 'Servi avec glaçons'],
      images: [IMG.boissons],
    },
    'milkshake-vanille': {
      name: 'MILKSHAKE VANILLE',
      price: '2 000 CFA',
      description: 'Un milkshake onctueux à la vanille de Madagascar, préparé à la commande avec de la vraie glace.',
      ingredients: ['Lait frais entier', 'Glace vanille artisanale', 'Extrait de vanille Madagascar', 'Chantilly'],
      images: [IMG.boissons],
    },
    'milkshake-chocolat': {
      name: 'MILKSHAKE CHOCOLAT',
      price: '2 000 CFA',
      description: 'Un milkshake intense au chocolat noir, pour les vrais amateurs. Épais, crémeux, inoubliable.',
      ingredients: ['Lait frais entier', 'Glace chocolat artisanale', 'Cacao pur', 'Chantilly'],
      images: [IMG.boissons],
    },
    'jus-orange': {
      name: "JUS D'ORANGE FRAIS",
      price: '1 500 CFA',
      description: 'Pressé à la commande, notre jus d\'orange frais est pur, sans sucre ajouté, 100% naturel.',
      ingredients: ["Oranges fraîches pressées"],
      images: [IMG.boissons],
    },
    'eau-minerale': {
      name: 'EAU MINÉRALE 50cl',
      price: '500 CFA',
      description: 'Eau minérale naturelle fraîche.',
      ingredients: ['Eau minérale naturelle 50cl'],
      images: [IMG.boissons],
    },
  },
  desserts: {
    'sundae-vanille': {
      name: 'SUNDAE VANILLE',
      price: '1 500 CFA',
      description: 'Une coupe de glace vanille crémeuse nappée de caramel chaud maison. Le dessert réconfortant par excellence.',
      ingredients: ['Glace vanille artisanale', 'Caramel maison', 'Chantilly'],
      images: [IMG.desserts],
    },
    'sundae-chocolat': {
      name: 'SUNDAE CHOCOLAT',
      price: '1 500 CFA',
      description: 'Glace vanille nappée de chocolat fondu chaud. Un classique indémodable.',
      ingredients: ['Glace vanille artisanale', 'Sauce chocolat noir', 'Chantilly'],
      images: [IMG.desserts],
    },
    'cookie-maison': {
      name: 'COOKIE MAISON',
      price: '1 000 CFA',
      description: 'Cuit chaque jour, notre cookie regorge de pépites de chocolat fondantes. Croustillant dehors, moelleux dedans.',
      ingredients: ['Farine', 'Beurre frais', 'Pépites chocolat', 'Sucre brun', 'Œuf'],
      images: [IMG.desserts],
    },
    'brownie-fondant': {
      name: 'BROWNIE FONDANT',
      price: '1 500 CFA',
      description: 'Un brownie ultra fondant au chocolat noir intense, avec des noix pour le croquant. Servi tiède.',
      ingredients: ['Chocolat noir 70%', 'Beurre', 'Œufs', 'Noix', 'Sucre'],
      images: [IMG.desserts],
    },
    'cheesecake': {
      name: 'CHEESECAKE DU JOUR',
      price: '2 000 CFA',
      description: 'Notre cheesecake change selon les saisons et l\'inspiration du chef. Toujours frais, toujours généreux.',
      ingredients: ['Fromage frais', 'Biscuit sablé', 'Coulis du jour', 'Crème'],
      images: [IMG.desserts],
    },
  },
  sucreries: {
    'churros': {
      name: 'CHURROS (3 pc)',
      price: '1 000 CFA',
      description: 'Trois churros croustillants saupoudrés de sucre glace, servis avec une sauce chocolat pour tremper.',
      ingredients: ['Pâte à churros', 'Sucre glace', 'Cannelle', 'Sauce chocolat'],
      images: [IMG.sucreries],
    },
    'donut-glace': {
      name: 'DONUT GLACÉ',
      price: '800 CFA',
      description: 'Un donut moelleux recouvert d\'un glaçage coloré. Surprise du chef sur le parfum du jour.',
      ingredients: ['Pâte levée', 'Glaçage du jour', 'Vermicelles colorés'],
      images: [IMG.sucreries],
    },
    'muffin-myrtilles': {
      name: 'MUFFIN MYRTILLES',
      price: '1 000 CFA',
      description: 'Un muffin généreux aux myrtilles fraîches, avec un cœur fondant et un dessus légèrement craquant.',
      ingredients: ['Farine', 'Myrtilles fraîches', 'Beurre', 'Sucre', 'Œuf', 'Lait'],
      images: [IMG.sucreries],
    },
    'guimauves-grillees': {
      name: 'GUIMAUVES GRILLÉES',
      price: '800 CFA',
      description: 'Des guimauves artisanales légèrement grillées pour une texture caramélisée unique. Servi chaud.',
      ingredients: ['Guimauves artisanales', 'Sucre vanillé'],
      images: [IMG.sucreries],
    },
    'caramel-popcorn': {
      name: 'CARAMEL POPCORN',
      price: '1 000 CFA',
      description: 'Du popcorn croustillant enrobé de caramel maison. La combinaison sucré-salé parfaite pour une pause gourmande.',
      ingredients: ['Maïs à éclater', 'Caramel maison', 'Beurre', 'Fleur de sel'],
      images: [IMG.sucreries],
    },
  },
  sauces: {
    'sauce-signature': {
      name: "SAUCE BURGY'S SIGNATURE",
      price: '300 CFA',
      description: "Notre sauce maison gardée secrète depuis le premier jour. Une explosion de saveurs qui accompagne parfaitement chaque burger.",
      ingredients: ['Recette secrète maison', 'Épices sélectionnées'],
      images: [IMG.sauces],
    },
    'sauce-piquante': {
      name: 'SAUCE PIQUANTE MAISON',
      price: '300 CFA',
      description: 'Pour ceux qui aiment le feu. Notre sauce piquante maison est préparée avec des piments frais sélectionnés.',
      ingredients: ['Piments frais', 'Vinaigre', 'Ail', 'Sel'],
      images: [IMG.sauces],
    },
    'mayo-ailee': {
      name: 'MAYO AILÉE',
      price: '300 CFA',
      description: 'Une mayonnaise maison généreusement aillée. Crémeuse, parfumée, elle transforme n\'importe quelle frite.',
      ingredients: ['Mayonnaise maison', 'Ail frais', 'Persil', 'Citron'],
      images: [IMG.sauces],
    },
    'bbq-fume': {
      name: 'BBQ FUMÉ',
      price: '300 CFA',
      description: 'Une sauce BBQ fumée aux notes de hickory et de mélasse. Le parfait compagnon des nuggets et burgers.',
      ingredients: ['Tomate', 'Mélasse', 'Vinaigre de pomme', 'Fumée liquide', 'Épices'],
      images: [IMG.sauces],
    },
    'ketchup-maison': {
      name: 'KETCHUP MAISON',
      price: '300 CFA',
      description: 'Un ketchup préparé avec de vraies tomates mûries au soleil. Bien loin du ketchup industriel.',
      ingredients: ['Tomates fraîches', 'Vinaigre', 'Sucre de canne', 'Épices'],
      images: [IMG.sauces],
    },
    'sauce-fromagere': {
      name: 'SAUCE FROMAGÈRE',
      price: '300 CFA',
      description: 'Un fondu de fromages crémeux et chaud, parfait pour tremper vos frites ou napper votre burger.',
      ingredients: ['Cheddar', 'Fromage fondu', 'Lait', 'Moutarde', 'Épices'],
      images: [IMG.sauces],
    },
  },
}

// ─── Carousel ────────────────────────────────────────────────────────────────

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef(null)

  const goTo = (index) => {
    clearTimeout(timeoutRef.current)
    setCurrent(index)
  }
  const prev = () => goTo((current - 1 + images.length) % images.length)
  const next = () => goTo((current + 1) % images.length)

  useEffect(() => {
    if (images.length <= 1) return
    timeoutRef.current = setTimeout(() => goTo((current + 1) % images.length), 4000)
    return () => clearTimeout(timeoutRef.current)
  }, [current, images.length])

  useEffect(() => { setCurrent(0) }, [images])

  return (
    <>
      <style>{`
        .carousel-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 28px;
          overflow: hidden;
          background: #f5f0e8;
        }
        .carousel-track {
          display: flex;
          height: 100%;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .carousel-slide {
          flex: 0 0 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
        }
        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 16px 40px rgba(0,0,0,0.18));
        }
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          transition: background 0.2s, transform 0.2s;
          z-index: 2;
          color: #333;
        }
        .carousel-btn:hover { background: var(--brand-red); color: #fff; transform: translateY(-50%) scale(1.08); }
        .carousel-btn.prev { left: 12px; }
        .carousel-btn.next { right: 12px; }
        .carousel-dots { display: flex; justify-content: center; gap: 6px; margin-top: 1rem; }
        .carousel-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ddd;
          border: none; cursor: pointer; padding: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .carousel-dot.active { background: var(--brand-red); transform: scale(1.35); }
        .carousel-thumbs { display: flex; gap: 0.6rem; margin-top: 0.8rem; justify-content: center; }
        .carousel-thumb {
          width: 60px; height: 60px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s, transform 0.2s;
          background: #f5f0e8;
          flex-shrink: 0;
        }
        .carousel-thumb.active { border-color: var(--brand-red); transform: scale(1.06); }
        .carousel-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
      `}</style>

      <div className="carousel-wrap">
        <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((src, i) => (
            <div className="carousel-slide" key={i}>
              <img src={src} alt={`Vue ${i + 1}`} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button className="carousel-btn prev" onClick={prev} aria-label="Précédent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="carousel-btn next" onClick={next} aria-label="Suivant">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
          <div className="carousel-thumbs">
            {images.map((src, i) => (
              <div key={i} className={`carousel-thumb ${i === current ? 'active' : ''}`} onClick={() => goTo(i)}>
                <img src={src} alt={`Miniature ${i + 1}`} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

// ─── Page détail ──────────────────────────────────────────────────────────────

export default function ProduitDetail() {
  const { categorie, slug } = useParams()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()

  const categoryData = catalogue[categorie] || {}
  const product = categoryData[slug]

  if (!product) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', padding: '8rem 5%' }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-red)', marginBottom: '1rem' }}>PRODUIT INTROUVABLE</h2>
        <Link to="/nos-produits" className="btn-primary">RETOUR À LA CARTE</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, categorie, slug, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = Object.entries(categoryData).filter(([s]) => s !== slug)

  return (
    <>
      <style>{`
        .detail-page {
          /* Grand espace en haut pour dégager la navbar */
          padding-top: 120px;
          background: #fdfaf5;
          min-height: 100vh;
        }
        .detail-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          color: var(--brand-red);
          padding: 0 5% 2rem;
          cursor: pointer;
          transition: gap 0.2s;
          background: none;
          border: none;
          text-decoration: none;
        }
        .detail-back:hover { gap: 0.9rem; color: #c01010; }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 5% 6rem;
          align-items: start;
        }
        @media (max-width: 760px) {
          .detail-grid { grid-template-columns: 1fr; gap: 2rem; padding: 0 5% 4rem; }
          .product-card { position: static; padding: 1.8rem; }
          .detail-page { padding-top: 90px; }
        }
        @media (max-width: 480px) {
          .product-card h1 { font-size: 1.6rem; }
          .product-price { font-size: 1.6rem; }
          .cart-row { flex-direction: column; align-items: stretch; }
          .qty-control { justify-content: center; }
        }

        .product-card {
          background: #fff;
          border-radius: 28px;
          padding: 2.8rem;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          position: sticky;
          top: 140px;
        }
        .product-card h1 {
          font-family: var(--font-heading);
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: var(--brand-red);
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        .product-price {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--text-dark);
          margin-bottom: 1.4rem;
        }
        .product-description {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.85;
          margin-bottom: 1.6rem;
          padding-bottom: 1.6rem;
          border-bottom: 1px solid #f0e0d0;
        }
        .product-ingredients h4 {
          font-family: var(--font-heading);
          color: var(--brand-red);
          font-size: 0.9rem;
          letter-spacing: 1px;
          margin-bottom: 0.7rem;
        }
        .product-ingredients ul {
          list-style: none; padding: 0; margin: 0 0 2rem;
        }
        .product-ingredients li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.32rem 0;
          font-size: 0.86rem;
          color: #666;
          border-bottom: 1px solid #faf0e8;
        }
        .product-ingredients li::before {
          content: '✓';
          color: var(--brand-yellow);
          font-weight: 700;
          flex-shrink: 0;
        }
        .cart-row { display: flex; gap: 0.8rem; align-items: center; }
        .qty-control {
          display: flex;
          align-items: center;
          border: 2px solid #f0e0d0;
          border-radius: 50px;
          overflow: hidden;
        }
        .qty-btn {
          width: 38px; height: 38px;
          background: none; border: none; cursor: pointer;
          font-size: 1.2rem;
          color: var(--brand-red);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .qty-btn:hover { background: #fdf0e8; }
        .qty-value {
          width: 34px; text-align: center;
          font-family: var(--font-heading);
          font-size: 1.1rem;
        }
        .btn-cart {
          flex: 1;
          background: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 0.75rem 1.4rem;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-cart:hover { background: #c01010; transform: translateY(-2px); }
        .btn-cart.added { background: #2d7a40; }

        .related-section {
          background: #fff;
          padding: 5rem 5%;
          text-align: center;
        }
        .related-section h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--brand-red);
          margin-bottom: 3rem;
        }
      `}</style>

      <div className="detail-page">
        {/* Bouton retour */}
        <button className="detail-back" onClick={() => navigate(`/nos-produits/${categorie}`)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          RETOUR À LA CARTE
        </button>

        <div className="detail-grid">
          {/* Carousel */}
          <div>
            <ImageCarousel images={product.images} />
          </div>

          {/* Carte produit */}
          <div className="product-card">
            <h1>{product.name}</h1>
            <div className="product-price">{product.price}</div>
            <p className="product-description">{product.description}</p>

            <div className="product-ingredients">
              <h4>INGRÉDIENTS</h4>
              <ul>
                {product.ingredients.map(ing => <li key={ing}>{ing}</li>)}
              </ul>
            </div>

            <div className="cart-row">
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className={`btn-cart ${added ? 'added' : ''}`} onClick={handleAddToCart}>
                {added
                  ? <>✓ AJOUTÉ</>
                  : <>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                        <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      AJOUTER AU PANIER
                    </>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Produits similaires */}
      {related.length > 0 && (
        <section className="related-section">
          <h2>VOUS AIMEREZ AUSSI</h2>
          <div className="burger-grid" style={{ maxWidth: '900px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))' }}>
            {related.slice(0, 3).map(([s, p]) => (
              <Link key={s} to={`/nos-produits/${categorie}/${s}`} className="burger-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="burger-image-container">
                  <img src={p.images[0]} alt={p.name} className="interactive-img" />
                </div>
                <h4>{p.name}</h4>
                <div className="price-tag">{p.price}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
