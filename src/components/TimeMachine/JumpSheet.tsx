import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { patchEngine, setTarget } from '../../engine/timeEngine.ts'
import { parseYearInput } from '../../utils/yearInput.ts'

type Props = {
  open: boolean
  onClose: () => void
}

export function JumpSheet({ open, onClose }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setValue('')
      setError('')
      window.setTimeout(() => input.current?.focus(), 80)
    }
  }, [open])

  const go = () => {
    const year = parseYearInput(value)
    if (year === null) {
      setError('Try 1925, 440 BC, or 2075')
      return
    }
    patchEngine({ playing: false })
    setTarget(year)
    onClose()
  }

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
          <p className="overlay-kicker">Jump</p>
          <h2 className="era-title">Arrive in a year</h2>
          <p className="era-desc">Type a year. Use BC for antiquity — 3000 BC, 44 BC, 1969.</p>
          <form
            className="jump-form"
            onSubmit={(event) => {
              event.preventDefault()
              go()
            }}
          >
            <input
              ref={input}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="1969"
              aria-label="Year"
              inputMode="text"
              autoComplete="off"
            />
            <button type="submit" className="text-link">
              Travel
            </button>
          </form>
          {error ? <p className="form-error">{error}</p> : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
