import { useTimeline } from '../../hooks/useTimeline.ts'
import { formatYear } from '../../utils/timeline.ts'
import { setTarget } from '../../engine/timeEngine.ts'

export function CompareBar() {
  const { pinnedYear, year } = useTimeline()
  if (pinnedYear === null) return null
  const delta = Math.round(year - pinnedYear)
  const label =
    delta === 0
      ? 'same moment'
      : delta > 0
        ? `${delta} years after the pin`
        : `${Math.abs(delta)} years before the pin`

  return (
    <button type="button" className="compare-bar" onClick={() => setTarget(pinnedYear)}>
      Pinned {formatYear(pinnedYear)} · {label}
    </button>
  )
}
