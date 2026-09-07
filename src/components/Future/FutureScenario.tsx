import { SCENARIOS } from '../../data/scenarios.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'

export function FutureScenario() {
  const { scenario, year } = useTimeline()
  if (scenario === 'none' || year < 2028) return null
  const active = SCENARIOS.find((item) => item.id === scenario)
  if (!active) return null

  return (
    <div className="planet-legend" style={{ left: '6vw', right: 'auto', top: '22%' }}>
      <div className="era-card">
        <h3>{active.title}</h3>
        <p>{active.bullets[0]}</p>
      </div>
    </div>
  )
}
