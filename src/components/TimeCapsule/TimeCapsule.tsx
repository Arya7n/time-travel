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
    }, 3800)
    const trigger = ScrollTrigger.create({
      scroller: '.overlay',
      trigger: '.capsule-stage',
      start: 'top 80%',
    })
    gsap.fromTo(
      '.overlay-kicker',
      { opacity: 0.4, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="close-x" type="button" onClick={() => patchEngine({ capsuleOpen: false })}>
            CLOSE
          </button>
          <p className="overlay-kicker">TIME CAPSULE</p>
          <h2 className="era-title">
            What would life feel like if you woke up in {formatYear(capsule.year)}
          </h2>
          <p className="era-desc">
            {capsule.eraName}. {capsule.headline}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={capsule.stages[stage].id}
              className="capsule-stage"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.55 }}
            >
              <p className="era-kicker">{capsule.stages[stage].title}</p>
              <p className="era-desc">{capsule.stages[stage].body}</p>
            </motion.div>
          </AnimatePresence>
          <div className="capsule-nav">
            {capsule.stages.map((item, index) => (
              <MagneticButton
                key={item.id}
                className="icon-btn"
                cursor="VIEW"
                onClick={() => setStage(index)}
              >
                {index + 1}
              </MagneticButton>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <MagneticButton
              cursor="TRAVEL"
              onClick={() => {
                setTarget(capsule.year)
                patchEngine({ capsuleOpen: false })
              }}
            >
              ENTER {formatYear(capsule.year)}
            </MagneticButton>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
