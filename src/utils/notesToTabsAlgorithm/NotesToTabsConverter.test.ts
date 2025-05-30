import { describe, expect, it } from "vitest"
import { findAllTabsForChord, getAllWaysToPlayChordSequence } from "./NotesToTabsConverter"
import { standardTuning } from "../../entities/GuitarTuning"
import type { Tab } from "../../entities/Tab"
import { computeFretboard } from "../../entities/fretboard/Fretboard"
import type { Chord, ChordSequence } from "../../entities/ChordSequence"

describe("get all ways to play chord with previous tab position", () => {
    it("should sort to the knowing that previous positon was at 12ve fret", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: ChordSequence = [["E5"], ["F#4"]]

        const tabs = getAllWaysToPlayChordSequence(fretboard, chord)

        const expected: Tab[] = [
            [null, null, 11, null, null, null],
            [null, 7, null, null, null, null],
            [2, null, null, null, null, null],
        ]

        expect(tabs[1]).to.deep.equal(expected)
    })

    it("should sort to the knowing that previous positon was at 1st fret", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: ChordSequence = [["F4"], ["F#4"]]

        const tabs = getAllWaysToPlayChordSequence(fretboard, chord)

        const expected: Tab[] = [
            [2, null, null, null, null, null],
            [null, 7, null, null, null, null],
            [null, null, 11, null, null, null],
        ]

        expect(tabs[1]).to.deep.equal(expected)
    })

    it("should sort to the knowing that previous positon was at 8th fret", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: ChordSequence = [["C5"], ["F#4"]]

        const tabs = getAllWaysToPlayChordSequence(fretboard, chord)

        const expected: Tab[] = [
            [null, 7, null, null, null, null],
            [null, null, 11, null, null, null],
            [2, null, null, null, null, null],
        ]

        expect(tabs[1]).to.deep.equal(expected)
    })

    it("should sort to the knowing that previous positon was at 5th fret", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: ChordSequence = [["A4"], ["F#4"]]

        const tabs = getAllWaysToPlayChordSequence(fretboard, chord)

        const expected: Tab[] = [
            [null, 7, null, null, null, null],
            [2, null, null, null, null, null],
            [null, null, 11, null, null, null],
        ]

        expect(tabs[1]).to.deep.equal(expected)
    })

    it("should still memorize previous chord when there are epmty chords between two chords", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: ChordSequence = [["E5"], [], [], ["F#4"]]

        const tabs = getAllWaysToPlayChordSequence(fretboard, chord)

        const expected: Tab[] = [
            [null, null, 11, null, null, null],
            [null, 7, null, null, null, null],
            [2, null, null, null, null, null],
        ]

        expect(tabs[3]).to.deep.equal(expected)
    })

    it("should suggest to play open string firstly, and then other strings", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: ChordSequence = [["E5"], ["E4"]]

        const tabs = getAllWaysToPlayChordSequence(fretboard, chord)

        const expected: Tab[] = [
            [0, null, null, null, null, null],
            [null, null, 9, null, null, null],
            [null, 5, null, null, null, null],
        ]

        expect(tabs[1]).to.deep.equal(expected)
    })
})

describe("find all tabs for chord", () => {
    it("should have no solution for pitch outside fretboard", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["E0"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = []
        expect(tabs).to.have.deep.members(expected)
    })

    it("should find one possible solution for E2 pitch", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["E2"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = [[null, null, null, null, null, 0]]
        expect(tabs).to.have.deep.members(expected)
    })

    it("should find one possible solution for E5 pitch", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["E5"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = [[12, null, null, null, null, null]]
        expect(tabs).to.have.deep.members(expected)
    })

    it("should find three possible solution for F#4 pitch", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["F#4"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = [
            [2, null, null, null, null, null],
            [null, 7, null, null, null, null],
            [null, null, 11, null, null, null],
        ]
        expect(tabs).to.have.deep.members(expected)
    })

    it("should have one solution for for E2 and E5 pitches", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["E2", "E5"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = [
            [12, null, null, null, null, 0],
            [12, null, null, null, null, null],
            [null, null, null, null, null, 0],
        ]
        expect(tabs).to.have.deep.members(expected)
    })

    it("should have 7 solutions for for E2 and F#4 pitches", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["F#4", "E2"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = [
            [null, null, null, null, null, 0],
            [null, null, 11, null, null, 0],
            [null, 7, null, null, null, 0],
            [2, null, null, null, null, 0],
            [null, null, 11, null, null, null],
            [null, 7, null, null, null, null],
            [2, null, null, null, null, null],
        ]
        expect(tabs).to.have.deep.members(expected)
    })

    it("should have 2 solutions for D5 and E5 pitches", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["D5", "E5"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = [
            [10, null, null, null, null, null],
            [12, null, null, null, null, null],
        ]
        expect(tabs).to.have.deep.members(expected)
    })

    it("should have 2 solutions for D5 and E5 pitches", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["D5", "E5"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab[] = [
            [10, null, null, null, null, null],
            [12, null, null, null, null, null],
        ]
        expect(tabs).to.have.deep.members(expected)
    })

    it("should include solution for Am chord", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["A2", "E3", "A3", "C4", "E4"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab = [0, 1, 2, 2, 0, null]

        expect(tabs).to.include.deep.includes(expected)
    })

    it("should include solution for Gm chord", () => {
        const fretboard = computeFretboard(standardTuning)
        const chord: Chord = ["G2", "D3", "G3", "A#3", "D4", "G4"]

        const tabs = findAllTabsForChord(fretboard, chord)

        const expected: Tab = [3, 3, 3, 5, 5, 3]

        expect(tabs).to.include.deep.includes(expected)
    })
})
