import { useRef } from 'react'
import logo from './assets/FTF Animated Logo.webm'

const SPEED = 0.5   // 1 = original speed

export default function AnimatedLogo({ className, label = '' }) {
  const ref = useRef(null)
  return (
    <video
      ref={ref}
      onLoadedMetadata={() => { ref.current.playbackRate = SPEED }}
      onPlay={() => { ref.current.playbackRate = SPEED }}
      className={className}
      src={logo}
      poster="/logo-mark.png"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
    />
  )
}
