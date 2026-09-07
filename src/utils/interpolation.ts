import type {
  InterpolatedTheme,
  ScenarioId,
  TextureKind,
  ThemeKeyframe,
} from '../types/era.ts'
import { THEME_KEYS } from '../data/eras.ts'
import { clamp, hexToRgbString, lerp, lerpHex } from './colors.ts'

const SCENARIO_TINT: Record<
  Exclude<ScenarioId, 'none'>,
  Partial<Pick<ThemeKeyframe, 'background' | 'foreground' | 'accent' | 'holo' | 'grain'>>
> = {
  ai: {
    background: '#05070c',
    foreground: '#d7f8ff',
    accent: '#5cf0ff',
    holo: 0.9,
  },
  climate: {
    background: '#07110c',
    foreground: '#e7ffe9',
    accent: '#7dffb2',
    grain: 0.08,
  },
  space: {
    background: '#03040a',
    foreground: '#e8f0ff',
    accent: '#9bb8ff',
    holo: 0.85,
  },
  cyberpunk: {
    background: '#0a0310',
    foreground: '#ffe6fb',
    accent: '#ff2bd6',
    grain: 0.16,
  },
  scarcity: {
    background: '#0c0b08',
    foreground: '#fff6e8',
    accent: '#ffd27a',
    holo: 0.4,
  },
}

function mixKey(a: ThemeKeyframe, b: ThemeKeyframe, t: number): InterpolatedTheme {
  const background = lerpHex(a.background, b.background, t)
  const accent = lerpHex(a.accent, b.accent, t)
  const discrete = t < 0.5 ? a : b
  return {
    year: lerp(a.year, b.year, t),
    background,
    foreground: lerpHex(a.foreground, b.foreground, t),
    accent,
    muted: lerpHex(a.muted, b.muted, t),
    panel: lerpHex(a.panel, b.panel, t),
    fontDisplay: discrete.fontDisplay,
    fontBody: discrete.fontBody,
    letterSpacing: lerp(a.letterSpacing, b.letterSpacing, t),
    radius: lerp(a.radius, b.radius, t),
    blur: lerp(a.blur, b.blur, t),
    grain: lerp(a.grain, b.grain, t),
    scanlines: lerp(a.scanlines, b.scanlines, t),
    paper: lerp(a.paper, b.paper, t),
    blueprint: lerp(a.blueprint, b.blueprint, t),
    geometric: lerp(a.geometric, b.geometric, t),
    holo: lerp(a.holo, b.holo, t),
    vignette: lerp(a.vignette, b.vignette, t),
    particleDensity: lerp(a.particleDensity, b.particleDensity, t),
    animationSpeed: lerp(a.animationSpeed, b.animationSpeed, t),
    uiDensity: lerp(a.uiDensity, b.uiDensity, t),
    cursor: discrete.cursor,
    texture: discrete.texture,
    backgroundRgb: hexToRgbString(background),
    accentRgb: hexToRgbString(accent),
  }
}

export function interpolateTheme(
  year: number,
  scenario: ScenarioId = 'none',
): InterpolatedTheme {
  const keys = THEME_KEYS
  if (year <= keys[0].year) return mixKey(keys[0], keys[0], 0)
  if (year >= keys[keys.length - 1].year) {
    return applyScenario(mixKey(keys[keys.length - 1], keys[keys.length - 1], 0), year, scenario)
  }

  let i = 0
  while (i < keys.length - 1 && keys[i + 1].year < year) i += 1
  const a = keys[i]
  const b = keys[i + 1]
  const t = (year - a.year) / (b.year - a.year)
  return applyScenario(mixKey(a, b, clamp(t)), year, scenario)
}

function applyScenario(
  theme: InterpolatedTheme,
  year: number,
  scenario: ScenarioId,
): InterpolatedTheme {
  if (scenario === 'none' || year < 2028) return theme
  const tint = SCENARIO_TINT[scenario]
  const depth = clamp((year - 2028) / 80)
  return {
    ...theme,
    background: tint.background
      ? lerpHex(theme.background, tint.background, depth)
      : theme.background,
    foreground: tint.foreground
      ? lerpHex(theme.foreground, tint.foreground, depth)
      : theme.foreground,
    accent: tint.accent ? lerpHex(theme.accent, tint.accent, depth) : theme.accent,
    holo: tint.holo != null ? lerp(theme.holo, tint.holo, depth) : theme.holo,
    grain: tint.grain != null ? lerp(theme.grain, tint.grain, depth) : theme.grain,
    texture: scenarioTexture(scenario, theme.texture),
  }
}

function scenarioTexture(scenario: ScenarioId, fallback: TextureKind): TextureKind {
  if (scenario === 'cyberpunk') return 'alien'
  if (scenario === 'space') return 'space'
  if (scenario === 'climate') return 'glass'
  return fallback
}

export function crtAmount(year: number): number {
  return Math.exp(-((year - 1987) ** 2) / (2 * 9 * 9))
}

export function earlyWebAmount(year: number): number {
  return Math.exp(-((year - 1995) ** 2) / (2 * 4 * 4))
}

export function futureDepth(year: number): number {
  return clamp((year - 2026) / (2200 - 2026))
}
