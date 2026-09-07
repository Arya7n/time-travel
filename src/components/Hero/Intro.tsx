import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { patchEngine } from '../../engine/timeEngine.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'

function useIntroStars(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      v: Math.random() * 0.00025 + 0.00005,
    }))
    let raf = 0
    const draw = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255,255,255,0.55)'
      for (const star of stars) {
        star.y -= star.v
        if (star.y < 0) star.y = 1
        ctx.beginPath()
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [canvasRef])
}

export function Intro() {
  const root = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useIntroStars(canvasRef)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.from('.intro-line', {
        y: reduced ? 0 : 70,
        opacity: 0,
        duration: reduced ? 0.2 : 1.15,
        stagger: reduced ? 0 : 0.16,
        ease: 'power3.out',
      })
      gsap.from('.intro-sub, .intro-hint', {
        opacity: 0,
        y: reduced ? 0 : 16,
        delay: reduced ? 0 : 1.05,
        duration: 0.8,
      })
    }, root)

    const timer = window.setTimeout(() => patchEngine({ introComplete: true }), 5200)
    return () => {
      ctx.revert()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <motion.div
      ref={root}
      className="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={canvasRef} className="intro-stars" aria-hidden />
      <div>
        <h1>
          <div className="intro-line">TIME</div>
          <div className="intro-line">IS NOT</div>
          <div className="intro-line">LINEAR.</div>
        </h1>
        <MagneticButton
          className="intro-sub"
          cursor="ENTER"
          onClick={() => patchEngine({ introComplete: true })}
        >
          EXPLORE THE TIMELINE
        </MagneticButton>
        <p className="intro-hint">DRAG TO TRAVEL</p>
      </div>
    </motion.div>
  )
}

