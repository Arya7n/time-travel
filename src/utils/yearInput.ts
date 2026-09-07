import { clampYear } from './timeline.ts'

export function parseYearInput(value: string): number | null {
  const raw = value.trim().toUpperCase().replace(/,/g, '')
  if (!raw) return null
  const bc = /\b(BC|BCE)\b/.test(raw)
  const ce = /\b(AD|CE)\b/.test(raw)
  const numeric = raw.replace(/[^\d-]/g, '')
  const parsed = Number.parseInt(numeric, 10)
  if (Number.isNaN(parsed)) return null
  if (bc) return clampYear(-Math.abs(parsed))
  if (ce) return clampYear(Math.abs(parsed))
  return clampYear(parsed)
}
