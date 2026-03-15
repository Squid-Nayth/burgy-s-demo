import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const burgers = [
  { slug: 'classique-smash', img: "/assets/Capture d'écran 2026-03-05 à 19.04.42.png", name: 'LE CLASSIQUE SMASHÉ', price: '4 500 CFA' },
  { slug: 'spicy-chicken', img: "/assets/Capture d'écran 2026-03-05 à 19.04.54.png", name: 'LE SPICY CHICKEN', price: '4 500 CFA' },
  { slug: 'big-burgy-xxl', img: "/assets/Capture d'écran 2026-03-05 à 19.05.04.png", name: 'LE BIG BURGY XXL', price: '6 500 CFA' },
]

export default function CategorieBurgers() {
  return (
    <>
      <PageHeader title="NOS BURGERS" subtitle="SMASHÉS. JUTEUX. IRRÉSISTIBLES." bg="orange" />
      <section className="section-light" style={{ background: '#fdfdfd', padding: '5rem 5%' }}>
        <div className="detail-nav-tabs">
          <Link to="/nos-produits/burgers" className="tab-link active">NOS BURGERS</Link>
          <Link to="/nos-produits/frites" className="tab-link">ACCOMPAGNEMENTS</Link>
          <Link to="/nos-produits/boissons" className="tab-link">BOISSONS</Link>
        </div>
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
      </section>
    </>
  )
}
