import { useSyncExternalStore } from 'react'
import {
  getSnapshot,
  subscribe,
  subscribeFine,
  type EngineSnapshot,
} from '../engine/timeEngine.ts'
import { eraAtYear } from '../data/eras.ts'
import type { Era } from '../types/era.ts'

export function useTimeline(): EngineSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export function useFineYear(): number {
  return useSyncExternalStore(
    subscribeFine,
    () => getSnapshot().year,
    () => getSnapshot().year,
  )
}

export function useEra(): Era {
  const { year } = useTimeline()
  return eraAtYear(year)
}
