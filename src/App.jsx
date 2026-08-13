import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Founder from './components/Founder'
import Services from './components/Services'
import Clients from './components/Clients'
import Reviews from './components/Reviews'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Section 2: Hero */}
      <Hero />

      {/* Section 3: About */}
      <About />

      {/* Section 4: Founder */}
      <Founder />

      {/* Section 5: Services */}
      <Services />

      {/* Section 6: Clients */}
      <Clients />

      {/* Section 7: Reviews */}
      <Reviews />

      {/* Section 8: Contact & Footer */}
      <Contact />
    </div>
  )
}
