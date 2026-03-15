import { useState } from 'react'
import { Link } from 'react-router-dom'

function AccordionItem({ icon, label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="smenu-accordion">
      <div className={`smenu-nav-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        <span className="smenu-icon">{icon}</span>
        <span className="smenu-label">{label}</span>
        <svg className="smenu-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div className={`smenu-submenu ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default function SideMenu() {
  const close = () => {
    document.getElementById('sideMenu')?.classList.remove('active')
    document.body.style.overflow = ''
  }

  return (
    <div className="side-menu" id="sideMenu">
      <div className="side-menu-overlay" id="menuOverlay" onClick={close}></div>
      <div className="side-menu-content">
        <div className="side-menu-header">
          <div className="side-menu-header-logo">
            <Link to="/" onClick={close}><img src="/assets/logo.png" alt="Burgy's" /></Link>
          </div>
          <button className="close-menu" onClick={close}>&times;</button>
        </div>

        <div className="side-menu-body">
          <Link to="/en-construction" className="smenu-account-row" onClick={close}>
            <span className="smenu-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="smenu-label">Mon compte</span>
          </Link>

          <div className="smenu-order-section">
            <Link to="/en-construction" className="smenu-order-item" onClick={close}>
              <span className="smenu-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </span>
              <span className="smenu-label">Commande à emporter</span>
            </Link>
            <Link to="/reservation" className="smenu-order-item" onClick={close}>
              <span className="smenu-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
                </svg>
              </span>
              <span className="smenu-label">Commande sur table</span>
            </Link>
            <Link to="/en-construction" className="smenu-order-item" onClick={close}>
              <span className="smenu-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" /><rect x="9" y="11" width="14" height="10" rx="1" /><circle cx="12" cy="19" r="2" /><circle cx="20" cy="19" r="2" />
                </svg>
              </span>
              <span className="smenu-label">Commander en livraison</span>
            </Link>
          </div>

          <div className="smenu-nav-section">
            <AccordionItem label="Nouveautés" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }>
              <Link to="/#nouveaute" onClick={close}>En ce moment</Link>
              <Link to="/nos-produits" onClick={close}>Derniers burgers</Link>
            </AccordionItem>

            <Link to="/nos-produits" className="smenu-nav-item" onClick={close}>
              <span className="smenu-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span className="smenu-label">Notre carte</span>
            </Link>

            <AccordionItem label="Coin Famille" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }>
              <Link to="/reservation" onClick={close}>Réserver une table</Link>
              <Link to="/en-construction" onClick={close}>Menu enfants</Link>
            </AccordionItem>
          </div>

          <div className="smenu-nav-section">
            <AccordionItem label="Nos engagements Burgy's" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }>
              <Link to="/engagements" onClick={close}>Qualité & fraîcheur</Link>
              <Link to="/engagements" onClick={close}>Origines des produits</Link>
              <Link to="/engagements" onClick={close}>Hygiène & sécurité</Link>
            </AccordionItem>
          </div>

          <div className="smenu-nav-section">
            <AccordionItem label="Nous rejoindre" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            }>
              <Link to="/recrutement" onClick={close}>Recrutement</Link>
              <Link to="/en-construction" onClick={close}>Franchise</Link>
            </AccordionItem>

            <AccordionItem label="Informations légales" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            }>
              <Link to="/mentions-legales" onClick={close}>Mentions légales</Link>
              <Link to="/mentions-legales#cgv" onClick={close}>CGV</Link>
              <Link to="/mentions-legales#confidentialite" onClick={close}>Confidentialité</Link>
              <Link to="/mentions-legales#cookies" onClick={close}>Cookies</Link>
            </AccordionItem>

            <AccordionItem label="Informations clients" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            }>
              <Link to="/contact" onClick={close}>FAQ / SAV</Link>
              <Link to="/allergenes" onClick={close}>Allergènes</Link>
              <Link to="/en-construction" onClick={close}>Valeurs nutritionnelles</Link>
              <Link to="/fidelite" onClick={close}>Programme fidélité</Link>
            </AccordionItem>
          </div>
        </div>

        <div className="side-menu-footer">
          <span className="side-menu-footer-version">Version 1.0.0</span>
          <div className="side-socials">
            <a href="https://www.instagram.com/burgys.gabon/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
