import { Maximize, Minimize, Orbit } from 'lucide-react'
import { useEffect, useState } from 'react'
import { patchEngine, setTarget } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { PRESENT_YEAR } from '../../utils/timeline.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'
import { SoundToggle } from '../UI/SoundToggle.tsx'

export function EraNavigation() {
  const { reducedMotion } = useTimeline()
  const [full, setFull] = useState(false)

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  return (
    <nav className="nav">
      <MagneticButton className="brand" cursor="NOW" onClick={() => setTarget(PRESENT_YEAR)}>
        TIME MACHINE
      </MagneticButton>
      <div className="nav-links">
        <MagneticButton cursor="VIEW" onClick={() => setTarget(-440)}>
          ERAS
        </MagneticButton>
        <MagneticButton cursor="ENTER" onClick={() => patchEngine({ capsuleOpen: true })}>
          CAPSULE
        </MagneticButton>
        <MagneticButton
          cursor="EXPLORE"
          onClick={() => {
            setTarget(2080)
            patchEngine({ whatIfOpen: true })
          }}
        >
          FUTURE
        </MagneticButton>
      </div>
      <div className="nav-actions">
        <MagneticButton
          className="icon-btn"
          cursor="MOTION"
          onClick={() => patchEngine({ reducedMotion: !reducedMotion })}
        >
          <Orbit size={14} />
        </MagneticButton>
        <SoundToggle />
        <MagneticButton
          className="icon-btn"
          cursor="FULL"
          onClick={() => {
            if (document.fullscreenElement) void document.exitFullscreen()
            else void document.documentElement.requestFullscreen()
          }}
        >
          {full ? <Minimize size={14} /> : <Maximize size={14} />}
        </MagneticButton>
      </div>
    </nav>
  )
}
