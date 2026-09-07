import { eraAtYear } from '../data/eras.ts'
import type { Era, InterpolatedTheme, PlanetId, ScenarioId } from '../types/era.ts'
import { morphAudio } from './audio.ts'
import { interpolateTheme } from '../utils/interpolation.ts'
import {
  clampYear,
  MAX_YEAR,
  MIN_YEAR,
  PRESENT_YEAR,
  tToYear,
  yearToT,
} from '../utils/timeline.ts'

type Listener = () => void
export type TravelSpeed = 'slow' | 'cruise' | 'fast'

export type EngineSnapshot = {
  year: number
  target: number
  eraId: Era['id']
  scenario: ScenarioId
  muted: boolean
  reducedMotion: boolean
  introComplete: boolean
  capsuleOpen: boolean
  whatIfOpen: boolean
  selectedPlanet: PlanetId | null
  seenFuture: boolean
  cursorLabel: string
  playing: boolean
  travelSpeed: TravelSpeed
  pinnedYear: number | null
  birthYear: number | null
}

const listeners = new Set<Listener>()
const fineListeners = new Set<Listener>()

const T_RATES: Record<TravelSpeed, number> = {
  slow: 0.028,
  cruise: 0.052,
  fast: 0.11,
}

const PLAY_T: Record<TravelSpeed, number> = {
  slow: 0.012,
  cruise: 0.022,
  fast: 0.045,
}

const T_CAPS: Record<TravelSpeed, number> = {
  slow: 0.036,
  cruise: 0.068,
  fast: 0.15,
}

let snapshot: EngineSnapshot = {
  year: PRESENT_YEAR,
  target: PRESENT_YEAR,
  eraId: 'present',
  scenario: 'none',
  muted: true,
  reducedMotion: false,
  introComplete: false,
  capsuleOpen: false,
  whatIfOpen: false,
  selectedPlanet: null,
  seenFuture: false,
  cursorLabel: '',
  playing: false,
  travelSpeed: 'slow',
  pinnedYear: null,
  birthYear: null,
}

let raf = 0
let started = false
let lastNotifyYear = PRESENT_YEAR
let lastNotifyEra: Era['id'] = 'present'
let lastTs = 0
let tChaseRate = T_RATES.slow
let dragging = false

export const visual = {
  year: PRESENT_YEAR,
  theme: interpolateTheme(PRESENT_YEAR),
}

let published: EngineSnapshot = { ...snapshot }

function publish() {
  published = { ...snapshot, year: Math.round(snapshot.year) }
  listeners.forEach((listener) => listener())
}

function emitFine() {
  fineListeners.forEach((listener) => listener())
}

function applyCss(theme: InterpolatedTheme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const s = root.style
  s.setProperty('--bg', theme.background)
  s.setProperty('--fg', theme.foreground)
  s.setProperty('--accent', theme.accent)
  s.setProperty('--muted', theme.muted)
  s.setProperty('--panel', theme.panel)
  s.setProperty('--bg-rgb', theme.backgroundRgb)
  s.setProperty('--accent-rgb', theme.accentRgb)
  s.setProperty('--font-display', theme.fontDisplay)
  s.setProperty('--font-body', theme.fontBody)
  s.setProperty('--letterspacing', `${theme.letterSpacing}em`)
  s.setProperty('--radius', `${theme.radius}px`)
  s.setProperty('--blur', `${theme.blur}px`)
  s.setProperty('--grain', String(theme.grain))
  s.setProperty('--scanlines', String(theme.scanlines))
  s.setProperty('--paper', String(theme.paper))
  s.setProperty('--blueprint', String(theme.blueprint))
  s.setProperty('--geometric', String(theme.geometric))
  s.setProperty('--holo', String(theme.holo))
  s.setProperty('--vignette', String(theme.vignette))
  s.setProperty('--particles', String(theme.particleDensity))
  s.setProperty('--anim-speed', String(theme.animationSpeed))
  s.setProperty('--ui-density', String(theme.uiDensity))
  root.dataset.cursor = theme.cursor
  root.dataset.texture = theme.texture
  root.dataset.era = snapshot.eraId
}

function persist() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem('tm-year', String(Math.round(snapshot.year)))
    window.localStorage.setItem('tm-speed', snapshot.travelSpeed)
    if (snapshot.birthYear === null) window.localStorage.removeItem('tm-birth')
    else window.localStorage.setItem('tm-birth', String(snapshot.birthYear))
  } catch {
    /* ignore quota */
  }
}

function writeHash() {
  if (typeof window === 'undefined') return
  const y = Math.round(snapshot.year)
  const hash = y < 0 ? `#${Math.abs(y)}bc` : `#${y}`
  if (window.location.hash.toLowerCase() !== hash) {
    history.replaceState(null, '', hash)
  }
}

