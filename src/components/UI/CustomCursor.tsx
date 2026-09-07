import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useMedia.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'

export function CustomCursor() {
  const mobile = useIsMobile()
  const { cursorLabel } = useTimeline()
  const ring = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    if (mobile) return
    const onMove = (event: PointerEvent) => {
      pos.current.tx = event.clientX
      pos.current.ty = event.clientY
    }
    window.addEventListener('pointermove', onMove)
    let raf = 0
    const loop = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * 0.22
      pos.current.y += (pos.current.ty - pos.current.y) * 0.22
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
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
    <div ref={ring} className={`cursor${cursorLabel ? ' is-hover' : ''}`} aria-hidden>
      <div className="cursor-ring">
        <span className="cursor-label">{cursorLabel}</span>
      </div>
    </div>
  )
}
