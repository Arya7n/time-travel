import { useEffect, useState } from 'react'
import { patchEngine, setTarget } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { PRESENT_YEAR } from '../../utils/timeline.ts'
import { MagneticButton } from '../UI/MagneticButton.tsx'
import { SoundToggle } from '../UI/SoundToggle.tsx'

type Props = {
  menuOpen: boolean
  onMenu: () => void
}

export function EraNavigation({ menuOpen, onMenu }: Props) {
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
        Time Machine
      </MagneticButton>
      <div className="nav-links">
        <MagneticButton cursor="VIEW" onClick={() => setTarget(-440)}>
          Eras
        </MagneticButton>
        <MagneticButton cursor="ENTER" onClick={() => patchEngine({ capsuleOpen: true })}>
          Capsule
        </MagneticButton>
        <MagneticButton
          cursor="EXPLORE"
          onClick={() => {
            setTarget(2080)
            patchEngine({ whatIfOpen: true })
          }}
        >
          Future
        </MagneticButton>
      </div>
      <div className="nav-actions">
        <MagneticButton className="text-link menu-toggle" cursor="MENU" onClick={onMenu}>
          {menuOpen ? 'Close' : 'Menu'}
        </MagneticButton>
        <MagneticButton
          className="text-link hide-narrow"
          cursor="MOTION"
          onClick={() => patchEngine({ reducedMotion: !reducedMotion })}
        >
          {reducedMotion ? 'Live' : 'Still'}
        </MagneticButton>
        <SoundToggle />
        <MagneticButton
          className="text-link hide-narrow"
          cursor="FULL"
          onClick={() => {
            if (document.fullscreenElement) void document.exitFullscreen()
            else void document.documentElement.requestFullscreen()
          }}
        >
          {full ? 'Exit' : 'Full'}
        </MagneticButton>
      </div>
    </nav>
  )
}
