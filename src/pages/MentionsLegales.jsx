import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function MentionsLegales() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [hash])

  return (
    <>
      <style>{`
        .legal-hero { background: var(--brand-red); color: #fff; padding: 130px 5% 60px; text-align: center; }
        .legal-hero h1 { font-family: var(--font-heading); font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1; }
        .legal-hero p { font-size: 1rem; opacity: .85; margin-top: 1rem; font-family: var(--font-heading); letter-spacing: 1px; }
        .legal-nav { background: #f5ede0; border-bottom: 2px solid #e8d8c8; position: sticky; top: 70px; z-index: 50; }
        .legal-nav-inner { display: flex; gap: 0; overflow-x: auto; max-width: 900px; margin: 0 auto; padding: 0 2rem; scrollbar-width: none; }
        .legal-nav-inner::-webkit-scrollbar { display: none; }
        .legal-tab { font-family: var(--font-heading); font-size: 0.9rem; color: #5c3317; padding: 1rem 1.8rem; white-space: nowrap; border-bottom: 3px solid transparent; cursor: pointer; transition: var(--transition); text-decoration: none; display: block; }
        .legal-tab:hover { color: var(--brand-red); border-bottom-color: var(--brand-red); }
        .legal-body { max-width: 820px; margin: 0 auto; padding: 5rem 5% 6rem; }
        .legal-section { margin-bottom: 4rem; scroll-margin-top: 120px; }
        .legal-section h2 { font-family: var(--font-heading); font-size: 2.2rem; color: var(--brand-red); margin-bottom: 1.5rem; padding-bottom: 0.8rem; border-bottom: 3px solid var(--brand-yellow); }
        .legal-section h3 { font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-dark); margin: 1.8rem 0 0.6rem; }
        .legal-section p, .legal-section li { font-size: 0.92rem; color: #444; line-height: 1.85; margin-bottom: 0.8rem; }
        .legal-section ul { padding-left: 1.5rem; margin-bottom: 1rem; }
        .legal-section strong { color: var(--brand-red); }
        .legal-date { display: inline-block; background: #fdf6ee; border: 1px solid #e8d8c8; border-radius: 8px; padding: 6px 14px; font-size: 0.82rem; color: #777; margin-bottom: 2rem; }
        .legal-contact-box { background: #f5ede0; border-radius: 16px; padding: 2rem; margin-top: 2rem; border-left: 4px solid var(--brand-red); }
        .legal-contact-box p { margin: 0; font-size: 0.92rem; color: #444; line-height: 1.7; }
        .legal-contact-box strong { color: var(--brand-red); display: block; font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.5rem; }
      `}</style>

      <div className="legal-hero">
        <h1>MENTIONS LÉGALES</h1>
        <p>INFORMATIONS LÉGALES & CONDITIONS D'UTILISATION</p>
      </div>

      <nav className="legal-nav">
        <div className="legal-nav-inner">
          {[['#mentions', 'Mentions légales'], ['#cgv', 'CGV'], ['#confidentialite', 'Confidentialité'], ['#cookies', 'Cookies']].map(([href, label]) => (
            <a key={href} href={href} className="legal-tab">{label}</a>
          ))}
        </div>
      </nav>

      <main className="legal-body">
        <section className="legal-section" id="mentions">
          <span className="legal-date">Mise à jour : Mars 2026</span>
          <h2>MENTIONS LÉGALES</h2>
          <h3>Éditeur du site</h3>
          <p><strong>Raison sociale :</strong> BURGY'S SARL<br />
          <strong>Siège social :</strong> Glass, Libreville, République Gabonaise<br />
          <strong>Email :</strong> hello@burgys.ga<br />
          <strong>Téléphone :</strong> +241 0 0 000 0</p>
          <h3>Hébergement</h3>
          <p>Ce site est hébergé par un prestataire technique. Pour toute demande relative à l'hébergement, veuillez contacter hello@burgys.ga.</p>
          <h3>Propriété intellectuelle</h3>
          <p>L'ensemble du contenu de ce site (textes, images, vidéos, logos) est la propriété exclusive de BURGY'S SARL et est protégé par les lois relatives à la propriété intellectuelle.</p>
          <div className="legal-contact-box">
            <strong>CONTACT LÉGAL</strong>
            <p>Pour toute question d'ordre légal : hello@burgys.ga</p>
          </div>
        </section>

        <section className="legal-section" id="cgv">
          <h2>CONDITIONS GÉNÉRALES DE VENTE</h2>
          <h3>Objet</h3>
          <p>Les présentes CGV régissent les relations contractuelles entre BURGY'S SARL et ses clients dans le cadre de commandes passées sur place, à emporter ou en livraison.</p>
          <h3>Prix</h3>
          <p>Les prix sont affichés en Francs CFA (XAF) et sont inclusifs de toutes taxes applicables. BURGY'S se réserve le droit de modifier ses tarifs à tout moment.</p>
          <h3>Commandes</h3>
          <p>Toute commande est ferme et définitive dès sa confirmation. En cas d'erreur de commande, veuillez contacter immédiatement notre équipe.</p>
          <h3>Livraison</h3>
          <p>Les délais de livraison sont donnés à titre indicatif. BURGY'S ne saurait être tenu responsable des retards liés à des événements extérieurs (trafic, météo, etc.).</p>
        </section>

        <section className="legal-section" id="confidentialite">
          <h2>POLITIQUE DE CONFIDENTIALITÉ</h2>
          <h3>Collecte de données</h3>
          <p>BURGY'S collecte uniquement les données nécessaires au traitement de vos commandes et à l'amélioration de nos services. Ces données ne sont jamais vendues à des tiers.</p>
          <h3>Vos droits</h3>
          <ul>
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la portabilité</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : hello@burgys.ga</p>
          <h3>Conservation des données</h3>
          <p>Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernière interaction avec BURGY'S.</p>
        </section>

        <section className="legal-section" id="cookies">
          <h2>POLITIQUE COOKIES</h2>
          <h3>Qu'est-ce qu'un cookie ?</h3>
          <p>Un cookie est un petit fichier texte stocké sur votre appareil lors de votre navigation. Il permet d'améliorer votre expérience sur notre site.</p>
          <h3>Types de cookies utilisés</h3>
          <ul>
            <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
            <li><strong>Cookies analytiques :</strong> Pour analyser le trafic (anonymisé)</li>
            <li><strong>Cookies de préférences :</strong> Pour mémoriser vos choix</li>
          </ul>
          <h3>Gestion des cookies</h3>
          <p>Vous pouvez à tout moment modifier vos préférences cookies depuis les paramètres de votre navigateur.</p>
        </section>
      </main>
    </>
  )
}
