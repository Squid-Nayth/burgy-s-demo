export default function Fidelite() {
  const levels = [
    { badge: '🥉', name: 'BRONZE', pts: '0 – 499 pts', color: '#cd7f32', bg: '#fff8f0', perks: ['5% de réduction', 'Offre anniversaire', 'Accès early deals'] },
    { badge: '🥈', name: 'SILVER', pts: '500 – 1499 pts', color: '#aaa', bg: '#f8f8f8', perks: ['10% de réduction', 'Boisson offerte /mois', 'File prioritaire', 'Invitations events'] },
    { badge: '🥇', name: 'GOLD', pts: '1500 – 2999 pts', color: '#ffc72d', bg: '#fffbef', perks: ['15% de réduction', 'Burger offert /mois', 'Livraison gratuite', 'Menu spécial Gold'] },
    { badge: '💎', name: 'DIAMOND', pts: '3000+ pts', color: '#00bcd4', bg: '#f0feff', perks: ['20% de réduction', 'Accès VIP', 'Chef\'s table', 'Cadeaux exclusifs'] },
  ]

  return (
    <>
      <style>{`
        .fid-hero { background: linear-gradient(135deg, #1a0800 50%, #3a0f00); color: #fff; padding: 140px 5% 80px; text-align: center; position: relative; overflow: hidden; }
        .fid-hero::before { content: '⭐'; font-size: 20rem; position: absolute; top: -4rem; left: -4rem; opacity: 0.05; pointer-events: none; }
        .fid-hero-inner { position: relative; z-index: 1; }
        .fid-hero small { font-family: var(--font-heading); letter-spacing: 4px; color: var(--brand-yellow); font-size: 0.95rem; }
        .fid-hero h1 { font-family: var(--font-heading); font-size: clamp(3rem, 8vw, 6rem); line-height: 1; margin: 0.4rem 0; }
        .fid-hero h1 span { color: var(--brand-yellow); }
        .fid-hero p { font-size: 1.1rem; opacity: .85; max-width: 500px; margin: 1rem auto; }
        .fid-badge { display: inline-block; margin-top: 2rem; background: var(--brand-yellow); color: #1a0800; font-family: var(--font-heading); font-size: 1rem; padding: 10px 28px; border-radius: 50px; letter-spacing: 1px; }
        .fid-coming-banner { background: var(--brand-yellow); text-align: center; padding: 1rem; font-family: var(--font-heading); font-size: 1rem; color: var(--brand-red); letter-spacing: 1px; }
        .fid-how { padding: 6rem 5%; text-align: center; }
        .fid-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0; max-width: 900px; margin: 4rem auto 0; position: relative; }
        .fid-steps::before { content: ''; position: absolute; top: 40px; left: 10%; right: 10%; height: 2px; background: linear-gradient(to right, var(--brand-red), var(--brand-yellow)); z-index: 0; }
        @media (max-width: 640px) { .fid-steps::before { display: none; } }
        .fid-step { position: relative; z-index: 1; padding: 0 1.5rem; text-align: center; }
        .step-circle { width: 80px; height: 80px; border-radius: 50%; background: var(--brand-red); color: #fff; font-family: var(--font-heading); font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: 0 6px 20px rgba(229,28,29,0.4); transition: var(--transition); }
        .fid-step:hover .step-circle { transform: scale(1.1); }
        .fid-step h3 { font-family: var(--font-heading); font-size: 1.2rem; color: var(--brand-red); margin-bottom: 0.5rem; }
        .fid-step p { font-size: 0.88rem; color: #555; line-height: 1.65; }
        .fid-levels { background: #1a0800; padding: 6rem 5%; }
        .fid-levels h2 { font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 3.5rem); color: var(--brand-yellow); text-align: center; margin-bottom: 3rem; }
        .levels-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; max-width: 1000px; margin: 0 auto; }
        .level-card { border-radius: 20px; padding: 2rem 1.5rem; text-align: center; transition: var(--transition); }
        .level-card:hover { transform: translateY(-6px); }
        .level-badge { font-size: 3rem; margin-bottom: 1rem; }
        .level-card h3 { font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.4rem; }
        .level-card .pts { font-family: var(--font-heading); font-size: 0.85rem; letter-spacing: 1px; margin-bottom: 1.2rem; opacity: .7; }
        .level-card ul { list-style: none; padding: 0; font-size: 0.85rem; line-height: 1.8; }
        .level-card ul li::before { content: '✓ '; }
      `}</style>

      <div className="fid-hero">
        <div className="fid-hero-inner">
          <small>BURGY'S REWARDS</small>
          <h1>PROGRAMME <span>FIDÉLITÉ</span></h1>
          <p>Chaque burger te rapproche d'une récompense. Accumule des points, monte de niveau et profite d'avantages exclusifs.</p>
          <span className="fid-badge">BIENTÔT DISPONIBLE</span>
        </div>
      </div>

      <div className="fid-coming-banner">⚙️ APPLICATION EN COURS DE DÉVELOPPEMENT — RESTEZ CONNECTÉS !</div>

      <section className="fid-how">
        <h2 className="section-title">COMMENT ÇA MARCHE ?</h2>
        <div className="fid-steps">
          {[
            { num: '1', title: 'COMMANDE', desc: 'Tu passes ta commande au restaurant ou en ligne.' },
            { num: '2', title: 'GAGNE DES POINTS', desc: '1 CFA dépensé = 1 point. Simple et transparent.' },
            { num: '3', title: 'MONTE DE NIVEAU', desc: 'Plus tu accumules, plus ton statut évolue.' },
            { num: '4', title: 'PROFITE !', desc: 'Échange tes points contre des réductions et cadeaux.' },
          ].map(s => (
            <div className="fid-step" key={s.num}>
              <div className="step-circle">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fid-levels">
        <h2>LES NIVEAUX</h2>
        <div className="levels-grid">
          {levels.map(l => (
            <div className="level-card" key={l.name} style={{ background: l.bg }}>
              <div className="level-badge">{l.badge}</div>
              <h3 style={{ color: l.color }}>{l.name}</h3>
              <p className="pts" style={{ color: l.color }}>{l.pts}</p>
              <ul style={{ color: '#444' }}>
                {l.perks.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
