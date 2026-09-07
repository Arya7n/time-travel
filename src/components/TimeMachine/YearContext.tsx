import { witnessAt } from '../../data/witness.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { fromNowLabel, lifeLabel } from '../../utils/life.ts'

export function YearContext() {
  const { year, birthYear } = useTimeline()
  const beat = witnessAt(year)

  return (
    <div className="year-context">
      <p className="witness">{beat.line}</p>
      <p className="from-now">
        {fromNowLabel(year)}
        {birthYear !== null ? ` · ${lifeLabel(birthYear, year)}` : null}
      </p>
    </div>
  )
}
