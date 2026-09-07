import { useEffect, useRef, useState } from 'react'
import { eraById } from '../../data/eras.ts'
import { visual } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { formatYear } from '../../utils/timeline.ts'

function DigitColumn({ value }: { value: number }) {
  return (
    <div className="digit">
      <span style={{ transform: `translateY(-${value * 10}%)` }}>
        {Array.from({ length: 10 }, (_, digit) => (
          <b key={digit}>{digit}</b>
        ))}
      </span>
    </div>
  )
}

export function YearDisplay() {
  const { eraId } = useTimeline()
  const era = eraById(eraId)
  const [text, setText] = useState(() => formatYear(visual.year))
  const last = useRef(text)

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const next = formatYear(visual.year)
      if (next !== last.current) {
        last.current = next
        setText(next)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const bc = text.endsWith('BC')
  const numerals = text.replace(' BC', '')

  return (
    <div className="year-wrap">
      <div className="year-odometer" aria-live="polite">
        <div className="digits">
          {numerals.split('').map((char, index) => (
            <DigitColumn key={`${numerals.length}-${index}`} value={Number(char)} />
          ))}
        </div>
        {bc ? <span className="year-suffix">BC</span> : null}
      </div>
      <p className="year-era">{era.name}</p>
    </div>
  )
}
