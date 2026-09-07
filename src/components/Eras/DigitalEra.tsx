import { crtAmount, earlyWebAmount } from '../../utils/interpolation.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import { EraCopy, EraLayer } from './EraLayer.tsx'

export function DigitalEra() {
  const { year } = useTimeline()
  const crt = crtAmount(year)
  const web = earlyWebAmount(year)

  return (
    <EraLayer id="digital">
      {crt > 0.35 ? (
        <pre className="terminal">{`C:\\TIME_MACHINE>

YEAR: ${Math.round(year)}
ERA: DIGITAL_DAWN
SYSTEM STATUS: ONLINE
MEMORY: ${Math.round(64 + crt * 192)}K OK

READY.`}</pre>
      ) : web > 0.35 ? (
        <div className="early-web">
          <p>WELCOME TO THE INTERNET</p>
          <p>You are visitor #00{Math.round(year)}</p>
          <p>
            <button type="button">ABOUT</button>
            <button type="button">LINKS</button>
            <button type="button">GUESTBOOK</button>
          </p>
        </div>
      ) : (
        <EraCopy id="digital" />
      )}
    </EraLayer>
  )
}
