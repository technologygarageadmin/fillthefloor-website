import { useEffect, useState } from 'react'
import { Icon } from './Hero.jsx'
import AnimatedLogo from './AnimatedLogo.jsx'
import './header.css'

const services = [
  ['users', 'Creative content'], ['megaphone', 'Paid advertising'], ['search', 'SEO / AEO'],
  ['pin', 'Google Business Profile'], ['bars', 'Market analytics'], ['browser', 'Website & hosting'],
]

// [label, href, section ids that keep this link highlighted]
const links = [
  ['Home', '#top', ['top']],
  ['Services', '#services', ['services']],
  ['Our Process', '#process', ['process', 'showcase']],
  ['Tiers', '#tiers', ['tiers', 'compare']],
  ['Results', '#expect', ['expect']],
  ['Contact', '#contact', ['contact']],
]

export default function Header({ mail }) {
  const [current, setCurrent] = useState('top')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const ids = ['services', 'process', 'showcase', 'tiers', 'compare', 'expect', 'contact']
    let raf = 0
    const update = () => {
      raf = 0
      let c = 'top'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) c = id
      }
      setCurrent(c)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="site-nav">
      <a href="#top" className="brand" aria-label="FillTheFloor home" onClick={close}>
        <AnimatedLogo label="FillTheFloor" />
      </a>

      <nav id="main-nav" className={open ? 'open' : ''} aria-label="Main">
        {links.map(([label, href, ids]) => {
          const on = ids.includes(current)
          if (label === 'Services') {
            return (
              <div className="has-menu" key={label}>
                <a href={href} className={`lnk${on ? ' on' : ''}`} aria-current={on ? 'true' : undefined} onClick={close}>
                  {label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </a>
                <div className="menu">
                  {services.map(([i, l]) => (
                    <a key={l} href="#services" onClick={close}><span><Icon name={i} size={16} /></span>{l}</a>
                  ))}
                </div>
              </div>
            )
          }
          return (
            <a key={label} href={href} className={`lnk${on ? ' on' : ''}`} aria-current={on ? 'true' : undefined} onClick={close}>{label}</a>
          )
        })}
        <a className="nav-cta m-only" href={mail} onClick={close}>Get Started <Icon name="arrow" size={18} /></a>
      </nav>

      <a className="nav-cta d-only" href={mail}>Get Started <Icon name="arrow" size={18} /></a>

      <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
    </header>
  )
}
