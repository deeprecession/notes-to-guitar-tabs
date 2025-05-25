import type { Pitch } from "./Pitch"

export type GuitarTuning = Pitch[]

export const standardTuning: GuitarTuning = ["E2", "A2", "D3", "G3", "B3", "E4"] as const
