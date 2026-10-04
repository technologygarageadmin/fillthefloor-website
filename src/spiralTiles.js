// Illustrations of the services FillTheFloor provides, drawn straight onto a canvas
// (so there are no photos to load). Each tile is drawn at 500px tall; `ratio` is width / height.

const NAVY = '#0b1730'
const VIOLET = '#6d4aff'
const BLUE = '#3b6bff'
const TEAL = '#12b5cb'
const ORANGE = '#f97316'
const GREEN = '#10b981'
const SOFT = '#f4f1ff'
const GREY = '#e3e7f1'
const MUTED = '#8a93a8'
const INKC = '#26324a'

const H = 500

function rr(c, x, y, w, h, r) {
  const k = Math.min(r, w / 2, h / 2)
  c.beginPath()
  c.moveTo(x + k, y)
  c.arcTo(x + w, y, x + w, y + h, k)
  c.arcTo(x + w, y + h, x, y + h, k)
  c.arcTo(x, y + h, x, y, k)
  c.arcTo(x, y, x + w, y, k)
  c.closePath()
}
const fillRR = (c, x, y, w, h, r, fill) => { rr(c, x, y, w, h, r); c.fillStyle = fill; c.fill() }
const grad = (c, x0, y0, x1, y1, stops) => {
  const g = c.createLinearGradient(x0, y0, x1, y1)
  stops.forEach(([o, col]) => g.addColorStop(o, col))
  return g
}
const rect = (c, w, h, fill) => { c.fillStyle = fill; c.fillRect(0, 0, w, h) }
const text = (c, s, x, y, { size = 28, weight = 700, color = NAVY, align = 'left' } = {}) => {
  c.font = `${weight} ${size}px "Plus Jakarta Sans", system-ui, sans-serif`
  c.fillStyle = color
  c.textAlign = align
  c.textBaseline = 'alphabetic'
  c.fillText(s, x, y)
}
const circle = (c, x, y, r, fill) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = fill; c.fill() }
const lines = (c, x, y, widths, { h = 12, gap = 12, fill = GREY } = {}) => {
  widths.forEach((w, i) => fillRR(c, x, y + i * (h + gap), w, h, h / 2, fill))
}
const star = (c, cx, cy, r, fill) => {
  c.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const rad = i % 2 ? r * 0.45 : r
    c.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad)
  }
  c.closePath()
  c.fillStyle = fill
  c.fill()
}
const play = (c, cx, cy, s, fill) => {
  c.beginPath(); c.moveTo(cx - s * 0.4, cy - s * 0.55); c.lineTo(cx + s * 0.65, cy); c.lineTo(cx - s * 0.4, cy + s * 0.55); c.closePath()
  c.fillStyle = fill; c.fill()
}
const shadowCard = (c, x, y, w, h, r, fill = '#fff') => {
  c.save(); c.shadowColor = 'rgba(11,23,48,.18)'; c.shadowBlur = 28; c.shadowOffsetY = 10
  fillRR(c, x, y, w, h, r, fill); c.restore()
}

