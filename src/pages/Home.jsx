import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const carouselRef = useRef(null)
  const currentSlide = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Instagram carousel
    const carousel = carouselRef.current
    if (!carousel) return

    const items = carousel.querySelectorAll('.instagram-carousel-item')
    const dots = document.querySelectorAll('.dot')

    const goTo = (index) => {
      currentSlide.current = index
      carousel.style.transform = `translateX(-${index * 100}%)`
      dots.forEach((d, i) => d.classList.toggle('active', i === index))
      items.forEach((item, i) => {
        const video = item.querySelector('video')
        if (!video) return
        if (i === index) { video.play() } else { video.pause() }
      })
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(Number(dot.dataset.index)))
    })

    intervalRef.current = setInterval(() => {
      goTo((currentSlide.current + 1) % items.length)
    }, 4000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <>
      {/* Hero */}
      <header className="hero">
        <video autoPlay muted loop playsInline className="hero-bg">
          <source src="/assets/restaurant_spot.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>L'EXPÉRIENCE BURGY'S<br /><span>Les meilleurs burgers de Libreville</span></h1>
          <p>VENEZ VIVRE L'INSTANT DANS NOTRE RESTAURANT.</p>
          <div className="hero-btns">
            <Link to="/nos-produits" className="btn-primary">NOTRE CARTE</Link>
            <a href="#restaurants" className="btn-primary outline-button">NOTRE RESTAURANT</a>
          </div>
        </div>
      </header>

      {/* En ce moment */}
      <section id="nouveaute" className="promo-section" style={{ background: '#fff' }}>
        <h2 className="section-title">EN CE MOMENT</h2>
        <div className="promo-grid">
          <div className="promo-card">
            <img src="/assets/Capture d'écran 2026-03-05 à 19.06.07.png" alt="Promo 1" />
            <div className="promo-overlay">
              <h3 style={{ fontSize: '2.5rem' }}>Nos burgers irrésistibles</h3>
              <p>Découvrez nos burgers irrésistibles.</p>
            </div>
          </div>
          <div className="promo-card">
            <img src="/assets/Capture d'écran 2026-03-05 à 18.45.09.png" alt="Promo 2" />
            <div className="promo-overlay">
              <h3 style={{ fontSize: '2.5rem' }}>LE SMASH ULTIME</h3>
              <p>Croustillant, fondant, inoubliable.</p>
            </div>
          </div>
          <div className="promo-card">
            <img src="/assets/Capture d'écran 2026-03-05 à 19.03.38.png" alt="Promo 3" />
            <div className="promo-overlay">
              <h3 style={{ fontSize: '2.5rem' }}>Nos accompagnements gourmands</h3>
              <p>La touche finale parfaite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="instagram-promo-section">
        <div className="instagram-content">
          <div className="instagram-video-wrapper">
            <div className="instagram-video-container">
              <div className="instagram-carousel" ref={carouselRef}>
                {[1, 2, 3, 4].map(n => (
                  <div className="instagram-carousel-item" key={n}>
                    <video muted loop playsInline>
                      <source src={`/assets/social_${n}.mp4`} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-dots">
              {[0, 1, 2, 3].map(i => (
                <span key={i} className={`dot ${i === 0 ? 'active' : ''}`} data-index={i}></span>
              ))}
            </div>
          </div>
          <div className="instagram-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-red)' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <h2 style={{ marginBottom: 0 }}>INSTAGRAM</h2>
            </div>
            <span className="handle">@BURGYS.GABON</span>
            <p style={{ fontSize: '1.5rem', maxWidth: '500px', marginBottom: '2rem', opacity: 0.8 }}>
              Découvrez les coulisses de Burgy's en images et en vidéos. Partagez vos meilleurs moments avec nous !
            </p>
            <a href="https://www.instagram.com/burgys.gabon/" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#fff', color: '#000' }}>NOUS SUIVRE</a>
          </div>
        </div>
      </section>

      {/* Notre carte gourmet */}
      <section className="section-light" style={{ padding: '6rem 5%', textAlign: 'center', background: '#fdfaf5' }}>
        <h2 className="section-title">NOTRE CARTE GOURMET</h2>
        <p style={{ fontSize: '1.5rem', margin: '0 auto 4rem', opacity: 0.7, fontFamily: 'var(--font-heading)', letterSpacing: '2px', textAlign: 'center', maxWidth: '800px' }}>
          DES PRODUITS FRAIS. UN GOÛT UNIQUE. L'EXPÉRIENCE BURGY'S.
        </p>
        <div className="category-grid">
          <div className="category-item" onClick={() => window.location.href = '/nos-produits/burgers'} style={{ cursor: 'pointer' }}>
            <img src="/logos/image-removebg-preview (3).png" alt="Burgers" />
            <div className="category-label">BURGERS</div>
          </div>
          <div className="category-item" onClick={() => window.location.href = '/en-construction'} style={{ cursor: 'pointer' }}>
            <img src="/logos/image-removebg-preview (1) copie.png" alt="Menus" />
            <div className="category-label">MENUS</div>
          </div>
          <div className="category-item" onClick={() => window.location.href = '/en-construction'} style={{ cursor: 'pointer' }}>
            <img src="/logos/image-removebg-preview (4) copie 2.png" alt="Frites" />
            <div className="category-label">FRITES & SALADES</div>
          </div>
          <div className="category-item" onClick={() => window.location.href = '/en-construction'} style={{ cursor: 'pointer' }}>
            <img src="/logos/image-removebg-preview (3) copie 3.png" alt="Desserts" />
            <div className="category-label">DESSERTS</div>
          </div>
        </div>
        <Link to="/nos-produits" className="btn-dark" style={{ marginTop: '4rem', display: 'inline-block' }}>VOIR TOUTE LA CARTE</Link>
      </section>

      {/* Carte / Map */}
      <section id="restaurants" className="map-section">
        <iframe
          className="google-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.08832049448!2d9.44476025!3d0.3801265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107f3b8b98357f0f%3A0xc3f8b88888888888!2sGlass%2C%20Libreville!5e0!3m2!1sfr!2sga!4v1709800000000!5m2!1sfr!2sga"
          allowFullScreen=""
          loading="lazy"
          title="Carte restaurant"
        ></iframe>
        <div className="map-card">
          <h3>NOTRE RESTAURANT</h3>
          <p style={{ marginBottom: '2rem' }}>Retrouvez le goût Burgy's près de chez vous. Localisation, horaires et services.</p>
          <div className="location-info">
            <p><strong>LIBREVILLE - GLASS</strong></p>
            <p>Après KFC, en plein cœur de la ville</p>
            <p style={{ marginTop: '1rem', color: '#666' }}>Ouvert 7j/7 • 11h00 - 23h00</p>
          </div>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '2rem', width: '100%', textAlign: 'center', display: 'block' }}>Y ALLER</a>
        </div>
      </section>

      {/* Avis */}
      <section className="reviews-section" style={{ padding: '8rem 5%', background: '#fff' }}>
        <h2 className="section-title" style={{ marginBottom: '4rem' }}>CE QUE NOS CLIENTS EN DISENT</h2>
        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'Jean-Paul M.', date: 'Il y a 2 jours', text: '"Les meilleurs burgers de LBV sans hésiter. Le pain est incroyable et le service super rapide."' },
            { name: 'Sarah L.', date: 'Il y a 1 semaine', text: '"Le Smash Burger est une tuerie ! Ambiance sympa et propreté impeccable."' },
            { name: 'Marc O.', date: 'Il y a 3 jours', text: '"Enfin un vrai fast-food de qualité à Glass. Je recommande vivement le Spicy Chicken."' },
          ].map(r => (
            <div key={r.name} className="review-card" style={{ padding: '2.5rem', background: '#fdfaf5', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: '5px', color: '#ffc72d', marginBottom: '1rem' }}>
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem' }}>{r.text}</p>
              <p><strong>{r.name}</strong> <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>- {r.date}</span></p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', margin: '4rem 0' }}>
          <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="btn-dark" style={{ fontSize: '1.2rem' }}>LIRE PLUS D'AVIS GOOGLE</a>
        </div>
      </section>

      {/* Recrutement */}
      <section className="recruitment-section">
        <div className="recruitment-card">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>ON RECRUTE !</h2>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Envie de rejoindre l'aventure Burgy's ?<br />Déposez votre candidature en ligne.</p>
          <Link to="/recrutement" className="btn-small" style={{ background: 'var(--brand-yellow)', color: 'var(--brand-red)', marginTop: '2rem', display: 'inline-block' }}>POSTULER</Link>
        </div>
      </section>
    </>
  )
}
