import type { Pitch } from "./Pitch"

export type GuitarTuning = {
    0: Pitch
    1: Pitch
    2: Pitch
    3: Pitch
    4: Pitch
    5: Pitch
}

export const standardTuning: GuitarTuning = {
    0: "E2",
    1: "A2",
    2: "D3",
    3: "G3",
    4: "B3",
    5: "E4",
} as const
