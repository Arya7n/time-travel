import { useTimeline } from '../../hooks/useTimeline.ts'
import { EraCopy, EraLayer } from './EraLayer.tsx'
import { YouAreHere } from './YouAreHere.tsx'

export function PresentEra() {
  const { seenFuture } = useTimeline()

  return (
    <EraLayer id="present">
      {seenFuture ? (
        <YouAreHere />
      ) : (
        <EraCopy
          id="present"
          extra={
            <p className="era-kicker" style={{ marginTop: '0.4rem' }}>
              WHERE ARE WE GOING?
            </p>
          }
        />
      )}
    </EraLayer>
  )
}
