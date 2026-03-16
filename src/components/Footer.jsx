import { useState } from 'react'
import { Link } from 'react-router-dom'

const footerStyles = `
  .footer-v2 {
    background: #1a1a1a;
    color: #ccc;
    font-family: var(--font-body);
    font-size: 0.88rem;
  }

  /* ══ DESKTOP : grille 5 col + panneau droit ══ */
  .footer-inner {
    display: grid;
    grid-template-columns: 1fr 280px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .footer-cols {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .footer-col {
    padding: 2.2rem 1.4rem;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .footer-col:last-child { border-right: none; }

  /* Desktop : titre statique, chevron masqué, corps toujours visible */
  .footer-col-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.1rem;
    cursor: default;
  }
  .footer-col-title {
    font-family: var(--font-heading);
    font-size: 0.9rem;
    color: #fff;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .footer-chevron { display: none; }

  .footer-col-body { overflow: visible; max-height: none; }
  .footer-col-body ul { list-style: none; padding: 0; margin: 0; }
  .footer-col-body ul li a,
  .footer-col-body ul li span {
    display: block;
    padding: 0.28rem 0;
    color: #999;
    text-decoration: none;
    font-size: 0.82rem;
    line-height: 1.5;
    transition: color 0.2s;
  }
  .footer-col-body ul li a:hover { color: var(--brand-yellow); }
  .footer-col-body ul li a.bold-link { color: #fff; font-weight: 600; }

  /* ══ PANNEAU DROIT ══ */
  .footer-right {
    padding: 2.2rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
  .footer-right-title {
    font-family: var(--font-heading);
    font-size: 0.9rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.7rem;
  }
  .footer-social-icons { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .footer-social-icon {
    width: 42px; height: 42px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #ccc;
    text-decoration: none;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .footer-social-icon:hover { background: var(--brand-red); border-color: var(--brand-red); color: #fff; }
  .footer-health-text { font-size: 0.76rem; color: #666; line-height: 1.65; }
  .footer-health-text a { color: #888; text-decoration: underline; }
  .footer-health-text a:hover { color: var(--brand-yellow); }

  /* ══ BAS DE PAGE ══ */
  .footer-bottom {
    padding: 1rem 1.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
  .footer-bottom-copy { font-size: 0.77rem; color: #555; }
  .footer-bottom-links { display: flex; gap: 1.4rem; flex-wrap: wrap; }
  .footer-bottom-links a { font-size: 0.77rem; color: #555; text-decoration: none; transition: color 0.2s; }
  .footer-bottom-links a:hover { color: var(--brand-yellow); }

  /* ══ MOBILE : accordéon ══ */
  @media (max-width: 960px) {
    .footer-inner { grid-template-columns: 1fr; }
    .footer-cols { grid-template-columns: 1fr; border-right: none; }
    .footer-col { padding: 0; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .footer-col-header {
      cursor: pointer;
      padding: 1rem 1.4rem;
      margin-bottom: 0;
      user-select: none;
      transition: background 0.2s;
    }
    .footer-col-header:hover { background: rgba(255,255,255,0.04); }
    .footer-chevron {
      display: block;
      transition: transform 0.3s ease;
      color: #888;
      flex-shrink: 0;
    }
    .footer-chevron.open { transform: rotate(180deg); }
    .footer-col-body {
      overflow: hidden !important;
      max-height: 0 !important;
      transition: max-height 0.35s ease !important;
    }
    .footer-col-body.open { max-height: 600px !important; padding-bottom: 0.8rem; }
    .footer-col-body ul { padding: 0.4rem 1.4rem 0; }
    .footer-right { padding: 2rem 1.4rem; border-top: 1px solid rgba(255,255,255,0.08); }
    .footer-bottom { padding: 1rem 1.4rem; flex-direction: column; align-items: flex-start; }
  }
`

const columns = [
  {
    title: 'Notre Carte',
    links: [
      { label: 'En ce moment', to: '/#nouveaute' },
      { label: 'Nos Burgers', to: '/nos-produits/burgers' },
      { label: 'Nos Menus', to: '/nos-produits/menus' },
      { label: 'Frites & Salades', to: '/nos-produits/frites' },
      { label: 'Boissons', to: '/nos-produits/boissons' },
      { label: 'Desserts', to: '/nos-produits/desserts' },
      { label: 'Sucreries', to: '/nos-produits/sucreries' },
      { label: 'Sauces', to: '/nos-produits/sauces' },
    ],
  },
  {
    title: 'Notre Entreprise',
    links: [
      { label: 'Nos engagements', to: '/engagements', bold: true },
      { label: 'Qualité & fraîcheur', to: '/engagements' },
      { label: 'Origines des produits', to: '/engagements' },
      { label: 'Hygiène & sécurité', to: '/engagements' },
      { label: 'Nous rejoindre', to: '/recrutement', bold: true },
      { label: 'Devenir franchisé(e)', to: '/en-construction' },
    ],
  },
  {
    title: 'Service Client',
    links: [
      { label: 'Nous contacter', to: '/contact' },
      { label: 'F.A.Q', to: '/contact' },
      { label: 'Allergènes', to: '/allergenes' },
      { label: 'Valeurs nutritionnelles', to: '/en-construction' },
      { label: 'Origines de nos viandes', to: '/engagements' },
    ],
  },
  {
    title: 'Nos Services',
    links: [
      { label: 'Commander en ligne', to: '/en-construction' },
      { label: 'Réserver une table', to: '/reservation' },
      { label: 'Programme fidélité', to: '/fidelite' },
      { label: 'Livraison', to: '/contact' },
      { label: 'Offre étudiants', to: '/en-construction' },
    ],
  },
  {
    title: 'Infos légales',
    links: [
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'CGV', to: '/mentions-legales#cgv' },
      { label: 'Confidentialité', to: '/mentions-legales#confidentialite' },
      { label: 'Paramètres cookies', to: '/mentions-legales#cookies' },
    ],
  },
]

function FooterCol({ title, links }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="footer-col">
      <div className="footer-col-header" onClick={() => setOpen(o => !o)}>
        <span className="footer-col-title">{title}</span>
        <svg className={`footer-chevron ${open ? 'open' : ''}`} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div className={`footer-col-body ${open ? 'open' : ''}`}>
        <ul>
          {links.map(l => (
            <li key={l.label}>
              <Link to={l.to} className={l.bold ? 'bold-link' : ''}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <>
      <style>{footerStyles}</style>
      <footer className="footer-v2" id="footer">

        <div className="footer-inner">
          {/* 5 colonnes de liens */}
          <div className="footer-cols">
            {columns.map(col => <FooterCol key={col.title} title={col.title} links={col.links} />)}
          </div>

          {/* Panneau droit : social + santé */}
          <div className="footer-right">
            <div>
              <p className="footer-right-title">Pour nous suivre, c'est par ici</p>
              <div className="footer-social-icons">
                <a href="https://www.instagram.com/burgys.gabon/" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Instagram">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="TikTok">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="Facebook">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-icon" aria-label="YouTube">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                  </svg>
                </a>
              </div>
            </div>
            <p className="footer-health-text">
              Pour votre santé, pratiquez une activité physique régulière.
            </p>
          </div>
        </div>

        {/* Copyright + liens légaux */}
        <div className="footer-bottom">
          <span className="footer-bottom-copy">&copy; 2026 BURGY'S. Tous droits réservés.</span>
          <div className="footer-bottom-links">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/mentions-legales#confidentialite">Confidentialité</Link>
            <Link to="/mentions-legales#cookies">Cookies</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

      </footer>
    </>
  )
}