export const tiles = [
  /* ---------------- Creative content ---------------- */
  {
    ratio: 0.8, tag: 'Creative content', title: 'Poster posts',
    text: 'Eye-catching poster-style posts built around your offer and your brand.',
    draw(c, w) {
      rect(c, w, H, grad(c, 0, 0, w, H, [[0, '#ffa23c'], [0.55, '#ff6a5a'], [1, VIOLET]]))
      circle(c, w * 0.82, 110, 120, 'rgba(255,255,255,.18)')
      circle(c, w * 0.15, 430, 150, 'rgba(255,255,255,.12)')
      text(c, 'WEEKEND', 40, 230, { size: 74, weight: 800, color: '#fff' })
      text(c, 'SPECIAL', 40, 305, { size: 74, weight: 800, color: '#fff' })
      text(c, 'Fresh. Local. Yours.', 44, 352, { size: 24, weight: 600, color: 'rgba(255,255,255,.9)' })
      fillRR(c, 40, 392, 190, 56, 28, '#fff')
      text(c, 'Visit us today', 135, 428, { size: 22, color: NAVY, align: 'center' })
    },
  },
  {
    ratio: 0.56, tag: 'Creative content', title: 'Reels',
    text: 'Short, scroll-stopping reels planned, produced and scheduled for you.',
    draw(c, w) {
      rect(c, w, H, grad(c, 0, 0, w, H, [[0, NAVY], [1, '#3a2a99']]))
      for (let i = 0; i < 4; i++) fillRR(c, 20 + i * ((w - 40) / 4), 22, (w - 40) / 4 - 6, 5, 3, i < 2 ? '#fff' : 'rgba(255,255,255,.35)')
      fillRR(c, 20, 44, 78, 30, 15, 'rgba(255,255,255,.18)')
      text(c, 'REEL', 59, 66, { size: 16, color: '#fff', align: 'center' })
      circle(c, w / 2, 235, 52, 'rgba(255,255,255,.95)')
      play(c, w / 2 + 4, 235, 40, VIOLET)
      lines(c, 20, 380, [w - 120, w - 170, w - 210], { h: 10, gap: 10, fill: 'rgba(255,255,255,.55)' })
      for (let i = 0; i < 3; i++) circle(c, w - 30, 300 + i * 52, 18, 'rgba(255,255,255,.22)')
    },
  },
  {
    ratio: 1.35, tag: 'Creative content', title: 'Content calendar',
    text: 'A calendar reaches you ahead of the month. You approve it before anything goes live.',
    draw(c, w) {
      rect(c, w, H, SOFT)
      text(c, 'Content calendar', 36, 66, { size: 34, weight: 800 })
      fillRR(c, w - 190, 36, 154, 40, 20, '#fff')
      text(c, 'Approved', w - 113, 63, { size: 18, color: GREEN, align: 'center' })
      const cw = (w - 72 - 6 * 10) / 7
      const chips = { 1: ['POST', BLUE], 4: ['REEL', VIOLET], 9: ['POST', BLUE], 12: ['REEL', VIOLET], 16: ['POST', BLUE], 19: ['POST', TEAL], 23: ['REEL', VIOLET], 25: ['POST', BLUE] }
      for (let i = 0; i < 28; i++) {
        const x = 36 + (i % 7) * (cw + 10)
        const y = 108 + Math.floor(i / 7) * 92
        fillRR(c, x, y, cw, 82, 12, '#fff')
        text(c, String(i + 1), x + 10, y + 22, { size: 14, weight: 600, color: MUTED })
        if (chips[i]) { fillRR(c, x + 8, y + 36, cw - 16, 32, 8, chips[i][1]); text(c, chips[i][0], x + cw / 2, y + 58, { size: 15, color: '#fff', align: 'center' }) }
      }
    },
  },

  /* ---------------- Paid advertising ---------------- */
  {
    ratio: 0.82, tag: 'Paid advertising', title: 'Meta ads',
    text: 'Instagram and Facebook campaigns, paced weekly at your tier’s rate.',
    draw(c, w) {
      rect(c, w, H, '#eef0ff')
      shadowCard(c, 24, 24, w - 48, H - 48, 24)
      circle(c, 66, 74, 24, grad(c, 40, 50, 90, 100, [[0, VIOLET], [1, TEAL]]))
      text(c, 'Your Brand', 104, 72, { size: 22 })
      text(c, 'Sponsored', 104, 98, { size: 16, weight: 500, color: MUTED })
      fillRR(c, 40, 122, w - 80, 220, 16, grad(c, 0, 0, w, 340, [[0, TEAL], [1, BLUE]]))
      circle(c, w * 0.62, 200, 64, 'rgba(255,255,255,.25)')
      text(c, 'New season', 62, 228, { size: 40, weight: 800, color: '#fff' })
      text(c, 'now open', 62, 274, { size: 40, weight: 800, color: '#fff' })
      fillRR(c, 40, 362, w - 80, 56, 14, '#f1f3fb')
      text(c, 'Learn more', 60, 397, { size: 20 })
      fillRR(c, w - 150, 372, 90, 36, 18, BLUE)
      text(c, 'Open', w - 105, 397, { size: 17, color: '#fff', align: 'center' })
      for (let i = 0; i < 3; i++) circle(c, 54 + i * 40, 450, 12, GREY)
    },
  },
  {
    ratio: 1.4, tag: 'Paid advertising', title: 'Google ads',
    text: 'Search ads that put you in front of people already looking for what you sell.',
    draw(c, w) {
      rect(c, w, H, '#fff')
      fillRR(c, 36, 36, w - 72, 64, 32, '#f1f3fb')
      c.strokeStyle = MUTED; c.lineWidth = 4; c.beginPath(); c.arc(74, 66, 11, 0, Math.PI * 2); c.moveTo(82, 74); c.lineTo(92, 84); c.stroke()
      text(c, 'coffee near me', 112, 78, { size: 24, weight: 500, color: INKC })
      fillRR(c, 36, 140, 44, 26, 6, 'transparent'); c.strokeStyle = NAVY; c.lineWidth = 2; rr(c, 37, 141, 42, 24, 6); c.stroke()
      text(c, 'Ad', 58, 160, { size: 16, align: 'center' })
      text(c, 'www.yourbusiness.com', 96, 160, { size: 18, weight: 500, color: GREEN })
      text(c, 'Fresh coffee & pastries, open daily', 36, 208, { size: 30, weight: 700, color: BLUE })
      lines(c, 36, 232, [w - 120, w - 220], { h: 12, gap: 12 })
      lines(c, 36, 300, [w - 72], { h: 1, gap: 0, fill: GREY })
      fillRR(c, 36, 330, 160, 14, 7, GREY); fillRR(c, 36, 356, w - 140, 14, 7, GREY); fillRR(c, 36, 382, w - 260, 14, 7, GREY)
      fillRR(c, 36, 430, 220, 14, 7, GREY); fillRR(c, 36, 456, w - 160, 14, 7, GREY)
    },
  },
  {
    ratio: 0.56, tag: 'Paid advertising', title: 'TikTok ads',
    text: 'Short video placements to reach new audiences, available from Tier 3.',
    draw(c, w) {
      rect(c, w, H, grad(c, 0, 0, w, H, [[0, '#06121f'], [1, '#0b5563']]))
      fillRR(c, 20, 24, 62, 30, 15, 'rgba(255,255,255,.2)')
      text(c, 'Ad', 51, 46, { size: 16, color: '#fff', align: 'center' })
      circle(c, w / 2 - 20, 220, 46, 'rgba(255,255,255,.14)')
      play(c, w / 2 - 14, 220, 34, '#fff')
      for (let i = 0; i < 4; i++) circle(c, w - 32, 250 + i * 56, 20, i === 0 ? TEAL : 'rgba(255,255,255,.22)')
      text(c, '@yourbrand', 20, 392, { size: 20, color: '#fff' })
      lines(c, 20, 408, [w - 110, w - 160], { h: 10, gap: 10, fill: 'rgba(255,255,255,.5)' })
      fillRR(c, 20, 452, w - 40, 36, 18, TEAL)
      text(c, 'Shop now', w / 2, 477, { size: 17, color: '#fff', align: 'center' })
    },
  },

  /* ---------------- SEO / AEO ---------------- */
  {
    ratio: 1.0, tag: 'SEO', title: 'SEO scan and fix',
    text: 'Automated scans and plain-English reports, with fixes applied by our web team from Tier 2.',
    draw(c, w) {
      rect(c, w, H, '#fff')
      text(c, 'SEO / AEO scan', 36, 66, { size: 32, weight: 800 })
      c.lineWidth = 16; c.lineCap = 'round'
      c.strokeStyle = GREY; c.beginPath(); c.arc(w - 110, 160, 56, 0, Math.PI * 2); c.stroke()
      c.strokeStyle = TEAL; c.beginPath(); c.arc(w - 110, 160, 56, -Math.PI / 2, Math.PI * 0.9); c.stroke()
      ;[['Page titles', 'Fixed'], ['Meta descriptions', 'Fixed'], ['Speed', 'Fixed'], ['Local schema', 'Rescan']].forEach(([t, b], i) => {
        const y = 230 + i * 62
        fillRR(c, 36, y, w - 72, 50, 14, SOFT)
        circle(c, 66, y + 25, 13, GREEN)
        c.strokeStyle = '#fff'; c.lineWidth = 3.5; c.beginPath(); c.moveTo(59, y + 25); c.lineTo(64, y + 31); c.lineTo(74, y + 19); c.stroke()
        text(c, t, 92, y + 32, { size: 20, weight: 600 })
        fillRR(c, w - 150, y + 11, 90, 28, 14, b === 'Fixed' ? '#d9f7e7' : '#dfeaff')
        text(c, b, w - 105, y + 31, { size: 15, color: b === 'Fixed' ? GREEN : BLUE, align: 'center' })
      })
    },
  },
  {
    ratio: 1.15, tag: 'AEO', title: 'Answer engines',
    text: 'Optimised so answer engines and AI assistants can understand and surface your business.',
    draw(c, w) {
      rect(c, w, H, grad(c, 0, 0, w, H, [[0, NAVY], [1, '#1b2b6b']]))
      fillRR(c, w - 300, 36, 264, 54, 27, 'rgba(255,255,255,.14)')
      text(c, 'Best café near me?', w - 168, 70, { size: 21, weight: 600, color: '#fff', align: 'center' })
      fillRR(c, 36, 120, w - 72, 330, 24, 'rgba(255,255,255,.96)')
      text(c, '✦', 66, 170, { size: 28, color: VIOLET })
      text(c, 'Top answer', 104, 168, { size: 22, color: VIOLET })
      lines(c, 66, 200, [w - 180, w - 230], { h: 12, gap: 12 })
      fillRR(c, 66, 262, w - 132, 112, 16, '#e8efff')
      circle(c, 102, 318, 22, BLUE)
      text(c, 'Your business', 140, 312, { size: 24 })
      text(c, 'Open now · Rated highly · Nearby', 140, 344, { size: 17, weight: 500, color: MUTED })
      lines(c, 66, 396, [w - 200], { h: 10, gap: 0 })
    },
  },

  /* ---------------- Google Business Profile ---------------- */
  {
    ratio: 0.85, tag: 'Local', title: 'Google Business Profile',
    text: 'Claimed, optimised and managed, from a verified listing to full local rank tracking.',
    draw(c, w) {
      rect(c, w, H, '#e9f4f2')
      c.strokeStyle = '#fff'; c.lineWidth = 14
      ;[[0, 90, w, 130], [0, 190, w, 150], [120, 0, 170, 250], [260, 0, 230, 250]].forEach(([a, b, x, y]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke() })
      circle(c, w * 0.52, 120, 40, 'rgba(18,181,203,.22)')
      c.fillStyle = ORANGE; c.beginPath(); c.moveTo(w * 0.52, 168); c.bezierCurveTo(w * 0.52 - 38, 118, w * 0.52 - 30, 76, w * 0.52, 76); c.bezierCurveTo(w * 0.52 + 30, 76, w * 0.52 + 38, 118, w * 0.52, 168); c.fill()
      circle(c, w * 0.52, 112, 13, '#fff')
      shadowCard(c, 20, 224, w - 40, 256, 22)
      text(c, 'Your Business', 44, 276, { size: 28, weight: 800 })
      for (let i = 0; i < 5; i++) star(c, 54 + i * 32, 308, 13, '#f5b301')
      text(c, 'Open now', 220, 314, { size: 17, weight: 600, color: GREEN })
      lines(c, 44, 340, [w - 130, w - 190], { h: 11, gap: 11 })
      ;['Call', 'Directions'].forEach((t, i) => { fillRR(c, 44 + i * 150, 410, 134, 46, 23, i ? BLUE : '#e8efff'); text(c, t, 111 + i * 150, 440, { size: 18, color: i ? '#fff' : BLUE, align: 'center' }) })
    },
  },
  {
    ratio: 1.2, tag: 'Local', title: 'Reviews and Q&A',
    text: 'Review replies and Q&A handled for you, from Tier 2.',
    draw(c, w) {
      rect(c, w, H, SOFT)
      shadowCard(c, 28, 34, w - 120, 190, 22)
      circle(c, 72, 82, 22, grad(c, 50, 60, 94, 104, [[0, ORANGE], [1, VIOLET]]))
      for (let i = 0; i < 5; i++) star(c, 112 + i * 28, 82, 11, '#f5b301')
      lines(c, 52, 122, [w - 190, w - 230, w - 270], { h: 12, gap: 14 })
      shadowCard(c, 92, 262, w - 120, 190, 22, grad(c, 0, 262, w, 452, [[0, VIOLET], [1, BLUE]]))
      text(c, 'Reply from owner', 120, 310, { size: 20, color: 'rgba(255,255,255,.85)' })
      text(c, 'Thank you for visiting!', 120, 356, { size: 28, weight: 800, color: '#fff' })
      lines(c, 120, 384, [w - 230, w - 290], { h: 11, gap: 12, fill: 'rgba(255,255,255,.5)' })
    },
  },

  /* ---------------- Market analytics ---------------- */
  {
    ratio: 1.35, tag: 'Analytics', title: 'Market analysis',
    text: 'Competitor analysis for your area, plus POS item-level sales data from Tier 2.',
    draw(c, w) {
      rect(c, w, H, '#f4f7ff')
      text(c, 'Market analysis', 36, 66, { size: 32, weight: 800 })
      const bars = [0.4, 0.62, 0.5, 0.78, 0.58, 0.9]
      const bw = (w - 72 - 5 * 18) / 6
      bars.forEach((v, i) => fillRR(c, 36 + i * (bw + 18), 440 - v * 300, bw, v * 300, 12, grad(c, 0, 140, 0, 440, [[0, i === 5 ? ORANGE : BLUE], [1, i === 5 ? '#ffb15c' : VIOLET]])))
      c.strokeStyle = NAVY; c.lineWidth = 4; c.lineJoin = 'round'; c.beginPath()
      bars.forEach((v, i) => { const x = 36 + i * (bw + 18) + bw / 2, y = 400 - v * 300 - 24 + (i % 2) * 18; i ? c.lineTo(x, y) : c.moveTo(x, y) })
      c.stroke()
      circle(c, w - 130, 56, 8, BLUE); text(c, 'You', w - 112, 62, { size: 16, weight: 600 })
      circle(c, w - 60, 56, 8, ORANGE); text(c, 'Area', w - 42, 62, { size: 16, weight: 600 })
    },
  },
  {
    ratio: 1.0, tag: 'Analytics', title: 'Audience modelling',
    text: 'ZIP, density, age and income modelling to size your audience (Tier 3).',
    draw(c, w) {
      rect(c, w, H, '#0f1d44')
      c.strokeStyle = 'rgba(255,255,255,.07)'; c.lineWidth = 2
      for (let i = 1; i < 8; i++) { c.beginPath(); c.moveTo(i * (w / 8), 0); c.lineTo(i * (w / 8), H); c.stroke(); c.beginPath(); c.moveTo(0, i * (H / 8)); c.lineTo(w, i * (H / 8)); c.stroke() }
      ;[[150, 170, 120, VIOLET], [340, 250, 140, TEAL], [220, 380, 110, BLUE]].forEach(([x, y, r, col]) => {
        const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)')
        c.globalAlpha = 0.85; c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1
      })
      ;['Age', 'Income', 'Density'].forEach((t, i) => { fillRR(c, 28 + i * 138, 28, 124, 38, 19, 'rgba(255,255,255,.14)'); text(c, t, 90 + i * 138, 54, { size: 18, color: '#fff', align: 'center' }) })
    },
  },
  {
    ratio: 1.25, tag: 'Analytics', title: 'Ad simulators',
    text: 'A/B tests and audience feelers before any budget is committed (Tier 2 and up).',
    draw(c, w) {
      rect(c, w, H, '#fff')
      text(c, 'Test before you spend', 36, 62, { size: 30, weight: 800 })
      ;[['A', BLUE, 0.58], ['B', ORANGE, 0.82]].forEach(([l, col, v], i) => {
        const x = 36 + i * ((w - 90) / 2 + 18), cw = (w - 90) / 2
        fillRR(c, x, 100, cw, 350, 22, SOFT)
        circle(c, x + 40, 148, 24, col); text(c, l, x + 40, 157, { size: 24, color: '#fff', align: 'center' })
        fillRR(c, x + 24, 196, cw - 48, 110, 14, grad(c, x, 196, x + cw, 306, [[0, col], [1, i ? '#ffb15c' : TEAL]]))
        fillRR(c, x + 24, 330, cw - 48, 14, 7, GREY); fillRR(c, x + 24, 330, (cw - 48) * v, 14, 7, col)
        lines(c, x + 24, 366, [cw - 90, cw - 120], { h: 10, gap: 12 })
      })
    },
  },
  {
    ratio: 0.85, tag: 'Reporting', title: 'Monthly report',
    text: 'Every month: what ran, what it reached, what the analytics say and what changes next.',
    draw(c, w) {
      rect(c, w, H, '#fff')
      text(c, 'Monthly report', 32, 62, { size: 30, weight: 800 })
      ;[['Reach', 0.8, VIOLET], ['Engagement', 0.58, BLUE], ['Traffic', 0.7, TEAL], ['Enquiries', 0.46, ORANGE]].forEach(([l, v, col], i) => {
        const y = 104 + i * 86
        circle(c, 52, y + 28, 20, col)
        text(c, l, 90, y + 22, { size: 20, weight: 700 })
        fillRR(c, 90, y + 38, w - 140, 12, 6, GREY); fillRR(c, 90, y + 38, (w - 140) * v, 12, 6, col)
      })
      fillRR(c, 32, 446, w - 64, 38, 19, SOFT)
      text(c, 'What changes next month →', w / 2, 471, { size: 16, weight: 600, color: VIOLET, align: 'center' })
    },
  },

  /* ---------------- Website & hosting (last) ---------------- */
  {
    ratio: 1.35, tag: 'Website', title: 'Website & hosting',
    text: 'We migrate your site onto a stack we maintain and host free on Firebase.',
    draw(c, w) {
      rect(c, w, H, '#eef1ff')
      shadowCard(c, 28, 40, w - 56, H - 80, 22)
      fillRR(c, 28, 40, w - 56, 48, 22, '#f1f3fb'); c.fillStyle = '#f1f3fb'; c.fillRect(28, 66, w - 56, 22)
      ;[GREY, GREY, GREY].forEach((col, i) => circle(c, 58 + i * 22, 64, 6, col))
      fillRR(c, 150, 52, w - 330, 24, 12, '#fff')
      fillRR(c, 52, 112, w - 104, 170, 16, grad(c, 52, 112, w, 282, [[0, VIOLET], [1, TEAL]]))
      text(c, 'Your website', 80, 190, { size: 42, weight: 800, color: '#fff' })
      fillRR(c, 80, 218, 150, 40, 20, '#fff'); text(c, 'Book now', 155, 245, { size: 18, color: VIOLET, align: 'center' })
      lines(c, 52, 308, [w - 200, w - 260], { h: 12, gap: 12 })
      fillRR(c, w - 300, 372, 232, 58, 29, NAVY)
      text(c, 'Managed on Firebase', w - 184, 408, { size: 19, color: '#fff', align: 'center' })
    },
  },
]
