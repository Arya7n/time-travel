export type YearStat = {
  year: number
  people: string
  pace: string
  signal: string
  light: string
}

export const YEAR_STATS: YearStat[] = [
  { year: -3000, people: '≈ 14 million', pace: 'Walk, raft, sail', signal: 'Messenger · fire', light: 'Sun · oil lamp' },
  { year: -500, people: '≈ 100 million', pace: 'Horse · galley', signal: 'Relay riders', light: 'Torch · oil' },
  { year: 100, people: '≈ 200 million', pace: 'Roman road', signal: 'Imperial post', light: 'Olive oil' },
  { year: 800, people: '≈ 220 million', pace: 'Pack animal', signal: 'Letter · bell', light: 'Tallow' },
  { year: 1200, people: '≈ 360 million', pace: 'Caravan · cog', signal: 'Courier', light: 'Candle' },
  { year: 1600, people: '≈ 580 million', pace: 'Galleon', signal: 'Packet ship', light: 'Candle · firelight' },
  { year: 1800, people: '≈ 1 billion', pace: 'Coach · canal', signal: 'Mail coach', light: 'Gas begins' },
  { year: 1850, people: '≈ 1.2 billion', pace: 'Steam rail', signal: 'Telegraph', light: 'Gaslight' },
  { year: 1900, people: '≈ 1.6 billion', pace: 'Rail · steamer', signal: 'Telephone', light: 'Electricity' },
  { year: 1925, people: '≈ 2 billion', pace: 'Automobile', signal: 'Radio', light: 'Neon' },
  { year: 1950, people: '≈ 2.5 billion', pace: 'Propeller airliner', signal: 'Broadcast TV', light: 'Fluorescent' },
  { year: 1969, people: '≈ 3.6 billion', pace: 'Jet · Saturn V', signal: 'Live satellite', light: 'CRT glow' },
  { year: 1995, people: '≈ 5.7 billion', pace: '747 · hatchback', signal: 'Email · dial-up', light: 'Monitor' },
  { year: 2010, people: '≈ 6.9 billion', pace: 'Global aviation', signal: 'Smartphone', light: 'LED' },
  { year: 2026, people: '≈ 8.2 billion', pace: 'Gig economy logistics', signal: 'Always-on packet', light: 'OLED' },
  { year: 2050, people: '≈ 9.7 billion*', pace: 'Autonomous corridor*', signal: 'Ambient net*', light: 'Adaptive sky*' },
  { year: 2100, people: 'Uncertain*', pace: 'Cislunar transfer*', signal: 'Lag as a dialect*', light: 'City as lantern*' },
  { year: 2200, people: 'A species of places*', pace: 'Between wells*', signal: 'Shared cognition*', light: 'Local custom*' },
]

export function statsAt(year: number): YearStat {
  let best = YEAR_STATS[0]
  let bestDist = Infinity
  for (const row of YEAR_STATS) {
    const dist = Math.abs(row.year - year)
    if (dist < bestDist) {
      best = row
      bestDist = dist
    }
  }
  return best
}
