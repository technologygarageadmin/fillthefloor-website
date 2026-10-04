import { Icon } from './Hero.jsx'
import './services.css'

const pillars = [
  ['users', 'orange', 'Creative content', 'Posters, posts and reels planned on a calendar you approve before anything goes live.'],
  ['megaphone', 'blue', 'Paid advertising', 'Meta, Google, TikTok and AI/ChatGPT placements, paced weekly at your tier’s rate.'],
  ['search', 'violet', 'SEO / AEO', 'Automated scans and plain-English reports, with fixes applied by our web team from Tier 2.'],
  ['pin', 'green', 'Google Business Profile', 'Claimed, optimised and managed: reviews, Q&A, posts and local rank tracking.'],
  ['bars', 'pink', 'Market analytics', 'Competitor analysis, POS sales data and audience modelling to size the market before spending.'],
  ['browser', 'violet', 'Website & hosting', 'We migrate your site onto a stack we maintain and host it free on Firebase. Your old hosting bill stops.'],
]

export default function Services() {
  return (
    <section id="services" className="services">
      <span className="orb orb-l" aria-hidden="true" />
      <span className="orb orb-r" aria-hidden="true" />
      <svg className="plane2" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12 22 2l-5 20-5-8z" /></svg>
      <span className="spark s1" aria-hidden="true" /><span className="spark s2" aria-hidden="true" />

      <div className="svc-inner">
        <div className="svc-head">
          <div>
            <p className="eyebrow">What we handle</p>
            <h2>One team, the whole <span className="grad-text">marketing back office</span></h2>
            <p className="sub">
              The tiers differ in content volume, ad reach, local-search depth, market analysis and the level of
              production and testing included.
            </p>
          </div>
          <div className="svc-note" aria-hidden="true">
            <p className="hand">Everything you need to grow, handled in one place.</p>
            <svg className="swirl" viewBox="0 0 120 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path className="sw-line" pathLength="1" d="M8 4C16 44 66 56 110 38" />
              <path className="sw-head" d="M97 30l14 7-12 11" />
            </svg>
            <div className="svc-badge">
              <Icon name="chart" size={44} />
              <p><b>More Customers</b><b>Higher Visibility</b><b>Real Growth</b></p>
            </div>
          </div>
        </div>

        <div className="svc-grid">
          {pillars.map(([icon, tone, title, desc], i) => (
            <article className={`svc-card ${tone}`} key={title}>
              <span className="svc-ico"><Icon name={icon} size={30} /></span>
              <div className="svc-body">
                <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <a className="svc-go" href="#tiers" aria-label={`See tiers that include ${title}`}><Icon name="arrow" size={14} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
