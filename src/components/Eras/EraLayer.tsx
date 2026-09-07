import type { ReactNode } from 'react'
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
  return (
    <>
      <p className="era-kicker">{era.kicker}</p>
      <h2 className="era-title">{era.name}</h2>
      <p className="era-desc">{era.description}</p>
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
        {era.sections.map((section) => (
          <article className="era-card" key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
      {era.quote ? <p className="quote">“{era.quote}”</p> : null}
    </>
  )
}
