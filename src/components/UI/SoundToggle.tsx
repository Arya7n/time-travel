import { Volume2, VolumeX } from 'lucide-react'
import { setMuted, unlockAudio } from '../../engine/audio.ts'
import { patchEngine } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { MagneticButton } from './MagneticButton.tsx'

export function SoundToggle() {
  const { muted } = useTimeline()

  return (
    <MagneticButton
      className="icon-btn"
      cursor={muted ? 'SOUND' : 'MUTE'}
      onClick={async () => {
        await unlockAudio()
        const next = !muted
        patchEngine({ muted: next })
        setMuted(next)
      }}
    >
      {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
    </MagneticButton>
  )
}
