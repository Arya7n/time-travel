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

    const onMove = (event: PointerEvent) => {
      if (reduced) return
      const box = el.getBoundingClientRect()
      const x = event.clientX - (box.left + box.width / 2)
      const y = event.clientY - (box.top + box.height / 2)
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
    }
    const onLeave = () => {
      el.style.transform = 'translate(0,0)'
      setCursorLabel('')
    }
    const onEnter = () => setCursorLabel(cursor)

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerenter', onEnter)
    return () => {
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
