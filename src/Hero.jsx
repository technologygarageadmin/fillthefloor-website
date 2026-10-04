import { useEffect, useState } from 'react'
import './hero.css'

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// counts a sample dashboard figure up from zero once the laptop has slid in
function Count({ v }) {
  const target = Number(v.replace(/,/g, ''))
  const [n, setN] = useState(() => (reduceMotion() ? target : 0))
  useEffect(() => {
    if (reduceMotion()) return
    let raf = 0
    let start = 0
    const tick = (t) => {
      start ||= t
      const p = Math.min(1, (t - start) / 1600)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick) }, 900)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [target])
  return n.toLocaleString('en-US')
}

const ICONS = {
  browser: ['M3 5h18v14H3z', 'M3 9h18'],
  search: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'm21 21-4.35-4.35'],
  users: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  megaphone: ['M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1z', 'M17.5 9a4 4 0 0 1 0 6'],
  cup: ['M18 8h1a4 4 0 0 1 0 8h-1', 'M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z', 'M6 1v3M10 1v3M14 1v3'],
  scissors: ['M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 'M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 'M20 4 8.12 15.88', 'M14.47 14.48 20 20', 'M8.12 8.12 12 12'],
  steth: ['M5 3v6a4 4 0 0 0 8 0V3', 'M9 13v2a5 5 0 0 0 10 0v-1', 'M19 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'],
  bag: ['M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'],
  tools: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  pin: ['M12 22s8-6.5 8-12a8 8 0 1 0-16 0c0 5.5 8 12 8 12z', 'M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  bars: ['M5 21V10', 'M10 21V4', 'M15 21v-8', 'M20 21V7'],
  store: ['M3 9l1.5-5h15L21 9', 'M3 9v1a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0V9', 'M5 13v8h14v-8'],
  diamond: ['M6 3h12l4 6-10 12L2 9z', 'M2 9h20'],
  infinity: ['M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4z', 'M12 12c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4z'],
  check: ['m5 12 5 5 9-10'],
  cal: ['M3 5h18v16H3z', 'M16 3v4M8 3v4M3 11h18'],
  target: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  camera: ['M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z', 'M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  compass: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'm16 8-2 6-6 2 2-6z'],
  refresh: ['M21 12a9 9 0 0 1-15 6.7L3 16', 'M3 12a9 9 0 0 1 15-6.7L21 8', 'M21 3v5h-5', 'M3 21v-5h5'],
  briefcase: ['M3 7h18v13H3z', 'M8 7V4h8v3'],
  link: ['M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1', 'M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1'],
  flag: ['M4 22V4', 'M4 4h14l-2 4 2 4H4'],
  video: ['M23 7l-7 5 7 5z', 'M1 5h15v14H1z'],
  eye: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  heart: ['M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z'],
  trend: ['m22 7-8.5 8.5-5-5L2 17', 'M16 7h6v6'],
  click: ['M5 3l14 7-6 2-2 6z'],
  star: ['M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'],
  bulb: ['M9 18h6', 'M10 22h4', 'M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z'],
  bolt: ['M13 2 3 14h9l-1 8 10-12h-9z'],
  play: ['M8 5v14l11-7z'],
  chart: ['M6 20V12', 'M12 20V5', 'M18 20v-9'],
  chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  file: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6'],
}

export function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name].map((d) => <path key={d} d={d} />)}
    </svg>
  )
}

const floats = [
  ['f-web', 'browser', 'Website & Hosting', 'Managed and updated for you', 'pink'],
  ['f-seo', 'search', 'Search Visibility', 'Get found by more customers', 'amber'],
  ['f-soc', 'users', 'Social Content', 'Posts and reels that engage', 'violet'],
  ['f-ads', 'megaphone', 'Paid Advertising', 'Meta, Google, TikTok and more', 'green'],
]
const heroStats = [
  ['4', 'Service Tiers'], ['All-in-one', 'Marketing Operations'],
  ['Monthly', 'Reports & Insights'], ['Built for', 'Small Businesses'],
]
const sideNav = [['home', 'Home'], ['file', 'Content'], ['megaphone', 'Ads'], ['search', 'SEO & GBP'], ['browser', 'Website'], ['chart', 'Reports']]
const kpis = [['Website Visitors', '4,320', '↑ 52%', 'chart'], ['Ad Reach', '25,800', '↑ 68%', 'users'], ['Enquiries', '37', '↑ 41%', 'chat']]
const perfectFor = [['cup', 'Cafés', 'violet'], ['scissors', 'Salons', 'violet'], ['steth', 'Clinics', 'blue'],
  ['bag', 'Boutiques', 'pink'], ['tools', 'Trades', 'red'], ['home', 'Home Services', 'amber']]

function Laptop() {
  return (
    <div className="laptop" aria-hidden="true">
      <div className="screen">
        <aside>
          <img src="/logo-mark.png" alt="" />
          {sideNav.map(([i, l], k) => (
            <span key={l} className={k === 0 ? 'on' : ''}><Icon name={i} size={12} />{l}</span>
          ))}
        </aside>
        <div className="dash">
          <div className="dash-top"><b>Good morning!</b><em>Oct 2026</em></div>
          <small>Here’s how your marketing is performing this month.</small>
          <div className="kpis">
            {kpis.map(([l, v, d, i]) => (
              <div key={l}><small>{l}</small><strong><Count v={v} /></strong><span>{d}</span><i><Icon name={i} size={14} /></i></div>
            ))}
          </div>
          <div className="cal">
            <div className="cal-top"><b>Content Calendar</b><em>View Calendar →</em></div>
            <div className="thumbs">
              <u className="t1" /><u className="t2"><b>WEEKEND SPECIAL</b></u><u className="t3"><s>▶</s></u><u className="t4" /><u className="t5" />
            </div>
          </div>
        </div>
      </div>
      <div className="base" />
    </div>
  )
}

export default function Hero({ mail }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Marketing operations for small businesses</p>
          <h1>We run your marketing back office, <span className="grad-text">so you can run the business.</span></h1>
          <p className="lead">
            Website and hosting, search visibility, social content and paid advertising, built, published and reported by one team.
          </p>
          <div className="cta">
            <a className="btn" href="#tiers">See the four tiers <Icon name="arrow" size={16} /></a>
            <a className="btn btn-ghost" href={mail}>Talk to us</a>
          </div>
          <dl className="stats">
            {heroStats.map(([a, b]) => <div key={b}><dt>{a}</dt><dd>{b}</dd></div>)}
          </dl>
        </div>
        <div className="stage">
          <span className="blob" aria-hidden="true" />
          <Laptop />
          {floats.map(([cls, icon, t, d, tone]) => (
            <div key={t} className={`float ${cls}`}>
              <span className={`ico ${tone}`}><Icon name={icon} size={26} /></span>
              <div><b>{t}</b><small>{d}</small></div>
            </div>
          ))}
          <svg className="plane" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12 22 2l-5 20-5-8z" /></svg>
        </div>
      </div>
      <div className="perfect">
        <b>Perfect for</b>
        {perfectFor.map(([i, l, tone]) => (
          <span key={l} className="chip"><span className={`ico ${tone}`}><Icon name={i} size={18} /></span>{l}</span>
        ))}
        <span className="chip more">… and many more</span>
      </div>
    </section>
  )
}
