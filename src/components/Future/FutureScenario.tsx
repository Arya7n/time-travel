import { SCENARIOS } from '../../data/scenarios.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'

export function FutureScenario() {
  const { scenario, year } = useTimeline()
  if (scenario === 'none' || year < 2028) return null
  const active = SCENARIOS.find((item) => item.id === scenario)
  if (!active) return null

  return (
    <p className="meta-note">
      {active.title} — {active.bullets[0]}
    </p>
  )
}
