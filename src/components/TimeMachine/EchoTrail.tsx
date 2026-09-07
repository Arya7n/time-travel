import { useEffect, useRef, useState } from 'react'
import { setCursorLabel, setTarget, getLive } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { formatYear } from '../../utils/timeline.ts'

export function EchoTrail() {
  const { year, playing } = useTimeline()
  const [echoes, setEchoes] = useState<number[]>(() => [Math.round(getLive().year)])
  const last = useRef(year)

  useEffect(() => {
    if (playing) return
    const rounded = Math.round(year)
    if (rounded === last.current) return
    const id = window.setTimeout(() => {
      last.current = rounded
      setEchoes((list) => {
        const next = [rounded, ...list.filter((item) => item !== rounded)]
        return next.slice(0, 5)
      })
    }, 900)
    return () => window.clearTimeout(id)
  }, [year, playing])

  if (echoes.length < 2) return null

  return (
    <div className="echo-trail">
      <span>Echoes</span>
      {echoes.map((echo) => (
        <button
          key={echo}
          type="button"
          className="text-link"
          onClick={() => setTarget(echo)}
          onPointerEnter={() => setCursorLabel('RETURN')}
          onPointerLeave={() => setCursorLabel('')}
        >
          {formatYear(echo)}
        </button>
      ))}
    </div>
  )
}
