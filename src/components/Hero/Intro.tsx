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
    const stars = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.1 + 0.15,
      v: Math.random() * 0.00018 + 0.00004,
    }))
    let raf = 0
    const draw = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255,255,255,0.42)'
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
        y: reduced ? 0 : 64,
        opacity: 0,
        duration: reduced ? 0.2 : 1.35,
        stagger: reduced ? 0 : 0.12,
        ease: 'power4.out',
      })
      gsap.from('.intro-index, .intro-meta', {
        opacity: 0,
        y: reduced ? 0 : 12,
        delay: reduced ? 0 : 0.95,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
      })
    }, root)

    const timer = window.setTimeout(() => patchEngine({ introComplete: true }), 5600)
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
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <canvas ref={canvasRef} className="intro-stars" aria-hidden />
      <div className="intro-frame">
        <p className="intro-index">An experiment in time</p>
        <h1>
          <span className="intro-line intro-line-lg">Time</span>
          <span className="intro-line intro-line-sm">is not</span>
          <span className="intro-line intro-line-lg">linear.</span>
        </h1>
        <div className="intro-meta">
          <MagneticButton
            className="intro-sub text-link"
            cursor="ENTER"
            onClick={() => patchEngine({ introComplete: true })}
          >
            Explore the timeline
          </MagneticButton>
          <p className="intro-hint">Drag to travel</p>
        </div>
      </div>
    </motion.div>
  )
}
