import { describe, it, expect } from "vitest"
import { GuitarFretboard } from "./GuitarFretboard"
import { standardTuning, type GuitarTuning } from "./GuitarTuning"
import { getPitchIndex } from "./Pitch"

describe("GuitarFretboard", () => {
    it("computes all frets for each string", () => {
        const fretboard = new GuitarFretboard(standardTuning)

        for (let string = 0; string < 6; string++) {
            const guitarString = fretboard.getString(string)
            expect(Object.keys(guitarString).length).toBeGreaterThan(0)
            expect(guitarString[0]).toEqual(standardTuning[string as keyof GuitarTuning])
        }
    })

    it("getFret returns all pitches at a given fret index", () => {
        const fretboard = new GuitarFretboard(standardTuning)
        const fretIndex = 0
        const fret = fretboard.getFret(fretIndex)

        for (let string = 0; string < 6; string++) {
            const expected = standardTuning[string as keyof GuitarTuning]
            expect(fret[string as keyof typeof fret]).toEqual(expected)
        }
    })

    it("advances pitch by frets correctly (based on pitch index)", () => {
        const fretboard = new GuitarFretboard(standardTuning)

        for (let string = 0; string < 6; string++) {
            const openPitch = standardTuning[string as keyof GuitarTuning]
            const openIndex = getPitchIndex(openPitch)

            const fret5 = fretboard.getString(string)[5]
            const fret5Index = getPitchIndex(fret5)

            expect(fret5Index).toBe(openIndex + 5)
        }
    })

    it("respects custom fret range", () => {
        const fretboard = new GuitarFretboard(standardTuning, 3, 5)

        for (let string = 0; string < 6; string++) {
            const frets = fretboard.getString(string)
            expect(frets[2]).toBeUndefined() // fret 2 not computed
            expect(frets[3]).toBeDefined()
            expect(frets[5]).toBeDefined()
            expect(frets[6]).toBeUndefined()
        }
    })
})
