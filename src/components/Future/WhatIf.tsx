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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="close-x" type="button" onClick={() => patchEngine({ whatIfOpen: false })}>
            CLOSE
          </button>
          <p className="overlay-kicker">WHAT IF?</p>
          <h2 className="era-title">CHOOSE A FUTURE</h2>
          <p className="era-desc">
            Speculative visual worlds — not predictions. Each choice re-skins the years ahead.
          </p>
          <div className="scenario-grid">
            {SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="scenario-btn"
                onClick={() => {
                  patchEngine({ scenario: item.id, whatIfOpen: false })
                  setTarget(item.id === 'space' ? 2075 : 2100)
                }}
              >
                <small>{item.kicker}</small>
                <h3 className="era-title" style={{ fontSize: '1.2rem', margin: 0 }}>
                  {item.title}
                </h3>
                <p>{item.description}</p>
              </button>
            ))}
          </div>
          {scenario !== 'none' ? (
            <div style={{ marginTop: '1.5rem' }}>
              <MagneticButton
                cursor="RESET"
                onClick={() => patchEngine({ scenario: 'none' })}
              >
                CLEAR SCENARIO
              </MagneticButton>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
