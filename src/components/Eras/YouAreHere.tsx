import { patchEngine, setTarget } from '../../engine/timeEngine.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'

export function YouAreHere() {
  return (
    <div className="final-block">
      <p className="era-kicker">THE PRESENT</p>
      <h2 className="era-title">YOU ARE HERE.</h2>
      <p className="era-desc">The past is fixed. The future isn’t.</p>
      <p className="quote">An interactive experiment in time.</p>
      <div style={{ marginTop: '1.4rem', display: 'flex', gap: '1.2rem' }}>
        <MagneticButton cursor="AGAIN" onClick={() => setTarget(-500)}>
          EXPLORE AGAIN
        </MagneticButton>
        <MagneticButton cursor="ENTER" onClick={() => patchEngine({ capsuleOpen: true })}>
          TIME CAPSULE
        </MagneticButton>
      </div>
    </div>
  )
}
