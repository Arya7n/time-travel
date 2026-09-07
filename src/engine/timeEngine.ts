import { eraAtYear } from '../data/eras.ts'
import type { Era, InterpolatedTheme, PlanetId, ScenarioId } from '../types/era.ts'
import { morphAudio } from './audio.ts'
import { interpolateTheme } from '../utils/interpolation.ts'
import { clampYear, PRESENT_YEAR } from '../utils/timeline.ts'

type Listener = () => void

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
}

const listeners = new Set<Listener>()
const fineListeners = new Set<Listener>()

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
}

let raf = 0
let started = false
let lastNotifyYear = PRESENT_YEAR
let lastNotifyEra: Era['id'] = 'present'

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

function tick() {
  if (!started) return
  const ease = snapshot.reducedMotion ? 1 : 0.085
  const next = snapshot.year + (snapshot.target - snapshot.year) * ease
  snapshot.year =
    Math.abs(snapshot.target - next) < 0.02 ? snapshot.target : next
  visual.year = snapshot.year
  visual.theme = interpolateTheme(snapshot.year, snapshot.scenario)
  applyCss(visual.theme)

  if (snapshot.year > 2040) snapshot.seenFuture = true

  const rounded = Math.round(snapshot.year)
  const eraId = eraAtYear(snapshot.year).id
  const changed = rounded !== lastNotifyYear || eraId !== lastNotifyEra || snapshot.eraId !== eraId
  snapshot.eraId = eraId
  if (changed) {
    lastNotifyYear = rounded
    lastNotifyEra = eraId
    morphAudio(snapshot.year, snapshot.muted)
    publish()
  }
  emitFine()
  raf = requestAnimationFrame(tick)
}

export function startEngine() {
  if (started) return
  started = true
  if (typeof window !== 'undefined') {
    snapshot.reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }
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

export function setTarget(year: number, immediate = false) {
  snapshot.target = clampYear(year)
  if (immediate || snapshot.reducedMotion) {
    snapshot.year = snapshot.target
  }
}

export function nudgeTarget(delta: number) {
  setTarget(snapshot.target + delta)
}

export function patchEngine(partial: Partial<EngineSnapshot>) {
  snapshot = { ...snapshot, ...partial }
  publish()
}

export function setCursorLabel(label: string) {
  if (snapshot.cursorLabel === label) return
  snapshot.cursorLabel = label
  publish()
}
