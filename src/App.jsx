import Hero from './Hero.jsx'
import Header from './Header.jsx'
import Services from './Services.jsx'
import Spiral from './Spiral.jsx'
import Tiers from './Tiers.jsx'
import Compare from './Compare.jsx'
import Process from './Process.jsx'
import Expect from './Expect.jsx'
import { Cta, Footer } from './Cta.jsx'

// Add FillTheFloor's contact email here; until then the buttons scroll to the contact section.
const EMAIL = ''
const MAIL = EMAIL ? `mailto:${EMAIL}?subject=FillTheFloor%20enquiry` : '#contact'

export default function App() {
  return (
    <>
      <Header mail={MAIL} />

      <main id="top">
        <Hero mail={MAIL} />

        <Services />

        <Process mail={MAIL} />

        <Spiral />


        <Tiers mail={MAIL} />
        <Compare />

        <Expect mail={MAIL} />

        <Cta mail={MAIL} email={EMAIL} />
      </main>

      <Footer mail={MAIL} email={EMAIL} />
    </>
  )
}
