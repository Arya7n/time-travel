import type { TimeCapsule } from '../types/era.ts'

export const CAPSULES: TimeCapsule[] = [
  {
    year: -440,
    eraName: 'Classical Athens',
    headline: 'A city that argues in marble',
    stages: [
      { id: 'morning', title: 'Morning', body: 'You wake to courtyard light. Water from the fountain. Bread, olives, and the sound of the agora assembling.' },
      { id: 'transport', title: 'Transportation', body: 'You walk. Distance is a civic unit. The Acropolis is a compass.' },
      { id: 'work', title: 'Work', body: 'Workshop, assembly, or field. Speech is a tool as serious as bronze.' },
      { id: 'communication', title: 'Communication', body: 'A messenger, a rumor, an inscription. Memory is public and spoken.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Theater at dusk. Tragedy as civic technology.' },
      { id: 'night', title: 'Nightlife', body: 'Oil lamps. Symposium. The night belongs to conversation.' },
    ],
  },
  {
    year: 1220,
    eraName: 'High Medieval',
    headline: 'A world bound in vellum',
    stages: [
      { id: 'morning', title: 'Morning', body: 'Bells before the sun. Cold stone. A prayer that also tells the hour.' },
      { id: 'transport', title: 'Transportation', body: 'Horse, cart, river. A good road is a political achievement.' },
      { id: 'work', title: 'Work', body: 'Guild, field, or scriptorium. Skill is inherited more often than invented.' },
      { id: 'communication', title: 'Communication', body: 'Letters travel like relics. News is a person arriving.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Market day, mystery play, a song in a hall.' },
      { id: 'night', title: 'Nightlife', body: 'Firelight. The city closes. Wolves are not only a metaphor.' },
    ],
  },
  {
    year: 1889,
    eraName: 'Industrial Metropolis',
    headline: 'Steel learns to glow',
    stages: [
      { id: 'morning', title: 'Morning', body: 'A factory whistle. Coal air. Coffee and a newspaper still warm from the press.' },
      { id: 'transport', title: 'Transportation', body: 'Tram, rail, steam. The timetable is a second government.' },
      { id: 'work', title: 'Work', body: 'Shift work. Drafting rooms. The drawing is as real as the girder.' },
      { id: 'communication', title: 'Communication', body: 'Telegram for urgency, letter for everything else.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Music hall, exhibition, a bicycle on Sunday.' },
      { id: 'night', title: 'Nightlife', body: 'Gaslight. The city does not fully go dark anymore.' },
    ],
  },
  {
    year: 1925,
    eraName: 'The Roaring Twenties',
    headline: 'The century puts on jewelry',
    stages: [
      { id: 'morning', title: 'Morning', body: 'A newspaper, strong coffee, a wireless murmuring from the next room.' },
      { id: 'transport', title: 'Transportation', body: 'You travel by train, tram, or — if fortune allows — automobile.' },
      { id: 'work', title: 'Work', body: 'Offices climb. Typewriters clatter. The skyline is a competition.' },
      { id: 'communication', title: 'Communication', body: 'Letters and the telephone. Distance has a new voice.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Cinema. Jazz. A dance floor that refuses to be respectable.' },
      { id: 'night', title: 'Nightlife', body: 'Electric signs. Speakeasy light. The night is fashionable.' },
    ],
  },
  {
    year: 1969,
    eraName: 'The Analog Peak',
    headline: 'The living room faces the Moon',
    stages: [
      { id: 'morning', title: 'Morning', body: 'Radio news. Instant coffee. A paper that still arrives at the door.' },
      { id: 'transport', title: 'Transportation', body: 'Highway, jet, a world measured in layover.' },
      { id: 'work', title: 'Work', body: 'Offices of glass and ashtrays. Mission control as a new cathedral.' },
      { id: 'communication', title: 'Communication', body: 'Rotary phone. Airmail. Television as a shared fire.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Cinema widescreen. Vinyl. A broadcast that the whole street watches.' },
      { id: 'night', title: 'Nightlife', body: 'Neon diners. Stereo glow. The sky, for one July night, is the main event.' },
    ],
  },
  {
    year: 1987,
    eraName: 'Terminal Years',
    headline: 'The machine starts talking back',
    stages: [
      { id: 'morning', title: 'Morning', body: 'CRT glow before sunrise. A diskette on the desk. Coffee beside the fan noise.' },
      { id: 'transport', title: 'Transportation', body: 'Hatchback, subway token, Walkman on the commute.' },
      { id: 'work', title: 'Work', body: 'Dot-matrix reports. A blinking cursor as a colleague.' },
      { id: 'communication', title: 'Communication', body: 'Landline, answering machine, the rare long-distance call.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Arcade, VHS, late-night MTV. The future has a soundtrack.' },
      { id: 'night', title: 'Nightlife', body: 'Club fog. Synth. The city reflected in black glass.' },
    ],
  },
  {
    year: 1995,
    eraName: 'Early Web',
    headline: 'Welcome to the internet',
    stages: [
      { id: 'morning', title: 'Morning', body: 'Dial-up shriek. A homepage under construction. You wait, and that is part of it.' },
      { id: 'transport', title: 'Transportation', body: 'Still analog in the street. Digital only at the desk.' },
      { id: 'work', title: 'Work', body: 'Email is new enough to feel official. The office printer is a personality.' },
      { id: 'communication', title: 'Communication', body: 'Guestbook. Chat room. A letter that arrives in seconds, sometimes.' },
      { id: 'entertainment', title: 'Entertainment', body: 'CD-ROM, blockbuster video, a web ring of strangers.' },
      { id: 'night', title: 'Nightlife', body: 'The modem sings after dark, when the line is free.' },
    ],
  },
  {
    year: 2026,
    eraName: 'The Present',
    headline: 'A pocket archive of the species',
    stages: [
      { id: 'morning', title: 'Morning', body: 'The phone is the first window. Weather, headlines, a map of your own sleep.' },
      { id: 'transport', title: 'Transportation', body: 'A car that talks, a train with a QR code, a city in your pocket.' },
      { id: 'work', title: 'Work', body: 'Tabs, calls, a calendar that believes it knows you.' },
      { id: 'communication', title: 'Communication', body: 'Everything is a message. Almost nothing is a letter.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Infinite scroll as a private cinema.' },
      { id: 'night', title: 'Nightlife', body: 'The city is bright. The screen is brighter. You are here.' },
    ],
  },
  {
    year: 2050,
    eraName: 'Speculative City',
    headline: 'A skyline that thinks',
    stages: [
      { id: 'morning', title: 'Morning', body: 'Light that wakes you by agreement. Air that has been negotiated.' },
      { id: 'transport', title: 'Transportation', body: 'Autonomous corridors. Vertical streets. The commute is optional.' },
      { id: 'work', title: 'Work', body: 'You supervise systems that supervise systems. Craft is a luxury again.' },
      { id: 'communication', title: 'Communication', body: 'Presence without travel. Silence is a setting.' },
      { id: 'entertainment', title: 'Entertainment', body: 'Rooms that can be anywhere. Stories that look back.' },
      { id: 'night', title: 'Nightlife', body: 'The city dims in layers. Stars compete with windows.' },
    ],
  },
  {
    year: 2200,
    eraName: 'Other Syntax',
    headline: 'After the page',
    stages: [
      { id: 'morning', title: 'Morning', body: 'Morning is a local custom. Orbit has other dawns.' },
      { id: 'transport', title: 'Transportation', body: 'Between wells of gravity. A passport that lists a planet.' },
      { id: 'work', title: 'Work', body: 'Meaning is the remaining occupation.' },
      { id: 'communication', title: 'Communication', body: 'Language shares bandwidth with machines that do not sleep.' },
      { id: 'entertainment', title: 'Entertainment', body: 'History is a place you can visit. You are visiting it now.' },
      { id: 'night', title: 'Nightlife', body: 'Night is a direction, not a clock.' },
    ],
  },
]

export function capsuleForYear(year: number): TimeCapsule {
  let best = CAPSULES[0]
  let bestDist = Infinity
  for (const capsule of CAPSULES) {
    const dist = Math.abs(capsule.year - year)
    if (dist < bestDist) {
      best = capsule
      bestDist = dist
    }
  }
  return best
}
