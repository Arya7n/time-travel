export type WitnessBeat = {
  year: number
  line: string
}

export const WITNESS: WitnessBeat[] = [
  { year: -3000, line: 'Dust, brick, and a river that decides whether this is a year of grain or of hunger.' },
  { year: -1750, line: 'A city of mud walls. Law is something you can point at on a stone.' },
  { year: -440, line: 'Marble, argument, and the sea as a room. Citizens speak as if speech were a tool.' },
  { year: 80, line: 'Roads like sentences. An empire that believes it is weather.' },
  { year: 800, line: 'Bell, candle, vellum. The world is smaller than the faith that holds it.' },
  { year: 1348, line: 'Empty fields. The living inherit silence, then new bargains.' },
  { year: 1492, line: 'A wake on an ocean that maps had treated as a margin.' },
  { year: 1687, line: 'The sky is suddenly a machine. Someone is doing the arithmetic.' },
  { year: 1825, line: 'Iron, soot, and a whistle that demotes the sun.' },
  { year: 1879, line: 'Night learns a second shift. Windows stay awake.' },
  { year: 1927, line: 'Chrome, radio, and a city performing itself after dark.' },
  { year: 1945, line: 'A new kind of sun. Politics inherits physics.' },
  { year: 1969, line: 'Dust of another world on a boot. Earth becomes a photograph.' },
  { year: 1987, line: 'A cursor blinks. The machine is waiting for a language it can answer.' },
  { year: 1995, line: 'Pages under construction. The public square is still a modem tone.' },
  { year: 2007, line: 'A slab of glass in every palm. The street is also a feed.' },
  { year: 2020, line: 'Cities on mute. Rooms become the whole geography.' },
  { year: 2026, line: 'You are in the only year that can still choose. Everything else is archive or rumor.' },
  { year: 2035, line: 'Cognition hums under the pavement, unnoticed until it stutters.' },
  { year: 2050, line: 'The old skyline is a basement. Weather happens between towers.' },
  { year: 2075, line: 'Earth is a departure lounge. Gravity is a stamp in a passport.' },
  { year: 2100, line: 'Air, compute, and orbit share a ledger. Nations argue with columns.' },
  { year: 2200, line: 'The interface has stopped pretending to be a page. History is a place.' },
]

export function witnessAt(year: number): WitnessBeat {
  let best = WITNESS[0]
  let bestDist = Infinity
  for (const beat of WITNESS) {
    const dist = Math.abs(beat.year - year)
    if (dist < bestDist) {
      best = beat
      bestDist = dist
    }
  }
  return best
}
