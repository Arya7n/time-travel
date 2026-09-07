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

const MILESTONES = [
  { year: 2035, title: 'Human + Machine', body: 'AI integration · digital memory · autonomous cities' },
  { year: 2050, title: 'Vertical Cities', body: 'A stylized metropolis thickens into light and fog' },
  { year: 2075, title: 'Earth → Moon → Mars', body: 'Orbital civilization, still speculative' },
  { year: 2100, title: 'Planetary Scale', body: 'Infrastructure becomes a climate' },
  { year: 2200, title: 'Other Syntax', body: 'The page is no longer the unit of interface' },
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
          <div className="era-facts" style={{ marginTop: '0.6rem' }}>
            {MILESTONES.filter((item) => Math.abs(item.year - year) < 55).map((item) => (
              <div className="fact" key={item.year}>
                <label>{item.year}</label>
                <b>{item.title}</b>
              </div>
            ))}
          </div>
        }
      />
      {space ? (
        <div className="planet-legend">
          {PLANETS.map((planet) => (
            <button
              key={planet.id}
              type="button"
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
            <div className="era-card">
              <h3>{selected.name}</h3>
              <p>{selected.note}. Fiction, drawn as if it were already a place.</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </EraLayer>
  )
}
