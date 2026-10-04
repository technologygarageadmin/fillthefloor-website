import { useState } from 'react'
import { Icon } from './Hero.jsx'
import './expect.css'

const cols = [
  { name: 'Tier 1', title: 'The Baseline', tone: 'blue', icon: 'store' },
  { name: 'Tier 2', title: 'The Growth Vector', tone: 'pink', icon: 'bars' },
  { name: 'Tier 3', title: 'The Premium Offering', tone: 'violet', icon: 'diamond' },
  { name: 'Custom', title: 'Infinite Scale', tone: 'orange', icon: 'infinity' },
]

const ranges = [
  ['Ad impressions', 'megaphone', 'violet', ['14,000 – 25,000', '25,000 – 50,000', '40,000 – 80,000', 'Scales with budget']],
  ['Clicks to your CTA', 'click', 'violet', ['150 – 400', '300 – 650', '450 – 950', 'Scales with budget']],
  ['Enquiries from ads', 'chat', 'orange', ['5 – 25', '10 – 50', '15 – 75', 'Varies']],
  ['GBP actions', 'pin', 'green', ['40 – 120', '50 – 150', '60 – 200', 'Varies by category']],
]

const scorecard = [
  ['click', 'pink', 'Click-through rate', '1.5%–2.5% on Meta. Under 1% is a creative problem.'],
  ['cal', 'violet', 'Frequency', '1–3 a week. Past 4, the creative is burning out.'],
  ['star', 'orange', 'Rating & response', '4.5 stars out-clicks 4.0 by ~28%. Reply within 24 hours.'],
  ['pin', 'green', 'Local Pack position', 'Top 3. Position 1 takes about 24% of the clicks.'],
  ['search', 'blue', 'Keyword positions', 'A steady climb on local-intent terms over 3–6 months.'],
  ['users', 'pink', 'Cost per contact', 'Falling as campaigns learn and the profile matures.'],
]

export default function Expect({ mail }) {
  const [active, setActive] = useState(null)

  return (
    <section id="expect" className="ex">
      <span className="ex-orb" aria-hidden="true" />
      <div className="ex-inner">
        <header className="ex-head">
          <div>
            <p className="eyebrow">What to expect</p>
            <h2>Planning ranges, and what good looks like</h2>
            <p className="sub">What the ad budget typically buys, per month.</p>
          </div>
          <div className="ex-side">
            <div className="ex-note" aria-hidden="true">
              <p className="hand">Higher reach, more enquiries, more growth.</p>
              <div className="climb"><i /><i /><i /><i /><i /></div>
            </div>
            <aside className="ex-warn">
              <span className="mini amber"><Icon name="bulb" size={22} /></span>
              <p><b>These are planning ranges, not guarantees.</b>Actual results vary by business, location, competition and season.</p>
            </aside>
          </div>
        </header>

        <div className="ex-scroll">
          <div className="ex-grid" onMouseLeave={() => setActive(null)}>
            <div className="ex-col ex-labels">
              <div className="ex-top"><small>Metric</small></div>
              {ranges.map(([label, icon, tone]) => (
                <div className="ex-cell label" key={label}>
                  <span className={`mini ${tone}`}><Icon name={icon} size={16} /></span>{label}
                </div>
              ))}
            </div>
            {cols.map((c, ci) => (
              <div
                key={c.name} tabIndex={0}
                className={`ex-col ${c.tone}${active === ci ? ' hl' : ''}`}
                onMouseEnter={() => setActive(ci)} onFocus={() => setActive(ci)} onBlur={() => setActive(null)}
              >
                <div className="ex-top">
                  <span className="t-ico"><Icon name={c.icon} size={22} /></span>
                  <small className="tn">{c.name}</small>
                  <b>{c.title}</b>
                </div>
                {ranges.map(([label, , , vals]) => <div className="ex-cell" key={label}>{vals[ci]}</div>)}
              </div>
            ))}
          </div>
        </div>

        <div className="score-wrap">
          <div className="score">
            <p className="eyebrow">Your monthly scorecard</p>
            <h3>Key indicators and what good looks like</h3>
            <p className="sub">These benchmarks help you understand performance and where we focus each month.</p>
            <div className="score-grid">
              {scorecard.map(([icon, tone, t, d]) => (
                <article className="sc" key={t}>
                  <span className={`mini lg ${tone}`}><Icon name={icon} size={22} /></span>
                  <div><h4>{t}</h4><p>{d}</p></div>
                  <span className={`go ${tone}`} aria-hidden="true"><Icon name="arrow" size={13} /></span>
                </article>
              ))}
            </div>
          </div>

          <aside className="big">
            <small>The big picture</small>
            <h3>Better content. More visibility. <span>Real growth.</span></h3>
            <p>These ranges are industry benchmarks, not forecasts. We focus on what drives better results for your business over time.</p>
            <a className="btn btn-light" href="#tiers">See the tiers <Icon name="arrow" size={16} /></a>
          </aside>
        </div>

        <div className="ex-notes">
          <p>
            We commit to the work: the agreed content volume, platforms, ad spend, publishing cadence and monthly
            reporting. We do not promise a specific number of impressions, leads or sales. Results can vary significantly
            by business type, location, competition, market demand, demographics, offer, creative and seasonality.
            From Tier 2 we can narrow expectations using market and audience modelling, and after 30–60 days of live
            data we can increasingly benchmark against your own results.
          </p>
          <p>
            Client responsibilities: please supply the existing assets and information needed to execute the plan
            (photos, videos, menus, logos, product details). Gaps may affect the publishing schedule. <a href={mail}>Questions? Talk to us.</a>
          </p>
        </div>
      </div>
    </section>
  )
}