function tick(ts: number) {
  if (!started) return
  const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016
  lastTs = ts

  if (snapshot.playing && !dragging && !snapshot.reducedMotion) {
    const nextT = yearToT(snapshot.target) + PLAY_T[snapshot.travelSpeed] * dt
    if (nextT >= 1) {
      snapshot.target = MAX_YEAR
      snapshot.playing = false
      publish()
    } else {
      snapshot.target = tToYear(nextT)
    }
  }

  if (dragging || snapshot.reducedMotion) {
    snapshot.year = snapshot.target
  } else {
    const tNow = yearToT(snapshot.year)
    const tGoal = yearToT(snapshot.target)
    const tDiff = tGoal - tNow
    const step = tChaseRate * dt
    snapshot.year =
      Math.abs(tDiff) <= Math.max(step, 0.0002)
        ? snapshot.target
        : tToYear(tNow + Math.sign(tDiff) * step)
  }

  visual.year = snapshot.year
  visual.theme = interpolateTheme(snapshot.year, snapshot.scenario)
  applyCss(visual.theme)

  if (snapshot.year > 2040) snapshot.seenFuture = true

  const rounded = Math.round(snapshot.year)
  const eraId = eraAtYear(snapshot.year).id
  const changed =
    rounded !== lastNotifyYear || eraId !== lastNotifyEra || snapshot.eraId !== eraId
  snapshot.eraId = eraId
  if (changed) {
    lastNotifyYear = rounded
    lastNotifyEra = eraId
    morphAudio(snapshot.year, snapshot.muted)
    publish()
    persist()
    if (snapshot.introComplete) writeHash()
  }
  emitFine()
  raf = requestAnimationFrame(tick)
}

function readSavedYear(): number {
  if (typeof window === 'undefined') return PRESENT_YEAR
  const hash = window.location.hash.replace('#', '').toLowerCase()
  if (hash) {
    const bc = hash.endsWith('bc')
    const n = Number.parseInt(hash.replace(/[^\d-]/g, ''), 10)
    if (!Number.isNaN(n)) return clampYear(bc ? -Math.abs(n) : n)
  }
  try {
    const saved = Number.parseInt(window.localStorage.getItem('tm-year') ?? '', 10)
    if (!Number.isNaN(saved)) return clampYear(saved)
  } catch {
    /* ignore */
  }
  return PRESENT_YEAR
}

export function startEngine() {
  if (started) return
  started = true
  if (typeof window !== 'undefined') {
    snapshot.reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const savedSpeed = window.localStorage.getItem('tm-speed')
    if (savedSpeed === 'slow' || savedSpeed === 'cruise' || savedSpeed === 'fast') {
      snapshot.travelSpeed = savedSpeed
    }
    const savedBirth = Number.parseInt(window.localStorage.getItem('tm-birth') ?? '', 10)
    if (!Number.isNaN(savedBirth)) snapshot.birthYear = clampYear(savedBirth)
    const start = readSavedYear()
    snapshot.year = start
    snapshot.target = start
    lastNotifyYear = Math.round(start)
    lastNotifyEra = eraAtYear(start).id
    snapshot.eraId = lastNotifyEra
    tChaseRate = T_RATES[snapshot.travelSpeed]
  }
  visual.year = snapshot.year
  visual.theme = interpolateTheme(snapshot.year, snapshot.scenario)
  applyCss(visual.theme)
  publish()
  raf = requestAnimationFrame(tick)
}

export function stopEngine() {
  started = false
  cancelAnimationFrame(raf)
}

export function getSnapshot(): EngineSnapshot {
  return published
}

export function getLive(): EngineSnapshot {
  return snapshot
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function subscribeFine(listener: Listener): () => void {
  fineListeners.add(listener)
  return () => fineListeners.delete(listener)
}

export function setDragging(value: boolean) {
  dragging = value
}

export function setTarget(year: number, immediate = false) {
  snapshot.target = clampYear(year)
  if (immediate || snapshot.reducedMotion) {
    snapshot.year = snapshot.target
    tChaseRate = T_RATES[snapshot.travelSpeed]
    return
  }
  const distT = Math.abs(yearToT(snapshot.target) - yearToT(snapshot.year))
  const base = T_RATES[snapshot.travelSpeed]
  const duration = Math.min(11, Math.max(1.6, distT / base))
  tChaseRate = Math.min(T_CAPS[snapshot.travelSpeed], Math.max(0.01, distT / duration))
}

export function nudgeTarget(delta: number) {
  snapshot.playing = false
  setTarget(snapshot.target + delta)
}

export function patchEngine(partial: Partial<EngineSnapshot>) {
  snapshot = { ...snapshot, ...partial }
  if (partial.travelSpeed) {
    tChaseRate = T_RATES[partial.travelSpeed]
    persist()
  }
  if (partial.birthYear !== undefined) persist()
  publish()
}

export function setCursorLabel(label: string) {
  if (snapshot.cursorLabel === label) return
  snapshot.cursorLabel = label
  publish()
}

export function togglePlay() {
  snapshot.playing = !snapshot.playing
  if (snapshot.playing && yearToT(snapshot.target) > 0.98) {
    snapshot.target = MIN_YEAR
    snapshot.year = MIN_YEAR
  }
  publish()
}
