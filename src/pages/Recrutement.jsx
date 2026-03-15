import { useState } from 'react'

const offers = [
  { tag: 'CDI', tagStyle: 'y', title: 'Équipier(e) Polyvalent(e)', location: 'Libreville - Glass', type: 'Temps plein', desc: 'Au coeur de l\'action, tu participeras à la préparation des commandes, l\'accueil client et le maintien de la qualité Burgy\'s.' },
  { tag: 'CDI', tagStyle: '', title: 'Caissier(e)', location: 'Libreville - Glass', type: 'Temps partiel / Plein', desc: 'Tu seras le premier sourire que nos clients voient. Encaissement, prise de commande et fidélisation.' },
  { tag: 'STAGE', tagStyle: 'y', title: 'Assistant(e) Marketing', location: 'Libreville', type: 'Stage 3-6 mois', desc: 'Gestion des réseaux sociaux, création de contenu, campagnes promotionnelles. Un poste créatif au cœur de la marque.' },
]

export default function Recrutement() {
  const [form, setForm] = useState({ nom: '', email: '', tel: '', poste: '', message: '' })

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Candidature envoyée ! Nous vous contacterons rapidement.')
  }

  return (
    <>
      <style>{`
        .recrut-hero { background: var(--brand-red); color: #fff; padding: 140px 5% 80px; text-align: center; position: relative; overflow: hidden; }
        .recrut-hero::before { content: ''; position: absolute; inset: 0; background: url('/assets/img6.jpg') center/cover no-repeat; opacity: 0.12; }
        .recrut-hero-inner { position: relative; z-index: 1; }
        .recrut-hero h1 { font-family: var(--font-heading); font-size: clamp(3rem, 8vw, 6rem); line-height: 1; }
        .recrut-hero p { font-size: 1.2rem; margin-top: 1rem; opacity: 0.9; }
        .hero-cta { margin-top: 2rem; display: inline-block; background: var(--brand-yellow); color: var(--brand-red); font-family: var(--font-heading); font-size: 1.1rem; padding: 14px 36px; border-radius: 50px; transition: var(--transition); }
        .values-section { padding: 6rem 5%; text-align: center; }
        .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; margin: 3rem auto 0; max-width: 1100px; }
        .value-card { background: #fdf6ee; border-radius: 20px; padding: 2rem 1.5rem; border: 2px solid transparent; transition: var(--transition); }
        .value-card:hover { border-color: var(--brand-yellow); transform: translateY(-6px); }
        .value-icon { font-size: 2.8rem; margin-bottom: 1rem; }
        .value-card h3 { font-family: var(--font-heading); font-size: 1.3rem; color: var(--brand-red); margin-bottom: 0.6rem; }
        .value-card p { font-size: 0.9rem; color: #555; line-height: 1.7; }
        .offers-section { background: #f5ede0; padding: 6rem 5%; }
        .offers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 3rem auto 0; max-width: 1100px; }
        .offer-card { background: #fff; border-radius: 16px; padding: 2rem; border-left: 5px solid var(--brand-red); transition: var(--transition); }
        .offer-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(229,28,29,0.1); }
        .offer-tag { display: inline-block; background: var(--brand-red); color: #fff; font-size: 0.75rem; font-family: var(--font-heading); padding: 3px 12px; border-radius: 20px; margin-bottom: 0.8rem; }
        .offer-tag.y { background: var(--brand-yellow); color: var(--brand-red); }
        .offer-card h3 { font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.4rem; }
        .offer-meta { display: flex; gap: 1rem; flex-wrap: wrap; margin: 0.6rem 0 1rem; }
        .offer-meta span { font-size: 0.82rem; color: #777; }
        .offer-card p { font-size: 0.88rem; color: #555; line-height: 1.7; margin-bottom: 1.2rem; }
        .btn-postuler { display: inline-block; background: var(--brand-red); color: #fff; font-family: var(--font-heading); font-size: 0.95rem; padding: 9px 22px; border-radius: 30px; transition: var(--transition); cursor: pointer; border: none; }
        .btn-postuler:hover { background: #c01010; }
        .candidature-section { padding: 6rem 5%; }
        .candidature-inner { max-width: 680px; margin: 0 auto; }
        .recrut-form .form-group { margin-bottom: 1.4rem; }
        .recrut-form label { display: block; font-family: var(--font-heading); font-size: 0.9rem; color: var(--brand-red); margin-bottom: 0.4rem; letter-spacing: 0.5px; }
        .recrut-form input, .recrut-form select, .recrut-form textarea { width: 100%; padding: 12px 16px; border: 2px solid #e8d8c8; border-radius: 12px; font-family: var(--font-body); font-size: 0.95rem; background: #fdfaf5; transition: var(--transition); }
        .recrut-form input:focus, .recrut-form select:focus, .recrut-form textarea:focus { outline: none; border-color: var(--brand-red); }
        .recrut-form textarea { min-height: 120px; resize: vertical; }
      `}</style>

      <div className="recrut-hero">
        <div className="recrut-hero-inner">
          <h1>ON RECRUTE !</h1>
          <p>Rejoins l'aventure Burgy's et fais partie d'une équipe passionnée.</p>
          <a href="#offres" className="hero-cta">VOIR LES POSTES OUVERTS</a>
        </div>
      </div>

      <section className="values-section">
        <h2 className="section-title">POURQUOI NOUS REJOINDRE ?</h2>
        <div className="values-grid">
          {[
            { icon: '🚀', title: 'ÉVOLUTION RAPIDE', desc: 'Burgy\'s est en pleine croissance. Les opportunités de progression sont réelles et rapides.' },
            { icon: '🤝', title: 'ESPRIT D\'ÉQUIPE', desc: 'Une ambiance chaleureuse, une équipe soudée. On travaille dur mais on s\'amuse aussi.' },
            { icon: '📚', title: 'FORMATION', desc: 'Tu seras formé(e) dès ton premier jour. Nous investissons dans le développement de nos talents.' },
            { icon: '🍔', title: 'AVANTAGES EN NATURE', desc: 'Repas offerts pendant les shifts, réductions employés et bien plus.' },
          ].map(v => (
            <div className="value-card" key={v.title}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="offers-section" id="offres">
        <h2 className="section-title">NOS OFFRES D'EMPLOI</h2>
        <div className="offers-grid">
          {offers.map(o => (
            <div className="offer-card" key={o.title}>
              <span className={`offer-tag ${o.tagStyle}`}>{o.tag}</span>
              <h3>{o.title}</h3>
              <div className="offer-meta">
                <span>📍 {o.location}</span>
                <span>⏱ {o.type}</span>
              </div>
              <p>{o.desc}</p>
              <button className="btn-postuler" onClick={() => document.getElementById('candidature')?.scrollIntoView({ behavior: 'smooth' })}>POSTULER</button>
            </div>
          ))}
        </div>
      </section>

      <section className="candidature-section" id="candidature">
        <div className="candidature-inner">
          <h2 className="section-title" style={{ paddingTop: 0 }}>CANDIDATURE SPONTANÉE</h2>
          <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.7, fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>PAS DE POSTE CORRESPONDANT ? ENVOIE-NOUS TON CV QUAND MÊME !</p>
          <form className="recrut-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>NOM COMPLET *</label>
              <input type="text" name="nom" value={form.nom} onChange={handle} required placeholder="Votre nom et prénom" />
            </div>
            <div className="form-group">
              <label>EMAIL *</label>
              <input type="email" name="email" value={form.email} onChange={handle} required placeholder="votre@email.com" />
            </div>
            <div className="form-group">
              <label>TÉLÉPHONE</label>
              <input type="tel" name="tel" value={form.tel} onChange={handle} placeholder="+241 ..." />
            </div>
            <div className="form-group">
              <label>POSTE SOUHAITÉ</label>
              <select name="poste" value={form.poste} onChange={handle}>
                <option value="">Choisissez un poste...</option>
                <option>Équipier(e) Polyvalent(e)</option>
                <option>Caissier(e)</option>
                <option>Assistant(e) Marketing</option>
                <option>Candidature Spontanée</option>
              </select>
            </div>
            <div className="form-group">
              <label>MOTIVATION</label>
              <textarea name="message" value={form.message} onChange={handle} placeholder="Pourquoi voulez-vous rejoindre Burgy's ?" />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.1rem' }}>ENVOYER MA CANDIDATURE</button>
          </form>
        </div>
      </section>
    </>
  )
}
