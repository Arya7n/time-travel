import type { ReactNode } from 'react'
import { useState } from 'react'
import { eraById } from '../../data/eras.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import type { EraId } from '../../types/era.ts'

type Props = {
  id: EraId
  children?: ReactNode
}

export function EraLayer({ id, children }: Props) {
  const { eraId } = useTimeline()
  if (eraId !== id) return null

  return (
    <div className="era-layer" data-active="true">
      {children}
    </div>
  )
}

export function EraCopy({ id, extra }: { id: EraId; extra?: ReactNode }) {
  const era = eraById(id)
  const [open, setOpen] = useState(false)
  const visible = open ? era.sections : era.sections.slice(0, 3)

  return (
    <>
      <p className="era-kicker">{era.kicker}</p>
      <p className="era-desc">{era.description}</p>
      {era.quote ? (
        <p className="quote">
          “{era.quote}”
          {era.quoteBy ? <cite> — {era.quoteBy}</cite> : null}
        </p>
      ) : null}
      {extra}
      <div className="era-facts">
        {era.facts.map((fact) => (
          <div className="fact" key={fact.label}>
            <label>{fact.label}</label>
            <b>{fact.value}</b>
          </div>
        ))}
      </div>
      <div className="era-sections">
        {visible.map((section, index) => (
          <article className="era-entry" key={section.title}>
            <span className="idx">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </div>
          </article>
        ))}
      </div>
      {era.sections.length > 3 ? (
        <button type="button" className="text-link more-link" onClick={() => setOpen((value) => !value)}>
          {open ? 'Show less' : 'Read more'}
        </button>
      ) : null}
    </>
  )
}
