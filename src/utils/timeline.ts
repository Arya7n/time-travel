import { clamp, lerp } from './colors.ts'

export const MIN_YEAR = -3000
export const MAX_YEAR = 2200
export const PRESENT_YEAR = 2026

type TrackPoint = [t: number, year: number]

const TRACK: TrackPoint[] = [
  [0.0, -3000],
  [0.08, -500],
  [0.14, 100],
  [0.2, 500],
  [0.3, 1500],
  [0.38, 1750],
  [0.46, 1880],
  [0.52, 1925],
  [0.58, 1965],
  [0.66, 1987],
  [0.72, 2000],
  [0.78, 2026],
  [0.86, 2075],
  [0.93, 2150],
  [1.0, 2200],
]

function findSegment(value: number, index: 0 | 1): number {
  const last = TRACK.length - 2
  for (let i = 0; i < TRACK.length - 1; i += 1) {
    const a = TRACK[i][index]
    const b = TRACK[i + 1][index]
    if (value >= Math.min(a, b) && value <= Math.max(a, b)) return i
  }
  return value <= TRACK[0][index] ? 0 : last
}

export function yearToT(year: number): number {
  const y = clamp(year, MIN_YEAR, MAX_YEAR)
  const i = findSegment(y, 1)
  const [t0, y0] = TRACK[i]
  const [t1, y1] = TRACK[i + 1]
  const u = y1 === y0 ? 0 : (y - y0) / (y1 - y0)
  return lerp(t0, t1, u)
}

export function tToYear(t: number): number {
  const p = clamp(t)
  const i = findSegment(p, 0)
  const [t0, y0] = TRACK[i]
  const [t1, y1] = TRACK[i + 1]
  const u = t1 === t0 ? 0 : (p - t0) / (t1 - t0)
  return lerp(y0, y1, u)
}

export function formatYear(year: number): string {
  const y = Math.round(year)
  if (y < 0) return `${Math.abs(y)} BC`
  return `${y}`
}

export function formatYearLong(year: number): string {
  const y = Math.round(year)
  if (y < 0) return `${Math.abs(y)} BCE`
  if (y < 500) return `${y} CE`
  return `${y}`
}

export function clampYear(year: number): number {
  return clamp(year, MIN_YEAR, MAX_YEAR)
}
