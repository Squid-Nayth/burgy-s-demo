import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import SideMenu from './components/SideMenu'
import Footer from './components/Footer'

import Home from './pages/Home'
import NosProduits from './pages/NosProduits'
import ProduitDetail from './pages/ProduitDetail'
import Reservation from './pages/Reservation'
import Contact from './pages/Contact'
import Engagements from './pages/Engagements'
import Recrutement from './pages/Recrutement'
import Fidelite from './pages/Fidelite'
import Allergenes from './pages/Allergenes'
import MentionsLegales from './pages/MentionsLegales'
import EnConstruction from './pages/EnConstruction'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Ne pas remonter en haut lors des changements de catégorie dans /nos-produits
    if (pathname.startsWith('/nos-produits')) return
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <SideMenu />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Toute la carte dans une seule page, catégorie optionnelle dans l'URL */}
          <Route path="/nos-produits" element={<NosProduits />} />
          <Route path="/nos-produits/:categorie" element={<NosProduits />} />

          {/* Détail produit */}
          <Route path="/nos-produits/:categorie/:slug" element={<ProduitDetail />} />

          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/engagements" element={<Engagements />} />
          <Route path="/recrutement" element={<Recrutement />} />
          <Route path="/fidelite" element={<Fidelite />} />
          <Route path="/allergenes" element={<Allergenes />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/en-construction" element={<EnConstruction />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
