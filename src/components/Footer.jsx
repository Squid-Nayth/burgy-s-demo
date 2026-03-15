import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-structured">
        <h2 className="footer-brand">BURGY'S</h2>

        <div className="footer-grid-bio">
          <div className="footer-col-bio">
            <h4>SUIVEZ-NOUS :)</h4>
            <ul>
              <li><a href="https://www.instagram.com/burgys.gabon/" target="_blank" rel="noreferrer">INSTAGRAM</a></li>
              <li><a href="#">TIKTOK</a></li>
            </ul>
          </div>

          <div className="footer-col-bio">
            <h4>L'UNIVERS BURGY'S</h4>
            <ul>
              <li><Link to="/nos-produits">MENU</Link></li>
              <li><Link to="/engagements">ENGAGEMENTS</Link></li>
              <li><Link to="/reservation">FAMILLE</Link></li>
              <li><Link to="/fidelite">FIDÉLITÉ</Link></li>
              <li><Link to="/contact">SAV</Link></li>
            </ul>
          </div>

          <div className="footer-col-bio">
            <h4>OÙ SOMMES-NOUS ?</h4>
            <ul>
              <li><Link to="/#restaurants">LIBREVILLE - GLASS</Link></li>
              <li><span style={{ opacity: 0.5 }}>PROCHAINEMENT...</span></li>
            </ul>
          </div>

          <div className="footer-col-bio">
            <h4>INFOS</h4>
            <ul style={{ opacity: 0.9 }}>
              <li><Link to="/contact">FAQ</Link></li>
              <li><Link to="/engagements">ORIGINES & QUALITÉ</Link></li>
              <li><Link to="/engagements">HYGIÈNE & SÉCURITÉ</Link></li>
              <li><Link to="/mentions-legales">MENTIONS LÉGALES</Link></li>
              <li><Link to="/mentions-legales#cgv">CGV</Link></li>
              <li><Link to="/mentions-legales#confidentialite">CONFIDENTIALITÉ</Link></li>
              <li><Link to="/recrutement">RECRUTEMENT</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-legal" style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.9rem', color: '#888' }}>&copy; 2026 BURGY'S. TOUS DROITS RÉSERVÉS.</div>
          <div className="figma-mention" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '0.9rem' }}>
            <span>BUILD BY FIGMA</span>
            <svg width="16" height="24" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 28.5C19 25.9837 20.0009 23.5706 21.7825 21.7891C23.564 20.0075 25.9771 19.0066 28.4934 19.0066C31.0098 19.0066 33.4229 20.0075 35.2044 21.7891C36.9859 23.5706 37.9868 25.9837 37.9868 28.5L37.9868 37.9934L28.4934 37.9934C25.9771 37.9934 23.564 36.9925 21.7825 35.211C20.0009 33.4294 19 31.0163 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.4868C0 44.9704 1.00088 42.5573 2.78248 40.7758C4.56407 38.9942 6.97715 37.9934 9.49346 37.9934H18.9869V47.4868C18.9869 49.9982 17.988 52.4068 16.21 54.1818C14.4319 55.9567 12.0216 56.954 9.51016 56.954C7.00355 56.9531 4.59966 55.9549 2.8226 54.1793C1.04555 52.4037 0.0455141 50.0007 0 47.4868Z" fill="#0ACF83"/>
              <path d="M0 28.5C0 25.9837 1.00088 23.5706 2.78248 21.7891C4.56407 20.0075 6.97715 19.0066 9.49346 19.0066H18.9869V37.9934H9.49346C6.97715 37.9934 4.56407 36.9925 2.78248 35.211C1.00088 33.4294 0 31.0163 0 28.5Z" fill="#A259FF"/>
              <path d="M0 9.5C0 6.98369 1.00088 4.57059 2.78248 2.78906C4.56407 1.00753 6.97715 0.0065918 9.49346 0.0065918H18.9869V19.0066H9.49346C6.97715 19.0066 4.56407 18.0057 2.78248 16.2241C1.00088 14.4426 0 12.0295 0 9.5Z" fill="#F24E1E"/>
              <path d="M19 0.0065918L28.4984 0.0065918C31.0135 0.0065918 33.4254 1.00693 35.2061 2.78762C36.9868 4.56832 37.9871 6.98021 37.9871 9.49533C37.9871 12.0104 36.9868 14.4223 35.2061 16.203C33.4254 17.9837 31.0135 18.9841 28.4984 18.9841L19 18.9841V0.0065918Z" fill="#FF7262"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  )
}
