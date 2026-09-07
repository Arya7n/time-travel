import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AncientEra } from '../Eras/AncientEra.tsx'
import { ArtDecoEra } from '../Eras/ArtDecoEra.tsx'
import { DigitalEra } from '../Eras/DigitalEra.tsx'
import { FutureEra } from '../Eras/FutureEra.tsx'
import { IndustrialEra } from '../Eras/IndustrialEra.tsx'
import { MedievalEra } from '../Eras/MedievalEra.tsx'
import { MidCenturyEra } from '../Eras/MidCenturyEra.tsx'
import { PresentEra } from '../Eras/PresentEra.tsx'
import { FutureScenario } from '../Future/FutureScenario.tsx'
import { WhatIf } from '../Future/WhatIf.tsx'
import { Intro } from '../Hero/Intro.tsx'
import { TimeCapsule } from '../TimeCapsule/TimeCapsule.tsx'
import { Atmosphere } from '../UI/Atmosphere.tsx'
import { CustomCursor } from '../UI/CustomCursor.tsx'
import { ErrorBoundary } from '../UI/ErrorBoundary.tsx'
import { Gears } from '../UI/Gears.tsx'
import { EraNavigation } from './EraNavigation.tsx'
import { EraTransition } from './EraTransition.tsx'
import { Timeline } from './Timeline.tsx'
import { YearDisplay } from './YearDisplay.tsx'
import {
  getLive,
  nudgeTarget,
  setTarget,
  startEngine,
  stopEngine,
} from '../../engine/timeEngine.ts'
import { useMousePosition } from '../../hooks/useMousePosition.ts'
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMedia.ts'
import { useSmoothScroll } from '../../hooks/useSmoothScroll.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { MAX_YEAR, MIN_YEAR, PRESENT_YEAR, tToYear, yearToT } from '../../utils/timeline.ts'

const Scene = lazy(() => import('../Three/Scene.tsx'))

export function TimeMachine() {
  useSmoothScroll()
  const { introComplete, reducedMotion } = useTimeline()
  const mobile = useIsMobile()
  const prefersReduced = usePrefersReducedMotion()
  const mouse = useMousePosition()

  useEffect(() => {
    startEngine()
    return () => stopEngine()
  }, [])

  useEffect(() => {
    const par = { x: 0, y: 0 }
    let raf = 0
    const loop = () => {
      const el = document.querySelector('.year-wrap')
      if (el instanceof HTMLElement && !getLive().reducedMotion) {
        const { x, y } = mouse.current
        par.x += ((x - 0.5) * 8 - par.x) * 0.05
        par.y += ((y - 0.5) * 5 - par.y) * 0.05
        el.style.transform = `translate3d(${par.x}px, ${par.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mouse])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const state = getLive()
      if (!state.introComplete || state.capsuleOpen || state.whatIfOpen) return
      if ((event.target as HTMLElement | null)?.closest('.overlay')) return
      event.preventDefault()
      const speed = event.shiftKey ? 0.00115 : 0.0004
      setTarget(tToYear(yearToT(state.target) + event.deltaY * speed))
    }

    const onKey = (event: KeyboardEvent) => {
      const state = getLive()
      if (!state.introComplete || state.capsuleOpen || state.whatIfOpen) return
      if (event.key === 'ArrowLeft') nudgeTarget(event.shiftKey ? -50 : -12)
      if (event.key === 'ArrowRight') nudgeTarget(event.shiftKey ? 50 : 12)
      if (event.key === 'Home') setTarget(MIN_YEAR)
      if (event.key === 'End') setTarget(MAX_YEAR)
      if (event.key === 'Enter') setTarget(PRESENT_YEAR)
    }

    let lastX = 0
    const onTouchStart = (event: TouchEvent) => {
      lastX = event.touches[0]?.clientX ?? 0
    }
    const onTouchMove = (event: TouchEvent) => {
      const state = getLive()
      if (!state.introComplete || state.capsuleOpen || state.whatIfOpen) return
      const x = event.touches[0]?.clientX ?? lastX
      const dx = x - lastX
      lastX = x
      setTarget(tToYear(yearToT(state.target) - dx * 0.0017))
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <div className="machine">
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <Scene mobile={mobile} reduced={reducedMotion || prefersReduced} />
        </Suspense>
      </ErrorBoundary>
      <Atmosphere />
      <EraTransition />
      <Gears />
      <div className="machine-stage">
        <EraNavigation />
        <div className="stage-copy">
          <YearDisplay />
          <div className="era-stack">
            <AncientEra />
            <MedievalEra />
            <IndustrialEra />
            <ArtDecoEra />
            <MidCenturyEra />
            <DigitalEra />
            <PresentEra />
            <FutureEra />
            <FutureScenario />
          </div>
        </div>
        <Timeline />
      </div>
      <TimeCapsule />
      <WhatIf />
      <AnimatePresence>{introComplete ? null : <Intro key="intro" />}</AnimatePresence>
      <CustomCursor />
    </div>
  )
}
