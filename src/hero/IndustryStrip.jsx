import { Icon } from '../Icon.jsx'
import { useInView } from './hooks.js'

const industries = [['cup', 'Cafés', 'violet'], ['scissors', 'Salons', 'pink'], ['steth', 'Clinics', 'blue'],
  ['bag', 'Boutiques', 'teal'], ['tools', 'Trades', 'orange'], ['home', 'Home Services', 'amber']]

export default function IndustryStrip() {
  const [ref, seen] = useInView(0.4)
  return (
    <div ref={ref} className={`perfect${seen ? ' in' : ''}`}>
      <b>Perfect for</b>
      {industries.map(([icon, label, tone], i) => (
        <span key={label} className="chip" style={{ '--i': i }}>
          <span className={`ci ${tone}`}><Icon name={icon} size={18} /></span>{label}
        </span>
      ))}
      <span className="chip more" style={{ '--i': industries.length }}>…and many more</span>
    </div>
  )
}
