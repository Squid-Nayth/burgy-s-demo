import PageHeader from '../components/PageHeader'

export default function Contact() {
  return (
    <>
      <PageHeader title="CONTACT & LIVRAISON" subtitle="ON EST LÀ POUR VOUS" />

      <section id="commander" className="section-light livraison">
        <div className="livraison-container" style={{ position: 'relative' }}>
          <div className="livraison-infos">
            <p><strong>BUREAU OU CANAPÉ ? COMME VOUS VOULEZ !</strong></p>
            <p>On s'occupe de tout.</p>
            <ul className="livraison-list">
              <li>Libreville & Alentours</li>
              <li>Livraison en moins de 45 minutes</li>
              <li>Emballage thermique premium</li>
              <li>Commandes groupées disponibles</li>
            </ul>
            <div className="contact-methods" style={{ marginTop: '3rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>NOS COORDONNÉES</h3>
              <p style={{ marginTop: '1rem' }}><strong>TÉLÉPHONE:</strong> +241 0 0 000 0</p>
              <p><strong>ADRESSE:</strong> GLASS, APRÈS KFC, LIBREVILLE, GABON</p>
              <p><strong>EMAIL:</strong> hello@burgys.ga</p>
            </div>
          </div>
          <div className="livraison-apps">
            <a href="#" className="app-btn black-square">
              <img src="/assets/Capture d'écran 2026-03-05 à 19.05.39.png" className="app-logo" alt="Yango Deli" />
              <span>YANGO</span>
            </a>
            <a href="#" className="app-btn black-square">
              <img src="/assets/Capture d'écran 2026-03-05 à 19.05.49.png" className="app-logo" alt="Glovo" />
              <span>GLOVO</span>
            </a>
          </div>
          <div className="under-development-overlay">
            <h2 style={{ color: 'var(--brand-red)' }}>PLATEFORME DE COMMANDE DIRECTE<br />EN COURS DE DÉVELOPPEMENT ⚙️</h2>
          </div>
        </div>
      </section>
    </>
  )
}
