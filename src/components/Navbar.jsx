import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 50)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openMenu = () => {
    document.getElementById('sideMenu')?.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  const { totalItems } = useCart()
  const { user } = useAuth()
  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-left">
        <div className="menu-btn" onClick={openMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="nav-links">
          <Link to="/nos-produits" className={isActive('/nos-produits')}>MENU</Link>
          <Link to="/engagements">ENGAGEMENTS</Link>
          <Link to="/reservation">RÉSERVATION</Link>
        </div>
      </div>

      <Link to="/" className="logo-link center-logo">
        <img src="/assets/logo.png" alt="Burgy's Logo" className="logo-img" />
      </Link>

      <div className="nav-right">
        <div className="nav-actions">
          <Link to="/panier" className="nav-cart" aria-label="Panier" style={{ position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                background: 'var(--brand-yellow)', color: 'var(--brand-red)',
                borderRadius: '50%', width: '18px', height: '18px',
                fontSize: '0.65rem', fontFamily: 'var(--font-heading)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, lineHeight: 1,
              }}>{totalItems > 9 ? '9+' : totalItems}</span>
            )}
          </Link>
          <Link to="/#restaurants" className="nav-location" aria-label="Où sommes-nous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Link>
          <Link to="/compte" className="nav-account" aria-label="Compte" style={{ position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {user && (
              <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '9px', height: '9px', borderRadius: '50%', background: '#2d7a40', border: '2px solid white' }} />
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
