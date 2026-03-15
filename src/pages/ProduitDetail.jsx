import { useParams, Link } from 'react-router-dom'

const products = {
  'classique-smash': {
    name: 'LE CLASSIQUE SMASHÉ',
    price: '4 500 CFA',
    description: 'Notre burger signature, smashé à la perfection. Un steak bœuf pressé sur la plancha, fromage fondu, salade croquante, tomates fraîches et notre sauce maison secrète.',
    ingredients: ['Pain brioché toasté', 'Steak bœuf smashé 130g', 'Cheddar fondu', 'Salade iceberg', 'Tomates fraîches', 'Oignons caramélisés', 'Sauce Burgy\'s maison'],
    img: "/assets/Capture d'écran 2026-03-05 à 19.04.42.png",
    layers: [
      { name: 'Pain brioché supérieur', desc: 'Toasté au beurre' },
      { name: 'Sauce Burgy\'s', desc: 'Recette secrète maison' },
      { name: 'Salade & Tomates', desc: 'Fraîches chaque jour' },
      { name: 'Cheddar fondu', desc: 'Affiné 6 mois' },
      { name: 'Steak smashé 130g', desc: 'Bœuf 100% français' },
      { name: 'Pain brioché inférieur', desc: 'Base croustillante' },
    ]
  },
  'spicy-chicken': {
    name: 'LE SPICY CHICKEN',
    price: '4 500 CFA',
    description: 'Un poulet croustillant mariné aux épices, nappé de sauce piquante maison. Pour les amateurs de sensations fortes.',
    ingredients: ['Pain brioché toasté', 'Filet de poulet croustillant', 'Sauce piquante maison', 'Coleslaw', 'Cornichons', 'Sauce ranch'],
    img: "/assets/Capture d'écran 2026-03-05 à 19.04.54.png",
    layers: [
      { name: 'Pain brioché supérieur', desc: 'Toasté au beurre' },
      { name: 'Sauce piquante', desc: 'Niveau de feu 🔥🔥' },
      { name: 'Coleslaw maison', desc: 'Fraîcheur garantie' },
      { name: 'Filet poulet pané', desc: 'Croustillant à souhait' },
      { name: 'Pain brioché inférieur', desc: 'Base croustillante' },
    ]
  },
  'big-burgy-xxl': {
    name: 'LE BIG BURGY XXL',
    price: '6 500 CFA',
    description: 'Le monstre de la carte. Double steak, double fromage, le tout dans un pain XXL. Pour les plus affamés.',
    ingredients: ['Pain XXL toasté', '2 steaks bœuf smashés 130g', 'Double cheddar', 'Bacon croustillant', 'Salade iceberg', 'Tomates', 'Sauce spéciale XXL'],
    img: "/assets/Capture d'écran 2026-03-05 à 19.05.04.png",
    layers: [
      { name: 'Pain XXL supérieur', desc: 'Format géant' },
      { name: 'Sauce spéciale XXL', desc: 'Double dose' },
      { name: 'Bacon croustillant', desc: 'Fumé au bois' },
      { name: 'Double cheddar', desc: 'Généreusement fondu' },
      { name: '2 steaks smashés', desc: '260g de bœuf pur' },
      { name: 'Pain XXL inférieur', desc: 'Base solide' },
    ]
  }
}

export default function ProduitDetail() {
  const { slug } = useParams()
  const product = products[slug] || products['classique-smash']

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero produit */}
      <div style={{ background: '#fdfaf5', padding: '4rem 5%' }}>
        <Link to="/nos-produits/burgers" style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-red)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '1rem' }}>
          ← RETOUR AUX BURGERS
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--brand-red)', lineHeight: 1, marginBottom: '1rem' }}>{product.name}</h1>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>{product.price}</div>
            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '2rem' }}>{product.description}</p>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--brand-red)', marginBottom: '1rem', fontSize: '1.2rem' }}>INGRÉDIENTS :</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {product.ingredients.map(ing => (
                  <li key={ing} style={{ padding: '0.4rem 0', borderBottom: '1px solid #f0e0d0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--brand-yellow)', fontWeight: 700 }}>✓</span> {ing}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/en-construction" className="btn-primary" style={{ fontSize: '1.2rem', display: 'inline-block' }}>COMMANDER</Link>
          </div>
        </div>
      </div>

      {/* Schéma éclaté */}
      <section style={{ padding: '6rem 5%', background: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--brand-red)', marginBottom: '3rem' }}>LES COUCHES DU PARFAIT</h2>
        <div className="exploded-container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', background: '#fdfaf5', borderRadius: '40px', padding: '4rem 2rem' }}>
          {product.layers.map((layer, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '0.8rem 1rem', borderBottom: i < product.layers.length - 1 ? '2px dashed var(--brand-yellow)' : 'none' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--brand-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontFamily: 'var(--font-heading)', display: 'block', fontSize: '1.1rem' }}>{layer.name}</strong>
                <span style={{ fontSize: '0.85rem', color: '#777' }}>{layer.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Autres burgers */}
      <section style={{ padding: '6rem 5%', background: '#fdfaf5', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--brand-red)', marginBottom: '3rem' }}>VOUS AIMEREZ AUSSI</h2>
        <div className="burger-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {Object.entries(products).filter(([s]) => s !== slug).map(([s, p]) => (
            <Link to={`/nos-produits/burgers/${s}`} className="burger-item" key={s} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="burger-image-container">
                <img src={p.img} alt={p.name} className="interactive-img" />
              </div>
              <h4>{p.name}</h4>
              <div className="price-tag">{p.price}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
