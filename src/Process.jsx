import { useEffect, useRef, useState } from 'react'
import { Icon } from './Hero.jsx'
import './process.css'

/* ---------- Mini visuals (one per step) ---------- */

function VizOnboard() {
  const pills = [['briefcase', 'Business'], ['users', 'Audience'], ['link', 'Accounts'], ['flag', 'Goals']]
  return (
    <div className="viz viz-pills">
      {pills.map(([i, l], k) => (
        <span className="pill" style={{ '--i': k }} key={l}><Icon name={i} size={14} />{l}</span>
      ))}
    </div>
  )
}

function VizWebsite() {
  return (
    <div className="viz viz-site">
      <div className="win site-old"><i /><i /><i /><b>Existing hosting</b></div>
      <span className="arr"><Icon name="arrow" size={18} /></span>
      <div className="win site-new"><i /><i /><i /><b>Managed by FillTheFloor</b><em>Firebase</em></div>
    </div>
  )
}

function VizScan() {
  return (
    <div className="viz viz-scan">
      <div className="scan-core">
        <svg className="ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="url(#sg)" strokeWidth="3" strokeDasharray="70 24 14 24" strokeLinecap="round" />
          <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7c3aed" /><stop offset="1" stopColor="#f97316" /></linearGradient></defs>
        </svg>
        <span className="scan-ico"><Icon name="search" size={26} /></span>
      </div>
      <div className="scan-steps">
        <span style={{ '--i': 0 }}>Scan</span><b>↓</b><span style={{ '--i': 1 }}>Fix</span><b>↓</b><span style={{ '--i': 2 }}>Rescan</span>
      </div>
    </div>
  )
}

function VizCalendar() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const ev = { 1: 'POST', 3: 'REEL', 8: 'POST', 12: 'REEL' }
  return (
    <div className="viz viz-cal">
      {days.map((d, i) => <small key={i}>{d}</small>)}
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className="day">
          {ev[i] && <u className={`ev ${ev[i] === 'REEL' ? 'reel' : 'post'}`} style={{ '--i': Object.keys(ev).indexOf(String(i)) }}>{ev[i]}</u>}
        </span>
      ))}
    </div>
  )
}

function VizAudience() {
  const clusters = [[24, 36, '#7c3aed'], [60, 24, '#ec2f7a'], [52, 62, '#f97316']]
  const dots = clusters.flatMap(([cx, cy, c], k) =>
    [[0, 0], [7, -5], [-6, 6], [6, 7], [-8, -4], [0, -10]].map(([dx, dy], j) => ({ x: cx + dx, y: cy + dy, c, k, j })))
  return (
    <div className="viz viz-aud">
      <svg viewBox="0 0 90 80" aria-hidden="true">
        {dots.map((d, n) => (
          <circle key={n} className="dot" cx={d.x} cy={d.y} r="2.6" fill={d.c}
            style={{ '--x': `${(n % 5 - 2) * 14}px`, '--y': `${(n % 3 - 1) * 16}px`, '--d': `${n * 40}ms` }} />
        ))}
      </svg>
      <div className="aud-tags"><span>Audience</span><span>Reach</span><span>A/B Test</span></div>
    </div>
  )
}

function VizWorkflow() {
  const nodes = [['video', 'Create'], ['cal', 'Publish'], ['megaphone', 'Advertise']]
  return (
    <div className="viz viz-wf">
      <div className="wf-track"><span className="wf-fill" /></div>
      {nodes.map(([i, l], k) => (
        <div className="wf-node" style={{ '--i': k }} key={l}><span><Icon name={i} size={20} /></span>{l}</div>
      ))}
    </div>
  )
}

function VizReport() {
  const m = [['eye', 'Reach', 78], ['heart', 'Engagement', 56], ['trend', 'Traffic', 66], ['chat', 'Enquiries', 42]]
  return (
    <div className="viz viz-rep">
      <div className="metrics">
        {m.map(([i, l, w], k) => (
          <div key={l}><span><Icon name={i} size={13} />{l}</span><i className="bar" style={{ '--w': `${w}%`, '--i': k }} /></div>
        ))}
      </div>
      <div className="loop-trail">
        <span>Report</span>
        <svg className="loop" viewBox="0 0 40 16" aria-hidden="true"><path d="M2 12c8-12 22-12 34 0m0 0-5-1m5 1 1-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        <span>Adjust</span>
        <svg className="loop" viewBox="0 0 40 16" aria-hidden="true"><path d="M2 12c8-12 22-12 34 0m0 0-5-1m5 1 1-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        <span>Next month</span>
      </div>
    </div>
  )
}

/* ---------- Data ---------- */

