import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { patchEngine } from '../../engine/timeEngine.ts'
import { parseYearInput } from '../../utils/yearInput.ts'
import { formatYear } from '../../utils/timeline.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'

type Props = {
  open: boolean
  onClose: () => void
}

export function BornSheet({ open, onClose }: Props) {
  const { birthYear } = useTimeline()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setValue(birthYear === null ? '' : formatYear(birthYear))
      setError('')
      window.setTimeout(() => input.current?.focus(), 80)
    }
  }, [open, birthYear])

  const save = () => {
    const year = parseYearInput(value)
    if (year === null) {
      setError('Try 1994, 440 BC, or 2001')
      return
    }
    patchEngine({ birthYear: year })
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
          <p className="overlay-kicker">A life on the track</p>
          <h2 className="era-title">When were you born?</h2>
          <p className="era-desc">
            Drop a lifetime onto the timeline. History stops being an abstract ribbon and becomes the
            width of one person.
          </p>
          <form
            className="jump-form"
            onSubmit={(event) => {
              event.preventDefault()
              save()
            }}
          >
            <input
              ref={input}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="1994"
              aria-label="Birth year"
              inputMode="text"
              autoComplete="off"
            />
            <button type="submit" className="text-link">
              Place
            </button>
          </form>
          {birthYear !== null ? (
            <button
              type="button"
              className="text-link more-link"
              onClick={() => {
                patchEngine({ birthYear: null })
                onClose()
              }}
            >
              Clear
            </button>
          ) : null}
          {error ? <p className="form-error">{error}</p> : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
