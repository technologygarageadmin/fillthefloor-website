import { Icon } from './Hero.jsx'
import AnimatedLogo from './AnimatedLogo.jsx'
import './cta.css'

const features = [
  ['bolt', 'violet', 'One team', 'Everything handled'],
  ['users', 'blue', 'Clear plan', 'Built for your market'],
  ['bars', 'blue', 'Real growth', 'More customers in store'],
]

// [icon, label, sub, angle around the ring (deg, 0 = right), colour]
const orbit = [
  ['file', 'Plan', 'Strategy & calendar', -90, '#7c3aed'],
  ['play', 'Create', 'Content & creatives', -18, '#06b6d4'],
  ['target', 'Reach', 'Ads & distribution', 54, '#f97316'],
  ['bars', 'Measure', 'Reports & insights', 126, '#2563eb'],
  ['trend', 'Grow', 'More customers', 198, '#10b981'],
]
const arrowColors = ['#7c5cff', '#3b6bff', '#fb923c', '#7c5cff', '#8b5cf6']

const point = (deg, r = 38) => {
  const a = (deg * Math.PI) / 180
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)]
}
// curved arrows between neighbouring cards, clear of the card edges
const arcs = orbit.map(([, , , a], i) => {
  const [x1, y1] = point(a + 25)
  const end = a + 72 - 25
  const [x2, y2] = point(end)
  // arrowhead drawn from the curve's own direction at the tip, so line and head always line up
  const t = ((end + 90) * Math.PI) / 180
  const barb = (s) => {
    const k = (s * 30 * Math.PI) / 180
    return `${(x2 - 3.6 * Math.cos(t - k)).toFixed(1)} ${(y2 - 3.6 * Math.sin(t - k)).toFixed(1)}`
  }
  return {
    d: `M${x1.toFixed(1)} ${y1.toFixed(1)} A38 38 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`,
    h: `M${barb(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${barb(-1)}`,
    c: arrowColors[i],
  }
})

const footCols = [
  ['Services', [['Creative Content', '#services'], ['Paid Advertising', '#services'], ['SEO / AEO', '#services'],
    ['Google Business Profile', '#services'], ['Market Analytics', '#services'], ['Website & Hosting', '#services']]],
  ['Tiers', [['The Baseline', '#tiers'], ['The Growth Vector', '#tiers'], ['The Premium Offering', '#tiers'], ['Infinite Scale', '#tiers']]],
  ['Explore', [['Compare tiers', '#compare'], ['Our process', '#process'], ['What to expect', '#expect'], ['Contact', '#contact']]],
]

export function Cta({ mail, email }) {
  return (
    <section id="contact" className="cta-sec">
      <span className="wave w1" aria-hidden="true" />
      <span className="wave w2" aria-hidden="true" />
      <div className="cta-inner">
        <div className="cta-copy">
          <p className="eyebrow">Ready to fill the floor?</p>
          <h2>Let’s get your <span className="grad-text">marketing moving.</span></h2>
          <p className="cta-lead">Tell us about your business and we’ll recommend the tier that fits.</p>
          <div className="cta-btns">
            <a className="cbtn solid" href="#tiers">Find your tier <Icon name="arrow" size={18} /></a>
            <a className="cbtn line" href={mail}>Talk to us <Icon name="arrow" size={18} /></a>
          </div>
          {email && <p className="cta-mail">{email}</p>}
          <ul className="cta-feats">
            {features.map(([i, tone, t, d]) => (
              <li key={t}>
                <span className={tone}><Icon name={i} size={20} /></span>
                <div><b>{t}</b><small>{d}</small></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="cta-stage" aria-hidden="true">
          <p className="cta-hand">A complete marketing engine for your business.</p>
          <div className="orbit">
            <svg className="orbit-arrows" viewBox="0 0 100 100">
              {arcs.map((a, n) => (
                <g key={a.d} style={{ '--n': n }} fill="none" stroke={a.c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={a.d} /><path d={a.h} />
                </g>
              ))}
            </svg>
            <AnimatedLogo className="orbit-logo" />
            {orbit.map(([icon, t, d, a, color], n) => {
              const [x, y] = point(a)
              return (
                <div key={t} className="onode" style={{ left: `${x}%`, top: `${y}%`, '--c': color, '--n': n }}>
                  <Icon name={icon} size={30} />
                  <b>{t}</b><small>{d}</small>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer({ mail, email }) {
  return (
    <footer className="site-foot">
      <div className="foot-grid">
        <div className="foot-brand">
          <AnimatedLogo label="FillTheFloor" />
          <p>An all-in-one marketing back office for cafés, salons, boutiques, clinics, trades and home services.</p>
        </div>
        {footCols.map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <h4>{title}</h4>
            <ul>{links.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
          </nav>
        ))}
        <div className="foot-talk">
          <h4>Let’s talk</h4>
          <p>Tell us about your business and we’ll recommend the tier that fits.</p>
          <a className="cbtn solid grad" href={mail}>Talk to us <Icon name="arrow" size={16} /></a>
          {email && <small>{email}</small>}
        </div>
      </div>
      <div className="foot-bar">
        <span>© FillTheFloor 2026. All rights reserved.</span>
        <small>Website, search, social and ads, built, published and reported by one team.</small>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
