import { useEffect } from 'react'
import { useTimeline } from '../../hooks/useTimeline.ts'

export function EraTransition() {
  const { eraId } = useTimeline()
  useEffect(() => {
    document.documentElement.dataset.flash = eraId
  }, [eraId])
  return <div className="era-flash" key={eraId} />
}
