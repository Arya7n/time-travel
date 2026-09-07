import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useMedia.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'

export function CustomCursor() {
  const mobile = useIsMobile()
  const { cursorLabel } = useTimeline()
  const core = useRef<HTMLDivElement>(null)
  const orbit = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, ox: 0, oy: 0, tx: 0, ty: 0 })

  useEffect(() => {
    if (mobile) return
    const onMove = (event: PointerEvent) => {
      pos.current.tx = event.clientX
      pos.current.ty = event.clientY
    }
    window.addEventListener('pointermove', onMove)
    let raf = 0
    const loop = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.38
      pos.current.y += (pos.current.ty - pos.current.y) * 0.38
      pos.current.ox += (pos.current.tx - pos.current.ox) * 0.14
      pos.current.oy += (pos.current.ty - pos.current.oy) * 0.14
      if (core.current) {
        core.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (orbit.current) {
        orbit.current.style.transform = `translate3d(${pos.current.ox}px, ${pos.current.oy}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [mobile])

  if (mobile) return null

  return (
    <div className={`cursor${cursorLabel ? ' is-hover' : ''}`} aria-hidden>
      <div ref={core} className="cursor-core" />
      <div ref={orbit} className="cursor-orbit">
        <span className="cursor-label">{cursorLabel}</span>
      </div>
    </div>
  )
}
