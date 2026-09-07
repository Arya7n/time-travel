import { useEffect } from 'react'
import Lenis from 'lenis'
import { getLive } from '../engine/timeEngine.ts'

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    })

    let raf = 0
    const loop = (time: number) => {
      if (!getLive().capsuleOpen && !getLive().whatIfOpen) {
        lenis.raf(time)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
