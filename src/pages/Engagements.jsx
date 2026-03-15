export default function Engagements() {
  return (
    <>
      <style>{`
        .eng-hero { background: linear-gradient(135deg, #1a0a00 60%, #3d1200); color: #fff; padding: 140px 5% 80px; text-align: center; position: relative; overflow: hidden; }
        .eng-hero::after { content: '🌿'; font-size: 18rem; position: absolute; right: -3rem; bottom: -4rem; opacity: 0.05; pointer-events: none; }
        .eng-hero small { font-family: var(--font-heading); font-size: 1rem; letter-spacing: 4px; color: var(--brand-yellow); opacity: .9; }
        .eng-hero h1 { font-family: var(--font-heading); font-size: clamp(3rem, 8vw, 5.5rem); line-height: 1; margin: 0.4rem 0; }
        .eng-hero p { font-size: 1.1rem; opacity: .85; max-width: 560px; margin: 1rem auto 0; line-height: 1.7; }
        .eng-pillars { padding: 6rem 5%; background: #fff; }
        .pillars-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 1100px; margin: 3rem auto 0; }
        .pillar-card { border-radius: 20px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.07); transition: var(--transition); }
        .pillar-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
        .pillar-top { padding: 2.5rem 2rem 1.5rem; }
        .pillar-icon { font-size: 3rem; margin-bottom: 1rem; }
        .pillar-card h3 { font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.8rem; }
        .pillar-card p { font-size: 0.9rem; line-height: 1.75; opacity: .75; }
        .pillar-tag { display: inline-block; font-family: var(--font-heading); font-size: 0.75rem; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px; margin-top: 1.2rem; }
        .card-red { background: #fff5f5; } .card-red h3 { color: var(--brand-red); } .card-red .pillar-tag { background: var(--brand-red); color: #fff; }
        .card-yellow { background: #fffbef; } .card-yellow h3 { color: #b87800; } .card-yellow .pillar-tag { background: var(--brand-yellow); color: #3d1c00; }
        .card-green { background: #f0faf2; } .card-green h3 { color: #2d7a40; } .card-green .pillar-tag { background: #2d7a40; color: #fff; }
        .eng-story { background: #f5ede0; padding: 6rem 5%; }
        .eng-story-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .eng-story-text h2 { font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3rem); color: var(--brand-red); line-height: 1.1; margin-bottom: 1.5rem; }
        .eng-story-text p { font-size: .95rem; color: #444; line-height: 1.8; margin-bottom: 1rem; }
        .eng-story-visual { background: var(--brand-red); border-radius: 24px; padding: 3rem 2rem; text-align: center; color: #fff; }
        .eng-story-visual .big-num { font-family: var(--font-heading); font-size: 5rem; line-height: 1; color: var(--brand-yellow); }
        .eng-story-visual p { font-family: var(--font-heading); font-size: 1.1rem; letter-spacing: 1px; opacity: .9; }
        @media (max-width: 680px) { .eng-story-inner { grid-template-columns: 1fr; gap: 2rem; } }
        .eng-process { padding: 6rem 5%; background: #fff; }
        .process-steps { max-width: 800px; margin: 3rem auto 0; }
        .process-step { display: flex; gap: 1.5rem; margin-bottom: 2rem; align-items: flex-start; }
        .step-num { flex-shrink: 0; width: 52px; height: 52px; border-radius: 50%; background: var(--brand-red); color: #fff; font-family: var(--font-heading); font-size: 1.4rem; display: flex; align-items: center; justify-content: center; }
        .step-content h4 { font-family: var(--font-heading); font-size: 1.2rem; color: var(--brand-red); margin-bottom: 0.4rem; }
        .step-content p { font-size: 0.9rem; color: #555; line-height: 1.7; }
        .eng-certifs { padding: 6rem 5%; background: #1a0a00; color: #fff; text-align: center; }
        .eng-certifs h2 { font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 3.5rem); color: var(--brand-yellow); margin-bottom: 3rem; }
        .certifs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 900px; margin: 0 auto; }
        .certif-card { background: rgba(255,255,255,0.05); border-radius: 20px; padding: 2rem 1.5rem; border: 1px solid rgba(255,255,255,0.1); }
        .certif-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .certif-card h4 { font-family: var(--font-heading); font-size: 1.1rem; color: var(--brand-yellow); margin-bottom: 0.5rem; }
        .certif-card p { font-size: 0.82rem; opacity: .7; line-height: 1.6; }
      `}</style>

      <div className="eng-hero">
        <small>NOTRE PHILOSOPHIE</small>
        <h1>NOS ENGAGEMENTS<br />QUALITÉ</h1>
        <p>Chez Burgy's, chaque burger est une promesse : des ingrédients frais, sourcés localement, préparés avec soin dans le respect des plus hautes normes d'hygiène.</p>
      </div>

      <section className="eng-pillars">
        <h2 className="section-title">NOS 3 PILIERS</h2>
        <div className="pillars-grid">
          <div className="pillar-card card-red">
            <div className="pillar-top">
              <div className="pillar-icon">🥩</div>
              <h3>QUALITÉ & FRAÎCHEUR</h3>
              <p>Nos viandes arrivent chaque matin. Aucun produit congelé, aucun compromis sur la fraîcheur. Votre burger est préparé à la commande.</p>
              <span className="pillar-tag">100% FRAIS</span>
            </div>
          </div>
          <div className="pillar-card card-yellow">
            <div className="pillar-top">
              <div className="pillar-icon">🌍</div>
              <h3>ORIGINES LOCALES</h3>
              <p>Nous favorisons les producteurs locaux gabonais. Légumes du marché de Libreville, pains de nos boulangers partenaires.</p>
              <span className="pillar-tag">MADE IN GABON</span>
            </div>
          </div>
          <div className="pillar-card card-green">
            <div className="pillar-top">
              <div className="pillar-icon">🧼</div>
              <h3>HYGIÈNE & SÉCURITÉ</h3>
              <p>Notre cuisine est inspectée régulièrement. Nos équipes sont formées aux normes HACCP. Votre sécurité alimentaire est notre priorité.</p>
              <span className="pillar-tag">CERTIFIÉ HACCP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="eng-story">
        <div className="eng-story-inner">
          <div className="eng-story-text">
            <h2>POURQUOI ON FAIT ÇA ?</h2>
            <p>Burgy's est né d'une conviction simple : Libreville mérite un vrai fast-food de qualité. Un endroit où la rapidité ne sacrifie pas le goût, où chaque client repart avec le sourire.</p>
            <p>On s'est inspiré des meilleures enseignes mondiales tout en gardant une âme 100% gabonaise. Chaque recette a été testée des dizaines de fois pour atteindre la perfection.</p>
          </div>
          <div className="eng-story-visual">
            <div className="big-num">100%</div>
            <p>FRAIS CHAQUE JOUR</p>
            <div className="big-num" style={{ marginTop: '2rem' }}>0</div>
            <p>PRODUIT CONGELÉ</p>
          </div>
        </div>
      </section>

      <section className="eng-process" id="hygiene">
        <h2 className="section-title">NOTRE PROCESSUS QUALITÉ</h2>
        <div className="process-steps">
          {[
            { title: 'SÉLECTION DES FOURNISSEURS', desc: 'Nous auditons chaque fournisseur avant de le référencer. Critères de fraîcheur, traçabilité et respect des normes locales.' },
            { title: 'RÉCEPTION QUOTIDIENNE', desc: 'Chaque matin à 8h, notre chef contrôle les livraisons. Température, aspect, dates de péremption — tout est vérifié.' },
            { title: 'PRÉPARATION À LA COMMANDE', desc: 'Chaque burger est smashé au moment de votre commande. Jamais de précuisson, jamais d\'attente prolongée.' },
            { title: 'CONTRÔLE FINAL', desc: 'Avant de partir en salle, chaque assiette est inspectée. Présentation, cuisson, garnitures — la perfection à chaque fois.' },
          ].map((step, i) => (
            <div className="process-step" key={i}>
              <div className="step-num">{i + 1}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="eng-certifs">
        <h2>NOS CERTIFICATIONS</h2>
        <div className="certifs-grid">
          {[
            { icon: '🏆', title: 'HACCP', desc: 'Système d\'analyse des dangers et points critiques pour leur maîtrise.' },
            { icon: '🌡️', title: 'CHAÎNE DU FROID', desc: 'Contrôle continu des températures de stockage et de transport.' },
            { icon: '🔍', title: 'TRAÇABILITÉ', desc: 'Chaque ingrédient est tracé de la source à votre assiette.' },
            { icon: '♻️', title: 'ÉCO-RESPONSABLE', desc: 'Emballages recyclables et réduction des déchets alimentaires.' },
          ].map(c => (
            <div className="certif-card" key={c.title}>
              <div className="certif-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
