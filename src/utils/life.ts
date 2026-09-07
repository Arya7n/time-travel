import { PRESENT_YEAR } from './timeline.ts'

export const LIFE_SPAN = 78

export function fromNowLabel(year: number): string {
  const delta = Math.round(year) - PRESENT_YEAR
  if (delta === 0) return 'This is now'
  const span = Math.abs(delta).toLocaleString('en-US')
  return delta < 0 ? `${span} years before now` : `${span} years from now`
}

export function lifeLabel(birth: number, year: number): string {
  const age = Math.round(year) - Math.round(birth)
  if (age < -1) return `${Math.abs(age).toLocaleString('en-US')} years before you were born`
  if (age <= 0) return 'the year you arrive'
  if (age < 13) return `you would be ${age} — still a child`
  if (age < LIFE_SPAN) return `you would be ${age}`
  if (age < 110) return `you would be ${age} — a rare old age`
  return `you would be ${age} — past a human lifetime`
}
