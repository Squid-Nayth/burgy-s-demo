export default function PageHeader({ title, subtitle, bg = 'var(--brand-red)', color = '#fff' }) {
  return (
    <header className="page-header" style={{ paddingTop: '100px', textAlign: 'center', background: bg, color, paddingBottom: '3rem' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem' }}>{title}</h1>
      {subtitle && <p style={{ fontFamily: 'var(--font-heading)', opacity: 0.8, letterSpacing: '2px' }}>{subtitle}</p>}
    </header>
  )
}
