export type CursorKind = 'quill' | 'mechanical' | 'pixel' | 'minimal' | 'holo'

export type TextureKind =
  | 'void'
  | 'stone'
  | 'parchment'
  | 'steel'
  | 'deco'
  | 'analog'
  | 'crt'
  | 'earlyweb'
  | 'glass'
  | 'space'
  | 'alien'

export type ScenarioId =
  | 'none'
  | 'ai'
  | 'climate'
  | 'space'
  | 'cyberpunk'
  | 'scarcity'

export type ThemeKeyframe = {
  year: number
  background: string
  foreground: string
  accent: string
  muted: string
  panel: string
  fontDisplay: string
  fontBody: string
  letterSpacing: number
  radius: number
  blur: number
  grain: number
  scanlines: number
  paper: number
  blueprint: number
  geometric: number
  holo: number
  vignette: number
  particleDensity: number
  animationSpeed: number
  uiDensity: number
  cursor: CursorKind
  texture: TextureKind
}

export type InterpolatedTheme = ThemeKeyframe & {
  backgroundRgb: string
  accentRgb: string
}

export type EraId =
  | 'ancient'
  | 'medieval'
  | 'industrial'
  | 'artdeco'
  | 'midcentury'
  | 'digital'
  | 'present'
  | 'future'

export type EraFact = {
  label: string
  value: string
}

export type Era = {
  id: EraId
  startYear: number
  endYear: number
  name: string
  kicker: string
  description: string
  quote?: string
  quoteBy?: string
  facts: EraFact[]
  sections: { title: string; body: string }[]
}

export type CapsuleStage = {
  id: string
  title: string
  body: string
}

export type TimeCapsule = {
  year: number
  eraName: string
  headline: string
  stages: CapsuleStage[]
}

export type FutureScenario = {
  id: Exclude<ScenarioId, 'none'>
  title: string
  kicker: string
  description: string
  bullets: string[]
}

export type PlanetId = 'sun' | 'earth' | 'moon' | 'mars'
