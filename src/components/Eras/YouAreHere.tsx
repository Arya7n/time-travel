import { patchEngine, setTarget } from '../../engine/timeEngine.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'

export function YouAreHere() {
  return (
    <div className="final-block">
      <p className="era-kicker">Returned</p>
      <p className="era-desc">The past is fixed. The future isn’t.</p>
      <p className="quote">You are here.</p>
      <div style={{ marginTop: '1.8rem', display: 'flex', gap: '1.6rem' }}>
        <MagneticButton className="text-link" cursor="AGAIN" onClick={() => setTarget(-500)}>
          Explore again
        </MagneticButton>
        <MagneticButton className="text-link" cursor="ENTER" onClick={() => patchEngine({ capsuleOpen: true })}>
          Time capsule
        </MagneticButton>
      </div>
    </div>
  )
}
