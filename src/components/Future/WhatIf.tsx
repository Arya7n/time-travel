import { AnimatePresence, motion } from 'framer-motion'
import { SCENARIOS } from '../../data/scenarios.ts'
import { patchEngine, setTarget } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'

export function WhatIf() {
  const { whatIfOpen, scenario } = useTimeline()

  return (
    <AnimatePresence>
      {whatIfOpen ? (
        <motion.div
          className="overlay"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="close-x" type="button" onClick={() => patchEngine({ whatIfOpen: false })}>
            Close
          </button>
          <p className="overlay-kicker">What if?</p>
          <h2 className="era-title">Choose a future</h2>
          <p className="era-desc">
            Speculative visual worlds — not predictions. Each choice re-skins the years ahead.
          </p>
          <div className="choice-list">
            {SCENARIOS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="choice"
                onClick={() => {
                  patchEngine({ scenario: item.id, whatIfOpen: false })
                  setTarget(item.id === 'space' ? 2075 : 2100)
                }}
              >
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <b>{item.title}</b>
                  <small>{item.kicker}</small>
                  <p>{item.description}</p>
                </span>
              </button>
            ))}
          </div>
          {scenario !== 'none' ? (
            <div style={{ marginTop: '2rem' }}>
              <MagneticButton
                className="text-link"
                cursor="RESET"
                onClick={() => patchEngine({ scenario: 'none' })}
              >
                Clear scenario
              </MagneticButton>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
