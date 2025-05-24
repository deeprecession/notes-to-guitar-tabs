import _ from "lodash"
import type { Fretboard } from "./GuitarFretboard"
import type { Pitch } from "./Pitch"
import {
    calculateMetricsForTab,
    defaultRankTabsParams,
    rankTabs,
    type FinedTab,
    type TabMetrics,
} from "./TabMetrics"

export type Tab = (number | null)[]

export type Chord = Pitch[]
export type ChordSequence = Chord[]

export function getTheBestWayToPlayChordSequence(
    fretboard: Fretboard,
    sequence: ChordSequence
): TabMetrics[] {
    return sequence.map((chord) => convertChord(fretboard, chord))
}

function convertChord(fretboard: Fretboard, chord: Chord): TabMetrics {
    const possibleTabs = findAllTabsForChord(fretboard, chord)
    const metrics = possibleTabs.map((tab) => {
        const tabMetrics = calculateMetricsForTab(tab, chord)
        return _.extend(tab, tabMetrics)
    })
    const rankedTabs = rankTabs(metrics)
    return rankedTabs[0] || []
}

export function getAllWaysToPlayChordSequence(
    fretboard: Fretboard,
    sequence: ChordSequence
): FinedTab[][] {
    let prevTabPosition: number | null = null
    return sequence.map((chord) => {
        const tab = getAllPosibleWaysToPlayChord(fretboard, chord, prevTabPosition)

        if (tab[0].firstFret) {
            prevTabPosition = tab[0].firstFret
        }

        return tab
    })
}

function getAllPosibleWaysToPlayChord(
    fretboard: Fretboard,
    chord: Chord,
    previousTabPosition: number | null = null
): FinedTab[] {
    const possibleTabs = findAllTabsForChord(fretboard, chord)
    const metrics = possibleTabs.map((tab) => {
        const tabMetrics = calculateMetricsForTab(tab, chord)
        return _.extend(tab, tabMetrics)
    })
    const rankedTabs = rankTabs(metrics, { ...defaultRankTabsParams, previousTabPosition })
    return rankedTabs
}

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

    return helper(fretboard, chord).reverse()
}
