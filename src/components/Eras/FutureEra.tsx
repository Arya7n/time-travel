import { patchEngine } from '../../engine/timeEngine.ts'
import { useTimeline } from '../../hooks/useTimeline.ts'
import type { PlanetId } from '../../types/era.ts'
import { EraCopy, EraLayer } from './EraLayer.tsx'

const PLANETS: { id: PlanetId; name: string; note: string }[] = [
  { id: 'sun', name: 'Sun', note: 'Prime engine' },
  { id: 'earth', name: 'Earth', note: 'Origin' },
  { id: 'moon', name: 'Moon', note: 'Shipyard' },
  { id: 'mars', name: 'Mars', note: 'Colony status: founding' },
]

export function FutureEra() {
  const { year, selectedPlanet } = useTimeline()
  const space = year >= 2070
  const selected = PLANETS.find((planet) => planet.id === selectedPlanet)

  return (
    <EraLayer id="future">
      <EraCopy
        id="future"
        extra={
          space ? (
            <div className="planet-legend">
              {PLANETS.map((planet) => (
                <button
                  key={planet.id}
                  type="button"
                  className={selectedPlanet === planet.id ? 'is-on' : ''}
                  onClick={() =>
                    patchEngine({
                      selectedPlanet: selectedPlanet === planet.id ? null : planet.id,
                    })
                  }
                >
                  {planet.name}
                  <div>{planet.note}</div>
                </button>
              ))}
              {selected ? (
                <p className="meta-note">
                  {selected.name}. Fiction, drawn as if it were already a place.
                </p>
              ) : null}
            </div>
          ) : null
        }
      />
    </EraLayer>
  )
}
