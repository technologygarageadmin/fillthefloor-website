import { Icon } from './Hero.jsx'
import './tiers.css'

const tiers = [
  {
    name: 'Tier 1', icon: 'store', tone: 'blue', title: 'The Baseline',
    blurb: 'One location, one core offering, first time running paid social. A lean start for cafés, salons, boutiques, clinics, trades and home services.',
    items: [
      '6 poster-style posts + 2 reels a month',
      'Managed website, migrated to Firebase',
      'SEO / AEO: scan → report',
      'Google Business Profile claimed + optimised',
      'Level 1 competitor analysis',
      'Paid advertising on Meta',
    ],
    not: 'Google/TikTok ads, review replies, external articles, ad simulators, POS integration, physical shoots',
  },
  {
    name: 'Tier 2', icon: 'bars', tone: 'pink', title: 'The Growth Vector',
    blurb: 'You want measurable growth and have a POS worth reading. More content, Google ads, deeper GBP work and pre-campaign testing.',
    items: [
      '8 posts + 4 reels a month',
      'Managed website and hosting',
      'SEO / AEO: scan → fix → report',
      'GBP: review replies, Q&A, products/services',
      '2 external articles a month',
      'Competitor analysis + POS item-level sales data',
      'Level 1 ad simulators (A/B tests + feelers)',
      'Paid advertising on Meta + Google',
    ],
    not: 'TikTok/AI ads, Level 2/3 modelling, physical shoots',
  },
  {
    name: 'Tier 3', icon: 'diamond', tone: 'violet', title: 'The Premium Offering',
    blurb: 'A fuller marketing operation with stronger local visibility and deeper market modelling.',
    items: [
      '12 posts + 6 reels a month',
      'Managed website and hosting',
      'SEO / AEO: scan → fix → rescan → report',
      'Full GBP: posts, tracked links, multi-location, local rank tracking',
      '4 external articles a month (about one a week)',
      'ZIP, density, age and income modelling',
      'Level 2 & 3 ad simulators',
      'Meta, Google, TikTok + AI/ChatGPT ads',
      'On-location photo & video at additional cost',
    ],
    not: 'Unlimited revisions, production crews in the monthly fee, ad budgets beyond the tier allocation',
  },
  {
    name: 'Custom', icon: 'infinity', tone: 'orange', title: 'Infinite Scale', price: 'Priced on request',
    blurb: 'Multi-location and franchise groups, event-driven businesses, and anyone with a launch, festival or season that needs a scaled campaign.',
    items: [
      'Everything in the Tier 3 operating model',
      'Scaled ad budgets for launches, festivals and peaks',
      'Bespoke platform mix per campaign objective',
      '5+ external articles a month where required',
      'Bespoke analytics and Level 2 & 3 simulation',
      'Extended and personalised video production, scoped separately',
    ],
  },
]


export default function Tiers({ mail, children }) {
  return (
    <section id="tiers" className="tiers-sec">
      <span className="orb2" aria-hidden="true" />
      <div className="tiers-inner">
        <header className="tiers-head">
          <p className="hand hand-l" aria-hidden="true">Start small, grow bigger anytime.</p>
          <div>
            <p className="eyebrow">Service tiers</p>
            <h2>Four ways to work with us</h2>
            <p className="sub">Pick the one that matches your business.</p>
            <span className="bar" />
          </div>
          <p className="hand hand-r" aria-hidden="true">Same team. More growth.</p>
        </header>

        <div className="tier-grid">
          {tiers.map((t) => (
            <article className={`tier ${t.tone}`} key={t.name} tabIndex={0}>
              <span className="t-ico"><Icon name={t.icon} size={30} /></span>
              <div className="t-head">
                <p className="tier-name">{t.name}</p>
                <h3>{t.title}</h3>
                {t.price && <p className="price">{t.price}</p>}
              </div>
              <p className="blurb">{t.blurb}</p>
              <ul>
                {t.items.map((i) => (
                  <li key={i}><span className="tick"><Icon name="check" size={12} /></span>{i}</li>
                ))}
              </ul>
              <p className="not">{t.not && <><strong>Not included:</strong> {t.not}</>}</p>
              <a className="t-btn" href={mail}>
                {t.price ? 'Talk to us' : 'Get started'} <Icon name="arrow" size={16} />
              </a>
            </article>
          ))}
        </div>
        <p className="note">
          Every tier includes the content calendar shared ahead of publication, up to three rounds of
          revisions per cycle, and a monthly report.
        </p>
        {children}
      </div>
    </section>
  )
}
