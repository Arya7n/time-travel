import { useState } from 'react'
import { EVENTS } from '../../data/events.ts'
import {
  patchEngine,
  setTarget,
  togglePlay,
} from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { tToYear } from '../../utils/timeline.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'

type Props = {
  onJump: () => void
  onHelp: () => void
  onBorn: () => void
}

export function Controls({ onJump, onHelp, onBorn }: Props) {
  const { playing, travelSpeed, pinnedYear, year, birthYear } = useTimeline()
  const [copied, setCopied] = useState(false)

  return (
    <div className="controls">
      <MagneticButton className="text-link" cursor="PLAY" onClick={() => togglePlay()}>
        {playing ? 'Pause' : 'Play'}
      </MagneticButton>
      <div className="speed-set">
        {(['slow', 'cruise', 'fast'] as const).map((speed) => (
          <button
            key={speed}
            type="button"
            className={travelSpeed === speed ? 'chip is-on' : 'chip'}
            onClick={() => patchEngine({ travelSpeed: speed })}
          >
            {speed}
          </button>
        ))}
      </div>
      <MagneticButton className="text-link" cursor="JUMP" onClick={onJump}>
        Jump
      </MagneticButton>
      <MagneticButton
        className="text-link"
        cursor="DICE"
        onClick={() => {
          patchEngine({ playing: false })
          setTarget(EVENTS[Math.floor(Math.random() * EVENTS.length)].year)
        }}
      >
        Random
      </MagneticButton>
      <MagneticButton
        className="text-link"
        cursor="PIN"
        onClick={() =>
          patchEngine({ pinnedYear: pinnedYear === null ? year : null })
        }
      >
        {pinnedYear === null ? 'Pin' : 'Unpin'}
      </MagneticButton>
      {pinnedYear !== null ? (
        <MagneticButton
          className="text-link"
          cursor="RETURN"
          onClick={() => setTarget(pinnedYear)}
        >
          Return
        </MagneticButton>
      ) : null}
      <MagneticButton className="text-link" cursor="LIFE" onClick={onBorn}>
        {birthYear === null ? 'Born' : 'Life'}
      </MagneticButton>
      <MagneticButton
        className="text-link"
        cursor="WANDER"
        onClick={() => {
          patchEngine({ playing: false })
          setTarget(tToYear(Math.random()))
        }}
      >
        Drift
      </MagneticButton>
      <MagneticButton
        className="text-link"
        cursor="SHARE"
        onClick={() => {
          void navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }).catch(() => {
            setCopied(false)
          })
        }}
      >
        {copied ? 'Copied' : 'Share'}
      </MagneticButton>
      <MagneticButton className="text-link" cursor="KEYS" onClick={onHelp}>
        Keys
      </MagneticButton>
    </div>
  )
}
