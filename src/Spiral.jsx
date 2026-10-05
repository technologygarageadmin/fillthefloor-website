import { useEffect, useRef, useState } from 'react'
import './spiral.css'
import { tiles as images } from './spiralTiles.js'

const PAGE = 0xfdfcff                 // same colour as the page, so the scene blends in
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export default function Spiral() {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const [shown, setShown] = useState(0)
  const [swap, setSwap] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    let disposed = false
    let cleanup = () => {}
    let swapTimer = 0

    const start = async () => {
      const THREE = await import('three')
      if (disposed) return

      /* ---------- textures: every service illustration side by side on one canvas ---------- */
      if (document.fonts) await Promise.all(['700 30px "Plus Jakarta Sans"', '800 30px "Plus Jakarta Sans"', '500 20px "Plus Jakarta Sans"'].map((f) => document.fonts.load(f).catch(() => {})))
      if (disposed) return
      const baseH = 500
      const ratios = images.map((t) => t.ratio)
      const tc = document.createElement('canvas')
      tc.height = baseH
      tc.width = Math.round(ratios.reduce((a, r) => a + baseH * r, 0))
      const ctx = tc.getContext('2d')
      let x = 0
      images.forEach((tile) => {
        const w = Math.round(baseH * tile.ratio)
        ctx.save()
        ctx.translate(x, 0)
        ctx.beginPath(); ctx.rect(0, 0, w, baseH); ctx.clip()
        tile.draw(ctx, w)
        ctx.restore()
        x += w
      })
      const texture = new THREE.CanvasTexture(tc)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false

      /* ---------- scene ---------- */
      const cfg = { imageHeight: 7, spiralRadius: 3.5, spiralTurns: 2.2, spiralHeight: 9.2 }
      const widthOf = () => canvas.clientWidth
      const heightOf = () => canvas.clientHeight

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(PAGE, 1)
      renderer.setSize(widthOf(), heightOf(), false)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, widthOf() / heightOf(), 0.1, 1000)
      camera.position.set(0, 3.5, 9)

      const tilt = new THREE.Group()
      const base = { x: -0.18, z: 0.12 }
      const drag = { x: 0, z: 0 }
      tilt.rotation.set(base.x, 0, base.z)
      scene.add(tilt)

      const widths = ratios.map((r) => r * cfg.imageHeight)
      const total = widths.reduce((a, b) => a + b, 0)
      const cum = [0]
      widths.forEach((w, i) => cum.push(cum[i] + w / total))

      // plane bent into a helix: x along the strip becomes angle, so images wrap around the spiral
      const geometry = new THREE.PlaneGeometry(total, cfg.imageHeight, 200 + images.length * 20, 24)
      const pos = geometry.attributes.position
      const uv = geometry.attributes.uv
      for (let i = 0; i < pos.count; i++) {
        const t = clamp((pos.getX(i) + total / 2) / total, 0, 1)
        const angle = t * Math.PI * 2 * cfg.spiralTurns
        const radius = cfg.spiralRadius * (1 - t * 0.12)
        pos.setXYZ(i, Math.sin(angle) * radius, (t - 0.5) * cfg.spiralHeight + pos.getY(i) * 0.35, Math.cos(angle) * radius)
        // keep UVs a hair inside each image so neighbours never bleed into each other
        const u = clamp(uv.getX(i), 0, 0.999999)
        let j = cum.findIndex((c, k) => u >= c && u < cum[k + 1])
        if (j < 0 || j >= images.length) { uv.setX(i, cum[images.length] - 0.001); continue }
        const local = clamp((u - cum[j]) / (cum[j + 1] - cum[j]), 0.001, 0.999)
        uv.setX(i, cum[j] + local * (cum[j + 1] - cum[j]))
      }

      const material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          offset: { value: 0 },
          focus: { value: new THREE.Vector2(0, 0) },
          bw: { value: new THREE.Vector2(0.0016, 0.035) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform sampler2D map;
          uniform float offset;
          uniform vec2 focus;
          uniform vec2 bw;
          varying vec2 vUv;
          void main() {
            float u = fract(vUv.x + offset);
            vec4 color = texture2D(map, vec2(u, vUv.y));
            // the main image gets a violet frame, the others fade towards the page colour
            if (focus.y > focus.x) {
              if (u >= focus.x && u <= focus.y) {
                float edge = min(min(u - focus.x, focus.y - u) / bw.x, min(vUv.y, 1.0 - vUv.y) / bw.y);
                color.rgb = mix(vec3(0.43, 0.29, 1.0), color.rgb, smoothstep(0.7, 1.0, edge));
              } else {
                color.rgb = mix(vec3(0.992, 0.988, 1.0), color.rgb, 0.5);
              }
            }
            // the far side of the helix is seen from behind (mirrored), so keep it very faint
            if (!gl_FrontFacing) color.rgb = mix(vec3(0.992, 0.988, 1.0), color.rgb, 0.12);
            gl_FragColor = color;
          }`,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(-2, 4.38, 0)
      mesh.rotation.x = 0.35
      tilt.add(mesh)

      /* ---------- view: keep the biggest image centred ---------- */
      let viewX = 0
      let viewY = 0
      let targetNdcX = 0
      const applyView = () => camera.setViewOffset(widthOf(), heightOf(), -viewX, -viewY, widthOf(), heightOf())
      const layout = () => {
        const sw = stage.clientWidth
        const wide = sw >= 1000
        stage.classList.toggle('compact', !wide)
        camera.zoom = wide ? 0.82 : sw >= 600 ? 0.8 : 0.62
        targetNdcX = wide ? 0.24 : 0     // room for the caption on the left
        camera.aspect = widthOf() / heightOf()
        renderer.setSize(widthOf(), heightOf(), false)
        applyView()
      }
      layout()

      // closest point of the strip's centre line to the camera = the biggest image on screen
      const probe = new THREE.Vector3()
      const frontPoint = () => {
        mesh.updateMatrixWorld(true)
        camera.updateMatrixWorld(true)
        let bestT = 0
        let bestD = Infinity
        const best = new THREE.Vector3()
        for (let i = 0; i <= 240; i++) {
          const t = i / 240
          const a = t * Math.PI * 2 * cfg.spiralTurns
          const r = cfg.spiralRadius * (1 - t * 0.12)
          probe.set(Math.sin(a) * r, (t - 0.5) * cfg.spiralHeight, Math.cos(a) * r)
          mesh.localToWorld(probe)
          const d = probe.distanceTo(camera.position)
          if (d < bestD) { bestD = d; bestT = t; best.copy(probe) }
        }
        return { t: bestT, v: best }
      }

      let focusIdx = -1
      const setFocus = (j) => {
        const first = focusIdx === -1
        focusIdx = j
        material.uniforms.focus.value.set(cum[j], cum[j + 1])
        if (first) { setShown(j); setReady(true); return }
        setSwap(true)
        clearTimeout(swapTimer)
        swapTimer = setTimeout(() => { setShown(j); setSwap(false) }, 220)
      }

      const pick = () => {
        const { t, v } = frontPoint()
        v.project(camera)
        viewX = clamp(viewX + (targetNdcX - v.x) * (widthOf() / 2) * 0.12, -widthOf() * 0.6, widthOf() * 0.6)
        viewY = clamp(viewY + v.y * (heightOf() / 2) * 0.12, -heightOf() * 0.8, heightOf() * 0.8)
        applyView()
        const u = (((t + material.uniforms.offset.value) % 1) + 1) % 1
        const j = cum.findIndex((c, k) => k < images.length && u >= c && u < cum[k + 1])
        if (j >= 0 && j !== focusIdx) setFocus(j)
      }

      /* ---------- input: wheel over the stage spins it, anywhere else scrolls the page ---------- */
      let target = 0
      let current = 0
      const onWheel = (e) => { e.preventDefault(); target += (e.deltaY + e.deltaX) * 0.0005 }
      stage.addEventListener('wheel', onWheel, { passive: false })

      let dragging = false
      let last = { x: 0, y: 0 }
      const onDown = (e) => { dragging = true; last = { x: e.clientX, y: e.clientY }; stage.style.cursor = 'grabbing' }
      const onMove = (e) => {
        if (!dragging) return
        drag.z = clamp(drag.z + (e.clientX - last.x) * 0.002, -0.35, 0.35)
        drag.x = clamp(drag.x - (e.clientY - last.y) * 0.002, -0.35, 0.35)
        tilt.rotation.set(base.x + drag.x, 0, base.z + drag.z)
        last = { x: e.clientX, y: e.clientY }
      }
      const onUp = () => { dragging = false; stage.style.cursor = 'grab' }
      stage.style.cursor = 'grab'
      stage.addEventListener('mousedown', onDown)
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)

      // touch screens keep page scrolling, so the spiral drifts on its own (unless motion is reduced)
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const touchOnly = window.matchMedia('(hover: none)').matches
      const drift = touchOnly && !still

      let visible = true
      // touch: swipe sideways on the spiral to spin it (page scrolling leaves it alone)
      let touch = null
      const onTouchStart = (e) => { const t = e.touches[0]; touch = { x: t.clientX, y: t.clientY } }
      const onTouchMove = (e) => {
        if (!touch) return
        const t = e.touches[0]
        const dx = t.clientX - touch.x
        if (Math.abs(dx) > Math.abs(t.clientY - touch.y)) target -= dx * 0.0016
        touch = { x: t.clientX, y: t.clientY }
      }
      const onTouchEnd = () => { touch = null }
      if (touchOnly) {
        stage.addEventListener('touchstart', onTouchStart, { passive: true })
        stage.addEventListener('touchmove', onTouchMove, { passive: true })
        stage.addEventListener('touchend', onTouchEnd)
      }

      const ro = new ResizeObserver(layout)
      ro.observe(stage)

      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '100px' })
      io.observe(stage)

      let raf = 0
      const loop = () => {
        raf = requestAnimationFrame(loop)
        if (!visible) return
        if (drift) target += 0.0004
        current += (target - current) * 0.12
        material.uniforms.offset.value = ((current % 1) + 1) % 1
        pick()
        renderer.render(scene, camera)
      }
      loop()

      cleanup = () => {
        cancelAnimationFrame(raf)
        clearTimeout(swapTimer)
        ro.disconnect()
        io.disconnect()
        stage.removeEventListener('wheel', onWheel)
        stage.removeEventListener('mousedown', onDown)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
        stage.removeEventListener('touchstart', onTouchStart)
        stage.removeEventListener('touchmove', onTouchMove)
        stage.removeEventListener('touchend', onTouchEnd)
        geometry.dispose()
        material.dispose()
        texture.dispose()
        renderer.dispose()
      }
    }

    // only load three.js and the 23 images once the section is close to the viewport
    const gate = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { gate.disconnect(); start() }
    }, { rootMargin: '400px' })
    gate.observe(stage)

    return () => { disposed = true; gate.disconnect(); cleanup() }
  }, [])

  const cap = images[shown]

  return (
    <section id="showcase" className="spiral-sec">
      <header className="spiral-head">
        <p className="eyebrow">Our services in action</p>
        <h2>See what we <span className="grad-text">deliver</span></h2>
        <p className="sub">A look at the work behind each service. Scroll with your cursor over the spiral, or swipe it sideways on touch, to explore.</p>
      </header>

      <div className="spiral-stage" ref={stageRef}>
        <canvas ref={canvasRef} aria-hidden="true" />
        {!ready && <p className="spiral-loading">Loading…</p>}
        <div className={`spiral-cap${swap ? ' swap' : ''}${ready ? ' on' : ''}`} aria-live="polite">
          <div className="sc-count">{String(shown + 1).padStart(2, '0')}<small>/ {images.length}</small></div>
          <span className="sc-bar" />
          <span className="sc-tag">{cap.tag}</span>
          <h3>{cap.title}</h3>
          <p>{cap.text}</p>
        </div>
      </div>
    </section>
  )
}
