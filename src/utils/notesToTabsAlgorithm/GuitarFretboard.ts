import type { GuitarTuning } from "./GuitarTuning"
import { fromPitchIndex, getPitchIndex, type Pitch } from "./Pitch"

export type GuitarFret = {
    0: Pitch
    1: Pitch
    2: Pitch
    3: Pitch
    4: Pitch
    5: Pitch
}

export type GuitarString = {
    [fret: number]: Pitch
}

export class GuitarFretboard {
    private tuning: GuitarTuning
    private firstFret: number
    private lastFret: number

    private fretboard: Pitch[][] = []

    constructor(tuning: GuitarTuning, openFret: number = 0, lastFret: number = 12) {
        this.tuning = tuning
        this.firstFret = openFret
        this.lastFret = lastFret

        this.computeFretboard()
    }

    public getFret(fret: number): GuitarFret {
        const result = {} as GuitarFret
        for (let string = 0; string < 6; string++) {
            result[string as keyof GuitarFret] = this.fretboard[string][fret]
        }
        return result
    }

    public getString(stringInx: number): GuitarString {
        return this.fretboard[stringInx]
    }

    private computeFretboard() {
        for (let stringInx = 0; stringInx < 6; stringInx++) {
            const openPitch = this.tuning[stringInx as keyof GuitarTuning]
            const openPitchIndex = getPitchIndex(openPitch)

            this.fretboard.push([])

            for (let fret = this.firstFret; fret <= this.lastFret; fret++) {
                const pitch = fromPitchIndex(openPitchIndex + fret)
                this.fretboard[stringInx][fret] = pitch
            }
        }
    }
}
