import { ERAS } from '../../data/eras.ts'
import { patchEngine, setTarget, togglePlay } from '../../engine/timeEngine.ts'
import { PRESENT_YEAR } from '../../utils/timeline.ts'

type Props = {
  open: boolean
  onClose: () => void
  onJump: () => void
  onBorn: () => void
  onHelp: () => void
}

export function MobileMenu({ open, onClose, onJump, onBorn, onHelp }: Props) {
  if (!open) return null

  return (
    <div className="mobile-menu">
      {ERAS.map((era) => (
        <button
          key={era.id}
          type="button"
          onClick={() => {
            setTarget((era.startYear + era.endYear) / 2)
            onClose()
          }}
        >
          {era.name}
        </button>
      ))}
      <button
        type="button"
        onClick={() => {
          setTarget(PRESENT_YEAR)
          onClose()
        }}
      >
        Now
      </button>
      <button
        type="button"
        onClick={() => {
          togglePlay()
          onClose()
        }}
      >
        Play / pause
      </button>
      <button
        type="button"
        onClick={() => {
          patchEngine({ capsuleOpen: true })
          onClose()
        }}
      >
        Capsule
      </button>
      <button
        type="button"
        onClick={() => {
          setTarget(2080)
          patchEngine({ whatIfOpen: true })
          onClose()
        }}
      >
        What if?
      </button>
      <button
        type="button"
        onClick={() => {
          onJump()
          onClose()
        }}
      >
        Jump to year
      </button>
      <button
        type="button"
        onClick={() => {
          onBorn()
          onClose()
        }}
      >
        Place a life
      </button>
      <button
        type="button"
        onClick={() => {
          onHelp()
          onClose()
        }}
      >
        Keys
      </button>
    </div>
  )
}
