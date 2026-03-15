import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const categories = [
  { to: '/nos-produits/burgers', img: '/logos/image-removebg-preview (3).png', label: 'Nos Burgers' },
  { to: '/nos-produits/menus', img: '/logos/image-removebg-preview (1) copie.png', label: 'Nos Menus' },
  { to: '/nos-produits/frites', img: '/logos/image-removebg-preview (4) copie 2.png', label: 'Nos Frites et Nos salades' },
  { to: '/nos-produits/boissons', img: '/logos/image-removebg-preview (4).png', label: 'Nos Boissons' },
  { to: '/nos-produits/desserts', img: '/logos/image-removebg-preview (3) copie 3.png', label: 'Nos Desserts' },
  { to: '/nos-produits/sucreries', img: '/logos/image-removebg-preview (3) copie 2.png', label: 'Nos Sucreries' },
  { to: '/nos-produits/sauces', img: '/logos/image-removebg-preview (4) copie 3.png', label: 'Nos Sauces' },
]

export default function NosProduits() {
  return (
    <>
      <PageHeader title="NOTRE CARTE GOURMET" subtitle="DU GOÛT. DU PLAISIR. LA QUALITÉ BURGY'S." />
      <section id="nos-produits" className="section-light" style={{ background: '#fdfdfd' }}>
        <div className="category-grid cards">
          {categories.map(cat => (
            <Link to={cat.to} className="category-item" key={cat.to}>
              <div className="category-img-container">
                <img src={cat.img} alt={cat.label} />
              </div>
              <div className="category-label">{cat.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
