import { Link } from 'react-router-dom'

export default function EnConstruction() {
  return (
    <main className="construction-container">
      <div className="construction-icon">🚧</div>
      <h1 className="construction-title">PAGE EN CONSTRUCTION</h1>
      <p className="construction-p">
        Cette fonctionnalité est en cours de développement.<br />
        Revenez bientôt, on travaille dur pour vous !
      </p>
      <Link to="/" className="btn-primary">RETOUR À L'ACCUEIL</Link>
    </main>
  )
}
