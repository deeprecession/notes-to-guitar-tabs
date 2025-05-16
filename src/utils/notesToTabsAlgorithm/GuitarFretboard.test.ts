import { describe, it, expect } from "vitest"
import { computeFretboard } from "./GuitarFretboard"
import { standardTuning } from "./GuitarTuning"

describe("GuitarFretboard", () => {
    it("correct bass string on default guitar tuning", () => {
        const fretboard = computeFretboard(standardTuning)

        expect(fretboard.length).equals(6)
        expect(fretboard[0].length).equals(13)
        expect(fretboard[0][1]).to.equal("F2")
        expect(fretboard[0][2]).to.equal("F#2")
        expect(fretboard[0][12]).to.equal("E3")
    })

    it("correct bass string on default guitar tuning with capo", () => {
        const fretboard = computeFretboard(standardTuning, 2)

        expect(fretboard.length).equals(6)
        expect(fretboard[0].length).equals(11)
        expect(fretboard[0][0]).to.equal("F#2")
        expect(fretboard[0][1]).to.equal("G2")
        expect(fretboard[0][10]).to.equal("E3")
    })
})
