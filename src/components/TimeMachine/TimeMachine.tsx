import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { adjacentEvent, EVENTS } from '../../data/events.ts'
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
import { CompareBar } from './CompareBar.tsx'
import { Controls } from './Controls.tsx'
import { EchoTrail } from './EchoTrail.tsx'
import { EraNavigation } from './EraNavigation.tsx'
import { EraTransition } from './EraTransition.tsx'
import { EventDock } from './EventDock.tsx'
import { HelpSheet } from './HelpSheet.tsx'
import { BornSheet } from './BornSheet.tsx'
import { JumpSheet } from './JumpSheet.tsx'
import { MobileMenu } from './MobileMenu.tsx'
import { Timeline } from './Timeline.tsx'
import { YearContext } from './YearContext.tsx'
import { YearDisplay } from './YearDisplay.tsx'
import { YearStats } from './YearStats.tsx'
import {
  getLive,
  nudgeTarget,
  patchEngine,
  setTarget,
  startEngine,
  stopEngine,
  togglePlay,
} from '../../engine/timeEngine.ts'
import { useMousePosition } from '../../hooks/useMousePosition.ts'
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMedia.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { MAX_YEAR, MIN_YEAR, PRESENT_YEAR, tToYear, yearToT } from '../../utils/timeline.ts'

const Scene = lazy(() => import('../Three/Scene.tsx'))

export function TimeMachine() {
  const { introComplete, reducedMotion } = useTimeline()
  const mobile = useIsMobile()
  const prefersReduced = usePrefersReducedMotion()
  const mouse = useMousePosition()
  const [jumpOpen, setJumpOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bornOpen, setBornOpen] = useState(false)

  useEffect(() => {
    startEngine()
    return () => stopEngine()
  }, [])

  useEffect(() => {
    const par = { x: 0, y: 0 }
    let raf = 0
    const loop = () => {
      const el = document.querySelector('.year-wrap')
      if (el instanceof HTMLElement && !getLive().reducedMotion && window.innerWidth > 860) {
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
    const busy = () => {
      const state = getLive()
      return (
        !state.introComplete ||
        state.capsuleOpen ||
        state.whatIfOpen ||
        jumpOpen ||
        helpOpen ||
        bornOpen
      )
    }

    const onWheel = (event: WheelEvent) => {
      if (busy()) return
      if ((event.target as HTMLElement | null)?.closest('.overlay, .era-stack, .jump-form, .mobile-menu, .controls')) return
      event.preventDefault()
      patchEngine({ playing: false })
      const speed = event.shiftKey ? 0.00032 : 0.0001
      const state = getLive()
      setTarget(tToYear(yearToT(state.target) + event.deltaY * speed))
    }

    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement | null)?.closest('input, textarea')) return
      if (busy() && event.key !== 'Escape') return
      if (event.key === 'Escape') {
        setJumpOpen(false)
        setHelpOpen(false)
        setMenuOpen(false)
        setBornOpen(false)
        patchEngine({ capsuleOpen: false, whatIfOpen: false })
        return
      }
      const state = getLive()
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        nudgeTarget(event.shiftKey ? -14 : -2)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        nudgeTarget(event.shiftKey ? 14 : 2)
      }
      if (event.key === 'Home') setTarget(MIN_YEAR)
      if (event.key === 'End') setTarget(MAX_YEAR)
      if (event.key === 'Enter' && !event.metaKey) setTarget(PRESENT_YEAR)
      if (event.key === ' ') {
        event.preventDefault()
        togglePlay()
      }
      if (event.key === 'j' || event.key === 'J') setJumpOpen(true)
      if (event.key === 'b' || event.key === 'B') setBornOpen(true)
      if (event.key === '[' || event.key === ',') {
        event.preventDefault()
        setTarget(adjacentEvent(state.year, -1).year)
      }
      if (event.key === ']' || event.key === '.') {
        event.preventDefault()
        setTarget(adjacentEvent(state.year, 1).year)
      }
      if (event.key === '?' || event.key === 'h' || event.key === 'H') setHelpOpen(true)
      if (event.key === 'r' || event.key === 'R') {
        patchEngine({ playing: false })
        setTarget(EVENTS[Math.floor(Math.random() * EVENTS.length)].year)
      }
      if (event.key === 'p' || event.key === 'P') {
        patchEngine({ pinnedYear: state.pinnedYear === null ? Math.round(state.year) : null })
      }
    }

    let lastX = 0
    const onTouchStart = (event: TouchEvent) => {
      lastX = event.touches[0]?.clientX ?? 0
    }
    const onTouchMove = (event: TouchEvent) => {
      if (busy()) return
      const target = event.target as HTMLElement | null
      if (target?.closest('.era-stack, .overlay, .nav, .controls, .event-dock, .mobile-menu')) return
      const x = event.touches[0]?.clientX ?? lastX
      const dx = x - lastX
      lastX = x
      patchEngine({ playing: false })
      setTarget(tToYear(yearToT(getLive().target) - dx * 0.0007))
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
  }, [jumpOpen, helpOpen, bornOpen])

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
        <EraNavigation menuOpen={menuOpen} onMenu={() => setMenuOpen((open) => !open)} />
        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onJump={() => setJumpOpen(true)}
          onBorn={() => setBornOpen(true)}
          onHelp={() => setHelpOpen(true)}
        />
        <div className="stage-copy">
          <div className="year-column">
            <YearDisplay />
            <YearContext />
            <YearStats />
            <CompareBar />
            <EchoTrail />
          </div>
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
            <EventDock />
          </div>
        </div>
        <div className="stage-foot">
          <Controls
            onJump={() => setJumpOpen(true)}
            onHelp={() => setHelpOpen(true)}
            onBorn={() => setBornOpen(true)}
          />
          <Timeline />
        </div>
      </div>
      <TimeCapsule />
      <WhatIf />
      <JumpSheet open={jumpOpen} onClose={() => setJumpOpen(false)} />
      <BornSheet open={bornOpen} onClose={() => setBornOpen(false)} />
      <HelpSheet open={helpOpen} onClose={() => setHelpOpen(false)} />
      <AnimatePresence>{introComplete ? null : <Intro key="intro" />}</AnimatePresence>
      <CustomCursor />
    </div>
  )
}
