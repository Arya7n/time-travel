import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { capsuleForYear } from '../../data/capsules.ts'
import { patchEngine, setTarget } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { formatYear } from '../../utils/timeline.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'

export function TimeCapsule() {
  const { capsuleOpen, year } = useTimeline()
  const capsule = capsuleForYear(year)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    setStage(0)
  }, [capsule.year, capsuleOpen])

  useEffect(() => {
    if (!capsuleOpen) return
    const id = window.setInterval(() => {
      setStage((current) => (current + 1) % capsule.stages.length)
    }, 4200)
    const trigger = ScrollTrigger.create({
      scroller: '.overlay',
      trigger: '.capsule-stage',
      start: 'top 80%',
    })
    gsap.fromTo(
      '.overlay-kicker',
      { opacity: 0.25 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
    )
    return () => {
      window.clearInterval(id)
      trigger.kill()
    }
  }, [capsuleOpen, capsule.stages.length])

  return (
    <AnimatePresence>
      {capsuleOpen ? (
        <motion.div
          className="overlay"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="close-x" type="button" onClick={() => patchEngine({ capsuleOpen: false })}>
            Close
          </button>
          <p className="overlay-kicker">Time capsule</p>
          <h2 className="era-title">
            If you woke in {formatYear(capsule.year)}
          </h2>
          <p className="era-desc">
            {capsule.eraName}. {capsule.headline}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={capsule.stages[stage].id}
              className="capsule-stage"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="era-kicker">{capsule.stages[stage].title}</p>
              <p className="era-desc">{capsule.stages[stage].body}</p>
            </motion.div>
          </AnimatePresence>
          <div className="capsule-nav">
            {capsule.stages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === stage ? 'dot is-on' : 'dot'}
                aria-label={item.title}
                onClick={() => setStage(index)}
              />
            ))}
          </div>
          <div style={{ marginTop: '2.4rem' }}>
            <MagneticButton
              className="text-link"
              cursor="TRAVEL"
              onClick={() => {
                setTarget(capsule.year)
                patchEngine({ capsuleOpen: false })
              }}
            >
              Enter {formatYear(capsule.year)}
            </MagneticButton>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