const steps = [
  { cat: 'Discover', icon: 'compass', title: 'Onboard and discover', Viz: VizOnboard,
    desc: 'We learn what you sell, what makes money and who you want through the door, and take access to your accounts.',
    out: 'Business brief' },
  { cat: 'Build', icon: 'browser', title: 'Take over the website', Viz: VizWebsite,
    desc: 'We migrate it onto a stack we maintain and host on Firebase, so the hosting bill stops.',
    out: 'Managed site on Firebase' },
  { cat: 'Optimise', icon: 'refresh', title: 'Scan, fix, rescan', Viz: VizScan,
    desc: 'Depth depends on your tier: report only, report with fixes, or fixes confirmed by a rescan.',
    out: 'Scan report, by tier' },
  { cat: 'Plan', icon: 'cal', title: 'Plan the content', Viz: VizCalendar,
    desc: 'A calendar reaches you ahead of the month. Revisions are capped at three rounds so publishing stays on schedule.',
    out: 'Approved content calendar' },
  { cat: 'Test', icon: 'target', title: 'Size the audience first', Viz: VizAudience,
    desc: 'From Tier 2, simulators and A/B feelers estimate reach before budget is committed.',
    out: 'Reach estimate, from Tier 2' },
  { cat: 'Publish', icon: 'megaphone', title: 'Produce, publish, advertise', Viz: VizWorkflow,
    desc: 'Content is made and scheduled; ad budget is paced weekly. Physical production is scoped separately.',
    out: 'Scheduled content and ads' },
  { cat: 'Measure', icon: 'chart', title: 'Report and adjust', Viz: VizReport,
    desc: 'Each month: what ran, what it reached, what the analytics say and what changes next.',
    out: 'Monthly report' },
]

// connector label shown on the line before the step at this index
const labels = { 0: 'Discover', 2: 'Build', 3: 'Optimise', 4: 'Publish', 6: 'Measure' }

/* ---------- Section ---------- */

export default function Process({ mail }) {
  const tlRef = useRef(null)
  const stepRefs = useRef([])
  const [active, setActive] = useState(-1)
  const [still] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const tl = tlRef.current
    if (still) {
      tl.style.setProperty('--p', 1)
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.55
      const r = tl.getBoundingClientRect()
      tl.style.setProperty('--p', Math.min(1, Math.max(0, (mid - r.top) / r.height)).toFixed(4))
      let a = -1
      stepRefs.current.forEach((el, i) => {
        const b = el.getBoundingClientRect()
        if (b.top + b.height / 2 <= mid) a = i
      })
      setActive(a)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [still])

  const state = (i) => (still ? 'done' : i === active ? 'active' : i < active ? 'done' : 'idle')

  return (
    <section id="process" className={`proc${still ? ' still' : ''}`}>
      <span className="glow g1" aria-hidden="true" />
      <span className="glow g2" aria-hidden="true" />
      <span className="glow g3" aria-hidden="true" />

      <div className="proc-inner">
        <header className="proc-head">
          <div>
            <p className="eyebrow">How we run the account</p>
            <h2>Seven steps, <span className="grad-text">every tier</span></h2>
            <p className="sub">From first conversation to monthly optimisation, we handle the marketing engine.</p>
          </div>
          <div className="engine" aria-hidden="true">
            <p className="hand">A complete marketing engine for your business.</p>
            <div className="engine-card">
              <small>Marketing engine</small>
              <div>
                <span><Icon name="compass" size={18} />Discover</span><b>→</b>
                <span><Icon name="tools" size={18} />Build</span><b>→</b>
                <span><Icon name="chart" size={18} />Grow</span>
              </div>
            </div>
          </div>
        </header>

        <ol className="tl" ref={tlRef}>
          <span className="tl-line" aria-hidden="true"><span className="tl-fill" /></span>
          {steps.map((s, i) => {
            const st = state(i)
            const { Viz } = s
            return (
              <li key={s.title} className={`step ${i % 2 ? 'right' : 'left'} ${st}`} ref={(el) => (stepRefs.current[i] = el)}>
                {labels[i] && <span className="lbl" aria-hidden="true">{labels[i]}</span>}
                <article className="pcard">
                  <div className="pc-top">
                    <span className="pc-ico"><Icon name={s.icon} size={22} /></span>
                    <div><small>Step {String(i + 1).padStart(2, '0')}</small><em>{s.cat}</em></div>
                    <span className="pc-state">{st === 'done' ? 'Done' : st === 'active' ? 'In progress' : ''}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Viz />
                  <p className="pc-out"><span>Output</span>{s.out}</p>
                </article>
                <span className="node" aria-hidden="true">
                  {st === 'done' ? <Icon name="check" size={18} /> : String(i + 1).padStart(2, '0')}
                </span>
              </li>
            )
          })}
          <li className="tl-end" aria-hidden="true"><span className="lbl">Grow</span></li>
        </ol>

        <div className="closing">
          <div>
            <p className="eyebrow">Then we do it again</p>
            <h3>Smarter, every month.</h3>
            <p>Every month, the account gets reviewed, reported and adjusted based on what actually happened.</p>
            <div className="cta">
              <a className="btn" href="#tiers">See the tiers <Icon name="arrow" size={16} /></a>
              <a className="btn btn-ghost" href={mail}>Talk to us <Icon name="arrow" size={16} /></a>
            </div>
          </div>
          <div className="cycle" aria-hidden="true">
            <span><Icon name="chart" size={22} /><b>Report</b>What happened</span>
            <span><Icon name="tools" size={22} /><b>Adjust</b>What we change</span>
            <span><Icon name="cal" size={22} /><b>Next month</b>Do it again, better</span>
          </div>
        </div>
      </div>
    </section>
  )
}
