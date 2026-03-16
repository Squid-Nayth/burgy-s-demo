import { useState } from 'react'
import PageHeader from '../components/PageHeader'

export default function Reservation() {
  const [form, setForm] = useState({ datetime: '', persons: 4, location: 'SALLE_INTERIEURE', occasion: 'amis', deco: false, musique: false, menu: false })

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Réservation envoyée ! Nous vous confirmerons par téléphone.')
  }

  return (
    <>
      <PageHeader title="COIN PERSONNALISÉ" subtitle="RÉSERVEZ VOTRE EXPÉRIENCE BURGY'S" />
      <section id="reservation" className="section-light reservation-section">
          {/* Formulaire */}
          <div className="booking-form-container">
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>DATE & HEURE</label>
                  <input type="datetime-local" name="datetime" value={form.datetime} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label>NB PERSONNES</label>
                  <input type="number" name="persons" min="1" max="50" value={form.persons} onChange={handle} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>EMPLACEMENT</label>
                  <select name="location" value={form.location} onChange={handle}>
                    <option value="SALLE_INTERIEURE">SALLE INTÉRIEURE (Climatisée)</option>
                    <option value="TERRASSE">TERRASSE (Air libre)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>OCCASION</label>
                  <select name="occasion" value={form.occasion} onChange={handle}>
                    <option value="amis">Repas entre amis / Famille</option>
                    <option value="anniversaire">Anniversaire 🎂</option>
                    <option value="groupe">Sortie Groupe / After School</option>
                    <option value="etudiant">Soirée Étudiant (+ Réduction)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>OPTIONS AMBIANCE</label>
                <div className="checks" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <label><input type="checkbox" name="deco" checked={form.deco} onChange={handle} /> Décoration simple</label>
                  <label><input type="checkbox" name="musique" checked={form.musique} onChange={handle} /> Choix de la musique</label>
                  <label><input type="checkbox" name="menu" checked={form.menu} onChange={handle} /> Menu groupe sur mesure</label>
                </div>
              </div>
              <button type="submit" className="btn-primary w-100">VALIDER LA RÉSERVATION</button>
            </form>
          </div>
      </section>
    </>
  )
}
