import type { Chord, Tab, TabSolutionMetrics } from "./NotesToTabsConverter"

export function calculateMetricsForTab(tab: Tab, chordPlayed: Chord): TabSolutionMetrics {
    const fretted = tab.filter((fret): fret is number => fret !== null)

    const frettedWithoutOpenString = fretted.filter((fret) => fret !== 0)
    const firstFret =
        frettedWithoutOpenString.length > 0 ? Math.min(...frettedWithoutOpenString) : 0
    const lastFret = frettedWithoutOpenString.length > 0 ? Math.max(...frettedWithoutOpenString) : 0
    const fretSpan = lastFret - firstFret

    const pitchesPlayed = fretted.length
    const pitchesFailed = Math.max(0, chordPlayed.length - pitchesPlayed)

    return { tab, firstFret, fretSpan, pitchesFailed }
}
