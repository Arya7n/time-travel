import type { FutureScenario } from '../types/era.ts'

export const SCENARIOS: FutureScenario[] = [
  {
    id: 'ai',
    title: 'AI Dominates',
    kicker: 'Cognition as infrastructure',
    description:
      'Models become the operating system of cities. Interfaces densify. Language itself is a protocol.',
    bullets: [
      'Every archive is queryable in real time',
      'Authorship becomes a collaboration with systems',
      'Cities optimize themselves, then explain the choice',
    ],
  },
  {
    id: 'climate',
    title: 'Climate Recovery',
    kicker: 'Repair as civilization',
    description:
      'The atmosphere is treated as a commons again. Design turns green, porous, and slow on purpose.',
    bullets: [
      'Coastal cities become amphibious',
      'Energy is abundant and quiet',
      'Wilderness is a designed neighbor',
    ],
  },
  {
    id: 'space',
    title: 'Space Civilization',
    kicker: 'A three-world species',
    description:
      'Earth remains home. The Moon is a shipyard. Mars is an experiment that learned to last.',
    bullets: [
      'Cislunar traffic is scheduled like aviation',
      'Identity includes a gravity well',
      'Night skies fill with moving architecture',
    ],
  },
  {
    id: 'cyberpunk',
    title: 'Cyberpunk',
    kicker: 'Neon weather',
    description:
      'The street finds its own uses for everything. Rain, ads, and private networks stack into a second sky.',
    bullets: [
      'Public space is sponsored',
      'Bodies carry more interface than clothing',
      'The city never fully sleeps',
    ],
  },
  {
    id: 'scarcity',
    title: 'Post-Scarcity',
    kicker: 'After the queue',
    description:
      'Matter is cheap. Attention is not. Culture becomes the scarce resource — and the luxury.',
    bullets: [
      'Work decouples from survival',
      'Craft returns as status',
      'The question is no longer how, but why',
    ],
  },
]
