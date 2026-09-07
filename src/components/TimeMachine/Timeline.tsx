import { useEffect, useRef } from 'react'
import { ERAS } from '../../data/eras.ts'
import { setCursorLabel, setTarget, visual } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { clamp } from '../../utils/colors.ts'
import { formatYear, tToYear, yearToT } from '../../utils/timeline.ts'

const MARKS = [-3000, -500, 500, 1500, 1880, 1925, 1969, 1987, 2026, 2100, 2200]
const LABELS = [-3000, 1500, 1925, 2026, 2200]
const MAJOR = new Set([-3000, 1500, 1925, 2026, 2200])

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const { eraId } = useTimeline()
  const dragging = useRef(false)

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const t = yearToT(visual.year)
      if (knobRef.current) knobRef.current.style.left = `${t * 100}%`
      if (progressRef.current) progressRef.current.style.width = `${t * 100}%`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const yearFromX = (clientX: number) => {
      const box = track.getBoundingClientRect()
      return tToYear(clamp((clientX - box.left) / box.width))
    }

    const onPointerDown = (event: PointerEvent) => {
      dragging.current = true
      track.setPointerCapture(event.pointerId)
      setTarget(yearFromX(event.clientX), true)
      setCursorLabel('DRAG')
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current) return
      setTarget(yearFromX(event.clientX), true)
    }
    const onPointerUp = () => {
      dragging.current = false
      setCursorLabel('')
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', onPointerUp)
    track.addEventListener('pointercancel', onPointerUp)
    return () => {
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', onPointerUp)
      track.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  return (
    <div className="timeline">
      <div className="timeline-hint">
        <span>3000 BC — 2200</span>
        <span className="mobile-hint">Swipe through time</span>
      </div>
      <div className="era-labels">
        {ERAS.map((era) => (
          <button
            key={era.id}
            className={eraId === era.id ? 'active' : ''}
            onClick={() => setTarget((era.startYear + era.endYear) / 2)}
            onPointerEnter={() => setCursorLabel('TRAVEL')}
            onPointerLeave={() => setCursorLabel('')}
          >
            {era.id === 'artdeco' ? '1920s' : era.name.split(' ')[0]}
          </button>
        ))}
      </div>
      <div ref={trackRef} className="track" role="slider" aria-label="Timeline year" tabIndex={0}>
        <div className="track-line" />
        <div ref={progressRef} className="track-progress" />
        <div className="track-marks">
          {MARKS.map((year) => (
            <button
              key={year}
              className={MAJOR.has(year) ? 'mark major' : 'mark'}
              style={{ left: `${yearToT(year) * 100}%` }}
              aria-label={`Go to ${year}`}
              onClick={() => setTarget(year)}
            />
          ))}
          {LABELS.map((year) => (
            <span key={`l-${year}`} className="tick-label" style={{ left: `${yearToT(year) * 100}%` }}>
              {formatYear(year)}
            </span>
          ))}
        </div>
        <div ref={knobRef} className="knob" />
      </div>
    </div>
  )
}
