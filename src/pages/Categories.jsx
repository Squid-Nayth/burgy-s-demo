import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'

function ComingSoonGrid() {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 5%' }}>
      <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</p>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--brand-red)', marginBottom: '1rem' }}>BIENTÔT DISPONIBLE</h3>
      <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Cette section est en cours de mise à jour. Revenez bientôt !</p>
      <Link to="/nos-produits" className="btn-primary">RETOUR À LA CARTE</Link>
    </div>
  )
}

export function CategorieMenus() {
  return (
    <>
      <PageHeader title="NOS MENUS" subtitle="COMPLETS. GÉNÉREUX. SAVOUREUX." bg="#e51c1d" />
      <section className="section-light" style={{ background: '#fdfdfd', padding: '5rem 5%' }}>
        <ComingSoonGrid />
      </section>
    </>
  )
}

export function CategorieFrites() {
  return (
    <>
      <PageHeader title="FRITES & SALADES" subtitle="CROUSTILLANTES. FRAÎCHES. GOURMANDES." bg="#f5a623" />
      <section className="section-light" style={{ background: '#fdfdfd', padding: '5rem 5%' }}>
        <ComingSoonGrid />
      </section>
    </>
  )
}

export function CategorieBoissons() {
  return (
    <>
      <PageHeader title="NOS BOISSONS" subtitle="RAFRAÎCHISSANTES. VARIÉES. PARFAITES." bg="#1565c0" />
      <section className="section-light" style={{ background: '#fdfdfd', padding: '5rem 5%' }}>
        <ComingSoonGrid />
      </section>
    </>
  )
}

export function CategorieDesserts() {
  return (
    <>
      <PageHeader title="NOS DESSERTS" subtitle="SUCRÉS. FONDANTS. INOUBLIABLES." bg="#7b1fa2" />
      <section className="section-light" style={{ background: '#fdfdfd', padding: '5rem 5%' }}>
        <ComingSoonGrid />
      </section>
    </>
  )
}

export function CategorieSucreries() {
  return (
    <>
      <PageHeader title="NOS SUCRERIES" subtitle="GOURMANDES. GÉNÉREUSES. DÉLICIEUSES." bg="#c2185b" />
      <section className="section-light" style={{ background: '#fdfdfd', padding: '5rem 5%' }}>
        <ComingSoonGrid />
      </section>
    </>
  )
}

export function CategorieSauces() {
  return (
    <>
      <PageHeader title="NOS SAUCES" subtitle="MAISON. RELEVÉES. ADDICTIVES." bg="#2e7d32" />
      <section className="section-light" style={{ background: '#fdfdfd', padding: '5rem 5%' }}>
        <ComingSoonGrid />
      </section>
    </>
  )
}
