import { reduceMotion } from './hooks.js'

// a thin gradient ribbon that links the service cards to the dashboard, with small data points flowing along it.
// It is a soft rounded loop behind the dashboard, deliberately not an infinity shape.
const PATH =
  'M120 470 C40 400 30 250 110 170 C190 90 330 70 430 90 C540 112 640 120 690 210 C740 300 700 400 610 470 C520 540 380 560 280 540 C220 528 160 506 120 470Z'

export default function AnimatedGradientPath() {
  const still = reduceMotion()
  return (
    <svg className="ribbon" viewBox="0 0 760 600" aria-hidden="true">
      <defs>
        <linearGradient id="rb-grad" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="720" y2="0">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset=".34" stopColor="#ec4899" />
          <stop offset=".68" stopColor="#f97316" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="rb-blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7" /></filter>
        <path id="rb-path" d={PATH} />
      </defs>
      <use href="#rb-path" className="rb-glow" fill="none" stroke="url(#rb-grad)" strokeWidth="10" filter="url(#rb-blur)" />
      <use href="#rb-path" className="rb-line" fill="none" stroke="url(#rb-grad)" strokeWidth="2.6" strokeLinecap="round" />
      <use href="#rb-path" className="rb-flow" fill="none" stroke="url(#rb-grad)" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 34" />
      {!still && [0, -4.7, -9.3].map((begin) => (
        <circle key={begin} r="4.5" fill="#fff" stroke="#ec4899" strokeWidth="2">
          <animateMotion dur="14s" begin={`${begin}s`} repeatCount="indefinite"><mpath href="#rb-path" /></animateMotion>
        </circle>
      ))}
    </svg>
  )
}
