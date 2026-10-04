import { useCountUp } from './hooks.js'

// one headline number on the dashboard: counts up, shows a growth chip and a tiny chart
export default function KpiCard({ label, value, delta, viz, run, delay = 0 }) {
  const n = useCountUp(value, run, { delay: 700 + delay })
  return (
    <div className="kpi" style={{ '--d': `${delay}ms` }}>
      <small>{label}</small>
      <strong>{n.toLocaleString('en-US')}</strong>
      <span className="delta">↑ {delta}%</span>
      {viz === 'bars' ? (
        <span className="kv-bars" aria-hidden="true">{[0.4, 0.6, 0.5, 0.8, 1].map((h, i) => <i key={i} style={{ '--h': h, '--i': i }} />)}</span>
      ) : (
        <svg className="kv-spark" viewBox="0 0 60 24" aria-hidden="true">
          <path className="kv-line" pathLength="1" d="M0 19 L10 15 L20 17 L30 9 L40 12 L50 5 L60 3" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}
