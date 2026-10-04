import { useState } from 'react'
import { Icon } from './Hero.jsx'
import './compare.css'

const cols = [
  { name: 'Tier 1', title: 'The Baseline', tone: 'blue', icon: 'store', sub: 'Start small and build your presence.' },
  { name: 'Tier 2', title: 'The Growth Vector', tone: 'pink', icon: 'bars', sub: 'More content, deeper reach and measurable growth.' },
  { name: 'Tier 3', title: 'The Premium Offering', tone: 'violet', icon: 'diamond', sub: 'A fuller marketing operation with stronger local visibility.' },
  { name: 'Custom', title: 'Infinite Scale', tone: 'orange', icon: 'infinity', sub: 'Built for multi-location, franchises and big campaigns.' },
]

// [label, icon, tone, [tier1, tier2, tier3, custom]]
const rows = [
  ['Monthly content', 'cal', 'pink', ['6 posters + 2 reels', '8 posts + 4 reels', '12 posts + 6 reels', 'Tier 3 and beyond']],
  ['Ad platforms', 'megaphone', 'violet', ['Meta', 'Meta, Google', 'Meta, Google, TikTok, AI/ChatGPT', 'Bespoke']],
  ['Google Business Profile', 'pin', 'green', ['Claim + optimise', '+ reviews, Q&A, products/services', '+ posts, tracked links, multi-location, rank tracking', 'Bespoke']],
  ['External articles', 'file', 'orange', ['—', '2 / month', '4 / month', '5+ / month']],
  ['Website & hosting', 'browser', 'blue', ['Managed on Firebase', 'Same', 'Same', 'Same']],
  ['SEO / AEO', 'search', 'violet', ['Scan → report', 'Scan → fix → report', 'Scan → fix → rescan → report', 'Bespoke']],
  ['Market analytics', 'bars', 'pink', ['Level 1 competitors', '+ POS item-level sales', '+ ZIP, density, age, income', 'Bespoke']],
  ['Ad simulators', 'target', 'violet', ['—', 'Level 1', 'Level 2 & 3', 'Level 2 & 3']],
  ['Physical production', 'camera', 'green', ['—', '—', 'Additional cost', 'Additional cost']],
]

export default function Compare() {
  const [active, setActive] = useState(null)

  return (
    <section id="compare" className="cmp">
      <div className="cmp-inner">
        <header className="cmp-head">
          <div>
            <p className="eyebrow">Compare at a glance</p>
            <h2>See exactly what changes as you move up.</h2>
            <p className="sub">
              The tiers differ in content volume, ad reach, local-search depth, market analysis and the level of
              production and testing included.
            </p>
          </div>
          <div className="cmp-note" aria-hidden="true">
            <p className="hand">More reach. More depth. More control.</p>
            <div className="climb"><i /><i /><i /><i /><i /><i /></div>
          </div>
        </header>

        <div className="cmp-scroll">
          <div className="cmp-grid" onMouseLeave={() => setActive(null)}>
            <div className="cmp-col cmp-labels">
              <div className="cmp-top" />
              {rows.map(([label, icon, tone]) => (
                <div className="cmp-cell label" key={label}>
                  <span className={`mini ${tone}`}><Icon name={icon} size={16} /></span>{label}
                </div>
              ))}
            </div>

            {cols.map((c, ci) => (
              <div
                key={c.name} tabIndex={0}
                className={`cmp-col ${c.tone}${active === ci ? ' hl' : ''}`}
                onMouseEnter={() => setActive(ci)} onFocus={() => setActive(ci)} onBlur={() => setActive(null)}
              >
                <div className="cmp-top">
                  <span className="t-ico"><Icon name={c.icon} size={24} /></span>
                  <p className="tier-name">{c.name}</p>
                  <h3>{c.title}</h3>
                  <p>{c.sub}</p>
                </div>
                {rows.map(([label, , , vals], ri) => (
                  <div className="cmp-cell" key={label}>
                    <span>{vals[ci]}</span>
                    {ri === 0 && <span className="meter" aria-hidden="true">{[0, 1, 2, 3].map((n) => <i key={n} className={n <= ci ? 'on' : ''} />)}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
