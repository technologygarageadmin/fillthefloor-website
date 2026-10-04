import { useEffect, useRef } from 'react'
import { Icon } from './Icon.jsx'
import AnimatedGradientPath from './hero/AnimatedGradientPath.jsx'
import IndustryStrip from './hero/IndustryStrip.jsx'
import MarketingDashboard from './hero/MarketingDashboard.jsx'
import ServiceCard from './hero/ServiceCard.jsx'
import { reduceMotion, useInView } from './hero/hooks.js'
import './hero.css'

// the rest of the site imports Icon from here
export { Icon }

// clockwise from the top left
const services = [
  ['strategy', 'target', 'Strategy', 'Plan, research and growth opportunities', 'violet'],
  ['content', 'image', 'Creative Content', 'Posts, reels and a calendar you approve', 'pink'],
  ['ads', 'megaphone', 'Paid Advertising', 'Meta, Google, TikTok and more', 'orange'],
  ['social', 'users', 'Social Presence', 'Build and grow your audience', 'teal'],
  ['analytics', 'bars', 'Analytics', 'Clear reports and real business insights', 'violet'],
  ['seo', 'search', 'SEO / AEO', 'Search visibility and local search growth', 'blue'],
]

const stats = [
  ['4', 'Service Tiers'],
  ['All-in-one', 'Marketing Operations'],
  ['Monthly', 'Reports & Insights'],
  ['Built for', 'Small Businesses'],
]

export default function Hero({ mail }) {
  const [heroRef, seen, visible] = useInView(0.15)
  const stageRef = useRef(null)

  // very small cursor parallax, desktop with a mouse only; the layers ease towards the pointer in CSS
  useEffect(() => {
    const hero = heroRef.current
    const stage = stageRef.current
    if (!hero || !stage || reduceMotion()) return undefined
    if (!window.matchMedia('(pointer: fine) and (min-width: 1000px)').matches) return undefined
    let raf = 0
    let x = 0
    let y = 0
    const apply = () => {
      raf = 0
      stage.style.setProperty('--mx', x.toFixed(3))
      stage.style.setProperty('--my', y.toFixed(3))
    }
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      x = ((e.clientX - r.left) / r.width - 0.5) * 2
      y = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onLeave = () => { x = 0; y = 0; if (!raf) raf = requestAnimationFrame(apply) }
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [heroRef])

  return (
    <section ref={heroRef} className={`hero${visible ? '' : ' paused'}`}>
      <div className="hero-bg" aria-hidden="true"><i /><i /><i /></div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Marketing operations for small businesses</p>
          <h1>We run your marketing back office, <span className="grad-text">so you can run the business.</span></h1>
          <p className="lead">
            Creative content, paid advertising, search visibility and your website, built, published and reported by one team.
          </p>
          <div className="cta">
            <a className="btn hero-cta" href="#tiers">See the four tiers <Icon name="arrow" size={16} /></a>
            <a className="btn btn-ghost hero-cta2" href={mail}>Talk to us</a>
          </div>
        </div>

        <div className="stage" ref={stageRef}>
          <div className="layer bgl"><AnimatedGradientPath /></div>
          <div className="layer dashl"><MarketingDashboard run={seen} /></div>
          <div className="layer cardsl">
            {services.map(([id, icon, title, text, tone], i) => (
              <ServiceCard key={id} id={id} icon={icon} title={title} text={text} tone={tone} order={i} />
            ))}
          </div>
        </div>

        <dl className="stats">
          {stats.map(([a, b]) => <div key={b}><dt>{a}</dt><dd>{b}</dd></div>)}
        </dl>
      </div>

      <IndustryStrip />
    </section>
  )
}
