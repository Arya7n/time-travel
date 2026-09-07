export type HistoryEvent = {
  year: number
  title: string
  body: string
}

export const EVENTS: HistoryEvent[] = [
  { year: -2560, title: 'Great Pyramid', body: 'Khufu’s tomb at Giza becomes the ancient world’s most durable clock — a monument that still tells us someone intended to last.' },
  { year: -1754, title: 'Hammurabi’s code', body: 'Law is cut into stone. Justice becomes a public text, not only a king’s mood.' },
  { year: -753, title: 'Rome founded', body: 'A river village claims a destiny. The calendar of the West will count from a later empire, but the myth starts here.' },
  { year: -508, title: 'Athenian democracy', body: 'Citizens vote in the open air. Politics learns a new, fragile grammar.' },
  { year: -221, title: 'Qin unifies China', body: 'Warring states become an empire. Script, roads, and measures are forced into one grammar.' },
  { year: -44, title: 'Ides of March', body: 'A republic argues with a knife. Rome’s calendar will remember the date longer than the conspirators.' },
  { year: 79, title: 'Vesuvius', body: 'A city is sealed in ash. Everyday objects become a museum of a single afternoon.' },
  { year: 476, title: 'Fall of the West', body: 'An emperor is deposed. The idea of Rome outlives the office.' },
  { year: 622, title: 'Hijra', body: 'A community relocates, and a calendar begins. Faith becomes a geography.' },
  { year: 800, title: 'Charlemagne crowned', body: 'A new empire borrows an old name. Latin and sword redraw Europe.' },
  { year: 1088, title: 'University of Bologna', body: 'Scholars gather as a corporation. Knowledge gets a campus.' },
  { year: 1271, title: 'Polo’s departure', body: 'A Venetian journey stitches continents into a story Europe wants to believe.' },
  { year: 1347, title: 'Black Death', body: 'A bacterium redraws labor, faith, and the price of a day’s work.' },
  { year: 1455, title: 'Gutenberg Bible', body: 'Moveable type multiplies scripture. Information learns industrial scale.' },
  { year: 1492, title: 'Atlantic crossing', body: 'Two worlds collide. Maps, empires, and catastrophe follow the wake.' },
  { year: 1687, title: 'Principia', body: 'Newton writes the sky as law. The universe becomes a calculable machine.' },
  { year: 1776, title: 'Declarations', body: 'A republic is argued into being on paper. Rights become a genre.' },
  { year: 1789, title: 'Bastille', body: 'A prison falls and a calendar is rewritten. Revolution becomes a style of time.' },
  { year: 1825, title: 'Steam on rails', body: 'Stockton & Darlington. Distance starts to obey a timetable.' },
  { year: 1844, title: 'What hath God wrought', body: 'Morse’s telegraph collapses geography into dots. News outruns horses.' },
  { year: 1879, title: 'Electric light', body: 'Night is colonized. Cities no longer wait for the sun.' },
  { year: 1903, title: 'Kitty Hawk', body: 'Twelve seconds of flight. The map grows a third dimension.' },
  { year: 1914, title: 'July crisis', body: 'A continent walks into industrial slaughter. The twentieth century finds its voice.' },
  { year: 1922, title: 'Tutankhamun', body: 'A tomb is opened for the cameras. Antiquity becomes mass spectacle.' },
  { year: 1927, title: 'The Jazz Singer', body: 'Cinema finds a voice. Silence was only a phase.' },
  { year: 1945, title: 'A split atom', body: 'A war ends with a new kind of sun. Politics inherits the physics.' },
  { year: 1957, title: 'Sputnik', body: 'A beep from orbit. The sky is no longer empty of us.' },
  { year: 1969, title: 'Tranquility Base', body: 'A boot print on another world. Earth is photographed as a small blue fact.' },
  { year: 1977, title: 'Voyager', body: 'A golden record leaves. Earth sends a greeting it may never hear answered.' },
  { year: 1989, title: 'WorldWideWeb', body: 'Berners-Lee proposes a web of links. The document becomes a network.' },
  { year: 1991, title: 'A public internet', body: 'The net leaves the lab. Pages, guestbooks, and the first crowds arrive.' },
  { year: 2001, title: 'A century turns violent', body: 'Towers fall on live television. Security becomes an atmosphere.' },
  { year: 2007, title: 'A computer in the pocket', body: 'The phone swallows the camera, the map, and the mailbox.' },
  { year: 2012, title: 'Higgs boson', body: 'A missing piece of the Standard Model is found. The vacuum has a field.' },
  { year: 2020, title: 'A shared pause', body: 'A virus stops cities. Screens become the street for a year.' },
  { year: 2026, title: 'You are here', body: 'The only year that can still choose. Everything behind you is archive.' },
  { year: 2035, title: 'Cognition as utility', body: 'Speculative: models sit under cities the way electricity does — invisible until they fail.' },
  { year: 2050, title: 'Vertical weather', body: 'Speculative: streets become canyons. Most of a life happens above the old skyline.' },
  { year: 2075, title: 'Cislunar commute', body: 'Speculative: Earth, Moon, and transfer orbits share a timetable. Gravity is a passport stamp.' },
  { year: 2100, title: 'Planetary bookkeeping', body: 'Speculative: climate, compute, and orbit are one ledger. Nations argue with spreadsheets of air.' },
  { year: 2200, title: 'After the page', body: 'Speculative: the interface no longer pretends to be a document. History is a place you can visit.' },
]

export function nearestEvent(year: number): HistoryEvent {
  let best = EVENTS[0]
  let bestDist = Infinity
  for (const event of EVENTS) {
    const dist = Math.abs(event.year - year)
    if (dist < bestDist) {
      best = event
      bestDist = dist
    }
  }
  return best
}

export function eventIndex(year: number): number {
  const target = nearestEvent(year)
  return EVENTS.findIndex((event) => event.year === target.year)
}

export function adjacentEvent(year: number, direction: -1 | 1): HistoryEvent {
  const index = eventIndex(year)
  const next = Math.max(0, Math.min(EVENTS.length - 1, index + direction))
  return EVENTS[next]
}

export function nextEventAfter(year: number): HistoryEvent | null {
  return EVENTS.find((event) => event.year > year + 0.4) ?? null
}
