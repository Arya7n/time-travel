import { statsAt } from '../../data/stats.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'

export function YearStats() {
  const { year } = useTimeline()
  const stats = statsAt(year)
  const speculative = year > 2026

  return (
    <div className="year-stats">
      <div className="fact">
        <label>People</label>
        <b>{stats.people}</b>
      </div>
      <div className="fact">
        <label>Travel</label>
        <b>{stats.pace}</b>
      </div>
      <div className="fact">
        <label>Message</label>
        <b>{stats.signal}</b>
      </div>
      <div className="fact">
        <label>Light</label>
        <b>{stats.light}</b>
      </div>
      {speculative ? <p className="stat-note">* Speculative</p> : null}
    </div>
  )
}
