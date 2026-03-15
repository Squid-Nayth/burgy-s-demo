import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import SideMenu from './components/SideMenu'
import Footer from './components/Footer'

import Home from './pages/Home'
import NosProduits from './pages/NosProduits'
import CategorieBurgers from './pages/CategorieBurgers'
import CategorieMenus from './pages/CategorieMenus'
import CategorieFrites from './pages/CategorieFrites'
import CategorieBoissons from './pages/CategorieBoissons'
import CategorieDesserts from './pages/CategorieDesserts'
import CategorieSucreries from './pages/CategorieSucreries'
import CategorieSauces from './pages/CategorieSauces'
import ProduitDetail from './pages/ProduitDetail'
import Reservation from './pages/Reservation'
import Contact from './pages/Contact'
import Engagements from './pages/Engagements'
import Recrutement from './pages/Recrutement'
import Fidelite from './pages/Fidelite'
import Allergenes from './pages/Allergenes'
import MentionsLegales from './pages/MentionsLegales'
import EnConstruction from './pages/EnConstruction'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
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
          <Route path="/nos-produits" element={<NosProduits />} />
          <Route path="/nos-produits/burgers" element={<CategorieBurgers />} />
          <Route path="/nos-produits/menus" element={<CategorieMenus />} />
          <Route path="/nos-produits/frites" element={<CategorieFrites />} />
          <Route path="/nos-produits/boissons" element={<CategorieBoissons />} />
          <Route path="/nos-produits/desserts" element={<CategorieDesserts />} />
          <Route path="/nos-produits/sucreries" element={<CategorieSucreries />} />
          <Route path="/nos-produits/sauces" element={<CategorieSauces />} />
          <Route path="/nos-produits/burgers/:slug" element={<ProduitDetail />} />
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
