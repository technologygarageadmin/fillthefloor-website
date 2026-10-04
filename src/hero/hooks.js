import { useEffect, useRef, useState } from 'react'

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ref + "has been seen" (stays true) + "is visible right now" (used to pause animations off-screen)
export function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting)
      if (e.isIntersecting) setSeen(true)
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen, visible]
}

// eased count-up from 0 to `target`, started once `run` turns true
export function useCountUp(target, run, { duration = 1600, delay = 0 } = {}) {
  const [n, setN] = useState(() => (reduceMotion() ? target : 0))
  useEffect(() => {
    if (!run || reduceMotion()) return undefined
    let raf = 0
    let start = 0
    const tick = (t) => {
      start ||= t
      const p = Math.min(1, (t - start) / duration)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [run, target, duration, delay])
  return n
}
