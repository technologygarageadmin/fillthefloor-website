import { Icon } from '../Icon.jsx'
import KpiCard from './KpiCard.jsx'

const nav = [['home', 'Home'], ['image', 'Content'], ['megaphone', 'Ads'], ['search', 'SEO & GBP'], ['browser', 'Website'], ['chart', 'Reports']]

// segments of the channel donut: [label, share, colour]; circumference is 100 so shares are plain numbers
const channels = [['Social', 38, '#7c3aed'], ['Search', 27, '#ec4899'], ['Direct', 20, '#f97316'], ['Referral', 15, '#3b82f6']]

// running start position of each segment around the ring
const segments = channels.map(([label, share, color], i) => ({ label, share, color, start: channels.slice(0, i).reduce((a, c) => a + c[1], 0) }))

const posts = [
  ['Mon', 'post', 'image', 'linear-gradient(135deg,#7c3aed,#ec4899)'],
  ['Tue', 'reel', 'play', 'linear-gradient(135deg,#ec4899,#f97316)'],
  ['Wed', 'reel', 'play', 'linear-gradient(135deg,#0b1730,#3b2a99)'],
  ['Thu', 'post', 'image', 'linear-gradient(135deg,#12b5cb,#3b82f6)'],
]

// A real HTML/CSS dashboard (not a screenshot). All figures are illustrative.
export default function MarketingDashboard({ run }) {
  return (
    <div className={`dash${run ? ' is-live' : ''}`} role="img" aria-label="Illustrative preview of the FillTheFloor marketing dashboard">
      <div className="d-screen">
        <aside className="d-side">
          <img src="/logo-mark.png" alt="" />
          {nav.map(([icon, label], i) => (
            <span key={label} className={i === 0 ? 'on' : ''}><Icon name={icon} size={12} />{label}</span>
          ))}
        </aside>

        <div className="d-main">
          <header className="d-top">
            <div><b>Good morning!</b><small>Here’s how your marketing is performing.</small></div>
            <span className="d-month"><i className="d-live" />Oct 2026</span>
          </header>

          <div className="d-kpis">
            <KpiCard label="Website Visitors" value={4320} delta={52} viz="line" run={run} delay={0} />
            <KpiCard label="Ad Reach" value={25800} delta={68} viz="bars" run={run} delay={120} />
            <KpiCard label="Enquiries" value={77} delta={42} viz="line" run={run} delay={240} />
          </div>

          <div className="d-mid">
            <div className="d-card">
              <h6>Performance</h6>
              <svg className="d-chart" viewBox="0 0 120 52" aria-hidden="true">
                <defs>
                  <linearGradient id="dc-line" x1="0" x2="1"><stop stopColor="#7c3aed" /><stop offset=".55" stopColor="#ec4899" /><stop offset="1" stopColor="#f97316" /></linearGradient>
                  <linearGradient id="dc-area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7c3aed" stopOpacity=".22" /><stop offset="1" stopColor="#7c3aed" stopOpacity="0" /></linearGradient>
                </defs>
                {[12, 26, 40].map((y) => <line key={y} x1="0" x2="120" y1={y} y2={y} stroke="#e9e6f5" strokeWidth=".6" />)}
                <path className="dc-area" d="M2 42 C18 36 24 40 38 30 S62 32 76 20 S100 16 118 7 L118 52 L2 52Z" fill="url(#dc-area)" />
                <path className="dc-line2" pathLength="1" d="M2 46 C20 44 30 42 44 38 S70 36 84 30 S104 26 118 22" fill="none" stroke="#cdd5ee" strokeWidth="1.6" strokeLinecap="round" />
                <path className="dc-line" pathLength="1" d="M2 42 C18 36 24 40 38 30 S62 32 76 20 S100 16 118 7" fill="none" stroke="url(#dc-line)" strokeWidth="2.4" strokeLinecap="round" />
                <circle className="dc-dot" cx="118" cy="7" r="3" fill="#f97316" />
              </svg>
              <p className="d-legend"><i style={{ background: '#7c3aed' }} />Reach<i style={{ background: '#cdd5ee' }} />Enquiries</p>
            </div>

            <div className="d-card d-donut">
              <h6>Top Channels</h6>
              <div className="d-donut-row">
                <svg viewBox="0 0 42 42" aria-hidden="true">
                  <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#eef0f8" strokeWidth="6" />
                  {segments.map(({ label, share, color, start }, i) => (
                    <circle key={label} className="seg" style={{ '--i': i }} cx="21" cy="21" r="15.9155" fill="none" stroke={color} strokeWidth="6"
                      strokeDasharray={`${share - 1} ${101 - share}`} strokeDashoffset={-start} transform="rotate(-90 21 21)" />
                  ))}
                </svg>
                <ul>{channels.map(([label, , color]) => <li key={label}><i style={{ background: color }} />{label}</li>)}</ul>
              </div>
            </div>
          </div>

          <div className="d-card d-cal">
            <div className="d-cal-top"><h6>Content Calendar</h6><em>View all →</em></div>
            <div className="d-thumbs">
              {posts.map(([day, kind, icon, bg], i) => (
                <figure key={day} style={{ '--i': i }}>
                  <span style={{ background: bg }}><Icon name={icon} size={14} />{kind === 'reel' ? 'REEL' : 'POST'}</span>
                  <figcaption>{day}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="d-base" aria-hidden="true" />
      <span className="d-note">Illustrative data</span>
    </div>
  )
}
