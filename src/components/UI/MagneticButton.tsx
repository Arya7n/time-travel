import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { setCursorLabel } from '../../engine/timeEngine.ts'

type Props = {
  children: ReactNode
  onClick?: () => void
  className?: string
  cursor?: string
  type?: 'button' | 'submit'
}

export function MagneticButton({
  children,
  onClick,
  className = '',
  cursor = 'ENTER',
  type = 'button',
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0

    const loop = () => {
      state.x += (state.tx - state.x) * 0.16
      state.y += (state.ty - state.y) * 0.16
      el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onMove = (event: PointerEvent) => {
      if (reduced) return
      const box = el.getBoundingClientRect()
      const dx = event.clientX - (box.left + box.width / 2)
      const dy = event.clientY - (box.top + box.height / 2)
      state.tx = Math.max(-14, Math.min(14, dx * 0.22))
      state.ty = Math.max(-10, Math.min(10, dy * 0.22))
    }
    const onLeave = () => {
      state.tx = 0
      state.ty = 0
      setCursorLabel('')
    }
    const onEnter = () => setCursorLabel(cursor)

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerenter', onEnter)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerenter', onEnter)
    }
  }, [cursor])

  return (
    <button ref={ref} type={type} className={`magnetic ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
