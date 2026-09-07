import { useEffect, useRef } from 'react'

export function useMousePosition() {
  const pos = useRef({ x: 0.5, y: 0.5, mx: 0, my: 0 })

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pos.current.mx = event.clientX
      pos.current.my = event.clientY
      pos.current.x = event.clientX / window.innerWidth
      pos.current.y = event.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return pos
}
