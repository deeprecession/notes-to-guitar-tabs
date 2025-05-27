import type { Pitch } from "./Pitch"

export type GuitarTuning = Pitch[]

export const standardTuning: GuitarTuning = ["E4", "B3", "G3", "D3", "A2", "E2"] as const
// export const standardTuning: GuitarTuning = ["E2", "A2", "D3", "G3", "B3", "E4"] as const
