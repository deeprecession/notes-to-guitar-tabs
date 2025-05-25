import type { GuitarTuning } from "../GuitarTuning"
import { fromPitchIndex, getPitchIndex, type Pitch } from "../Pitch"

export type GuitarString = Pitch[]
export type Fretboard = GuitarString[]

export function computeFretboard(
    tuning: GuitarTuning,
    openFret: number = 0,
    lastFret: number = 12
): Fretboard {
    const fretboard: Pitch[][] = []

    for (let stringInx = 0; stringInx < tuning.length; stringInx++) {
        const openPitch = tuning[stringInx]
        const openPitchIndex = getPitchIndex(openPitch)

        fretboard.push([])

        for (let fret = openFret; fret <= lastFret; fret++) {
            const pitch = fromPitchIndex(openPitchIndex + fret)
            fretboard[stringInx].push(pitch)
        }
    }
    return fretboard
}
