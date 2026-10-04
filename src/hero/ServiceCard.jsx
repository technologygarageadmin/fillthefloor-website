import { Icon } from '../Icon.jsx'

// floating glass card; .sc handles entrance + position, .sc-in handles floating and hover
export default function ServiceCard({ id, icon, title, text, tone, order }) {
  return (
    <div className={`hsc hsc-${id}`} style={{ '--o': order }}>
      <div className={`hsc-in ${tone}`} tabIndex={0}>
        <span className="hsc-ico"><Icon name={icon} size={24} /></span>
        <div><h4>{title}</h4><p>{text}</p></div>
      </div>
    </div>
  )
}
