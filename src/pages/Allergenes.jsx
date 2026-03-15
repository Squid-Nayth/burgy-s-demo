const allergens = ['Gluten', 'Crustacés', 'Œufs', 'Poissons', 'Arachides', 'Soja', 'Lait', 'Fruits à coque', 'Céleri', 'Moutarde', 'Sésame', 'SO2', 'Lupin', 'Mollusques']

const ck = '✔' // contient
const no = '·' // absent
const mb = '?' // peut contenir

const data = [
  {
    cat: '🍔 BURGERS',
    items: [
      { name: 'Le Classique Smashé', alg: [ck, no, ck, no, no, ck, ck, no, no, ck, no, no, no, no] },
      { name: 'Le Spicy Chicken', alg: [ck, no, ck, no, no, ck, ck, no, no, ck, no, no, no, no] },
      { name: 'Le Big Burgy XXL', alg: [ck, no, ck, no, no, ck, ck, mb, no, ck, no, no, no, no] },
    ]
  },
  {
    cat: '🍟 FRITES & ACCOMPAGNEMENTS',
    items: [
      { name: 'Frites croustillantes', alg: [no, no, no, no, no, no, no, no, no, no, no, no, no, no] },
      { name: 'Onion rings', alg: [ck, no, ck, no, no, no, no, no, no, no, no, no, no, no] },
    ]
  },
  {
    cat: '🥤 BOISSONS',
    items: [
      { name: 'Coca-Cola', alg: [no, no, no, no, no, no, no, no, no, no, no, no, no, no] },
      { name: 'Milkshake Vanille', alg: [no, no, ck, no, no, no, ck, no, no, no, no, no, no, no] },
    ]
  },
]

export default function Allergenes() {
  return (
    <>
      <style>{`
        .allerg-hero { background: #1a1a1a; color: #fff; padding: 130px 5% 60px; text-align: center; position: relative; overflow: hidden; }
        .allerg-hero::after { content: '⚠️'; font-size: 16rem; position: absolute; right: 2%; bottom: -3rem; opacity: 0.04; }
        .allerg-hero small { font-family: var(--font-heading); letter-spacing: 4px; color: var(--brand-yellow); font-size: .95rem; }
        .allerg-hero h1 { font-family: var(--font-heading); font-size: clamp(2.5rem, 7vw, 5rem); line-height: 1; position: relative; z-index: 1; }
        .allerg-hero p { font-size: 1rem; opacity: .8; margin-top: 1rem; max-width: 580px; margin: 1rem auto 0; line-height: 1.7; }
        .allerg-warning { background: #fff3cd; border-left: 5px solid #ffc107; padding: 1.5rem 2rem; max-width: 900px; margin: 3rem auto 0; border-radius: 0 12px 12px 0; font-size: .9rem; color: #664d03; line-height: 1.7; }
        .allerg-warning strong { display: block; font-family: var(--font-heading); font-size: 1rem; margin-bottom: .4rem; }
        .allerg-body { max-width: 960px; margin: 0 auto; padding: 3rem 5% 6rem; overflow-x: auto; }
        .allerg-category { margin-bottom: 3.5rem; }
        .allerg-category h2 { font-family: var(--font-heading); font-size: 1.8rem; color: var(--brand-red); margin-bottom: 1.2rem; padding-bottom: .6rem; border-bottom: 3px solid var(--brand-yellow); display: flex; align-items: center; gap: .6rem; }
        .allerg-table { width: 100%; border-collapse: collapse; font-size: .85rem; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,.06); }
        .allerg-table thead { background: var(--brand-red); color: #fff; }
        .allerg-table thead th { padding: 12px 8px; text-align: center; font-family: var(--font-heading); font-size: .75rem; letter-spacing: .5px; white-space: nowrap; }
        .allerg-table thead th:first-child { text-align: left; padding-left: 14px; }
        .allerg-table tbody tr:nth-child(even) { background: #fdf6ee; }
        .allerg-table tbody tr:hover { background: #ffeedd; }
        .allerg-table td { padding: 11px 8px; border-bottom: 1px solid #f0e0d0; text-align: center; }
        .allerg-table td:first-child { text-align: left; font-family: var(--font-heading); font-size: .9rem; padding-left: 14px; }
        .allerg-table tr:last-child td { border-bottom: none; }
        .ck { color: var(--brand-red); font-size: 1.1rem; font-weight: bold; }
        .no { color: #ccc; }
        .mb { color: #f5a623; font-size: 1.1rem; }
        .allerg-key { display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem; font-size: .85rem; padding: 0 5%; max-width: 960px; margin: 2rem auto; }
        .allerg-key span { display: flex; align-items: center; gap: .5rem; }
      `}</style>

      <div className="allerg-hero">
        <small>INFORMATION CONSOMMATEURS</small>
        <h1>ALLERGÈNES &<br />VALEURS NUTRITIONNELLES</h1>
        <p>Votre santé nous tient à cœur. Retrouvez ici le détail des allergènes présents dans chacun de nos produits.</p>
      </div>

      <div className="allerg-warning">
        <strong>⚠️ AVERTISSEMENT IMPORTANT</strong>
        Nos produits sont préparés dans un environnement où des allergènes peuvent être présents. En cas d'allergie sévère, veuillez contacter notre équipe avant de commander. Les informations ci-dessous sont données à titre indicatif et peuvent évoluer.
      </div>

      <div className="allerg-key">
        <span><span className="ck">✔</span> Contient</span>
        <span><span className="no">·</span> Absent</span>
        <span><span className="mb">?</span> Peut contenir (traces)</span>
      </div>

      <main className="allerg-body">
        {data.map(cat => (
          <div className="allerg-category" key={cat.cat}>
            <h2>{cat.cat}</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="allerg-table">
                <thead>
                  <tr>
                    <th>PRODUIT</th>
                    {allergens.map(a => <th key={a}>{a}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map(item => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      {item.alg.map((v, i) => (
                        <td key={i} className={v === ck ? 'ck' : v === mb ? 'mb' : 'no'}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}
