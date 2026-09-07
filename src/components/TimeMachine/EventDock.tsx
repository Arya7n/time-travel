import { adjacentEvent, nearestEvent, nextEventAfter } from '../../data/events.ts'
import { setCursorLabel, setTarget } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { formatYear } from '../../utils/timeline.ts'

export function EventDock() {
  const { year } = useTimeline()
  const event = nearestEvent(year)
  const upcoming = nextEventAfter(year)
  const distance = Math.round(year - event.year)
  const when =
    distance === 0
      ? 'This year'
      : distance > 0
        ? `${distance} years later`
        : `${Math.abs(distance)} years earlier`

  return (
    <div className="event-dock">
      <div className="event-dock-head">
        <p className="era-kicker">Near this year</p>
        <div className="event-dock-nav">
          <button
            type="button"
            className="text-link"
            onClick={() => setTarget(adjacentEvent(year, -1).year)}
            onPointerEnter={() => setCursorLabel('PREV')}
            onPointerLeave={() => setCursorLabel('')}
          >
            Prev
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => setTarget(adjacentEvent(year, 1).year)}
            onPointerEnter={() => setCursorLabel('NEXT')}
            onPointerLeave={() => setCursorLabel('')}
          >
            Next
          </button>
        </div>
      </div>
      <button
        type="button"
        className="event-card"
        onClick={() => setTarget(event.year)}
        onPointerEnter={() => setCursorLabel('ARRIVE')}
        onPointerLeave={() => setCursorLabel('')}
      >
        <span className="event-year">{formatYear(event.year)}</span>
        <b>{event.title}</b>
        <p>{event.body}</p>
        <small>{when}</small>
      </button>
      {upcoming && upcoming.year !== event.year ? (
        <button
          type="button"
          className="event-next"
          onClick={() => setTarget(upcoming.year)}
          onPointerEnter={() => setCursorLabel('AHEAD')}
          onPointerLeave={() => setCursorLabel('')}
        >
          Next up · {formatYear(upcoming.year)} · {upcoming.title}
          <span>
            {Math.max(1, Math.round(upcoming.year - year))} years ahead
          </span>
        </button>
      ) : null}
    </div>
  )
}
