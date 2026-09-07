import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  open: boolean
  onClose: () => void
}

const ROWS = [
  ['← →', 'Nudge through years'],
  ['Shift + arrows', 'Larger jumps'],
  ['Space', 'Play / pause'],
  ['J', 'Jump to a year'],
  ['B', 'Place your birth year'],
  ['[ ]', 'Previous / next event'],
  ['R', 'Random event'],
  ['P', 'Pin this year'],
  ['Home / End', 'Antiquity / 2200'],
  ['Enter', 'Return to 2026'],
]

export function HelpSheet({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="close-x" type="button" onClick={onClose}>
            Close
          </button>
          <p className="overlay-kicker">Keys</p>
          <h2 className="era-title">How to travel</h2>
          <p className="era-desc">
            Drag the timeline, scroll, or swipe. Years ease along the track — Slow, Cruise, or Fast.
            Place a birth year to see one lifetime as a band.
          </p>
          <div className="choice-list">
            {ROWS.map(([key, label]) => (
              <div className="choice" key={key}>
                <span className="idx">{key}</span>
                <span>
                  <b>{label}</b>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
