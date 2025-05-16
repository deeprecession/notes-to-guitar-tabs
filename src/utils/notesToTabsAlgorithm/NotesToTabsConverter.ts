import type { Fretboard } from "./GuitarFretboard"
import type { Pitch } from "./Pitch"

export type Tab = (number | null)[]

export type Chord = Pitch[]
// type ChordSequence = Chord[]

// export function convertChordSequence(fretboard: Fretboard, sequence: ChordSequence): Tab[] {
//     return sequence.map((chord) => convertChord(fretboard, chord))
// }
//
// function convertChord(fretboard: Fretboard, chord: Chord): Tab {
//     return []
// }

export function findAllTabsForChord(fretboard: Fretboard, chord: Chord): Tab[] {
    function helper(fretboard: Fretboard, chord: Chord, curSolution: Tab = []): Tab[] {
        if (fretboard.length === 0) return [curSolution]

        if (chord.length === 0) {
            const curSolutionWithFilledLastStrings = [
                [...curSolution, ...Array(fretboard.length).fill(null)],
            ]
            return curSolutionWithFilledLastStrings
        }

        const solutions: Tab[] = []

        while (fretboard.length > 0) {
            // take string
            const string = fretboard[0]

            // find a note from chord on string
            for (let fretInx = 0; fretInx < string.length; fretInx++) {
                const fretPitch = string[fretInx]

                for (let chordInx = 0; chordInx < chord.length; chordInx++) {
                    const chordPitch = chord[chordInx]

                    if (chordPitch === fretPitch) {
                        const nextSolution = [...curSolution, fretInx]
                        const nextFretboard = fretboard.slice(1)
                        const nextChord = [...chord]
                        nextChord.splice(chordInx, 1)

                        solutions.push(...helper(nextFretboard, nextChord, nextSolution))
                    }
                }
            }

            fretboard = fretboard.slice(1)
            curSolution.push(null)
        }

        const isCusSolutionEmpty = curSolution.every((v) => v === null)
        if (!isCusSolutionEmpty) {
            solutions.push(curSolution)
        }

        return solutions
    }

    return helper(fretboard, chord)
}
