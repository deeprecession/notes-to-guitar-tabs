import _ from "lodash"
import type { Tab } from "../../entities/Tab"
import type { Chord } from "../../entities/ChordSequence"

export type TabMetrics = {
    firstFret: number

    fretSpan: number
    pitchesMissed: number
}

export function calculateMetricsForTab(tab: Tab, chordPlayed: Chord): TabMetrics {
    const fretted = tab.filter((fret): fret is number => fret !== null)

    const frettedWithoutOpenString = fretted.filter((fret) => fret !== 0)
    const firstFret =
        frettedWithoutOpenString.length > 0 ? Math.min(...frettedWithoutOpenString) : 0
    const lastFret = frettedWithoutOpenString.length > 0 ? Math.max(...frettedWithoutOpenString) : 0
    const fretSpan = lastFret - firstFret

    const pitchesPlayed = fretted.length
    const pitchesFailed = Math.max(0, chordPlayed.length - pitchesPlayed)

    return { firstFret, fretSpan, pitchesMissed: pitchesFailed }
}

type RankTabsParams = {
    maxSpan: number

    pitchMissedFine: number
    spanFine: number

    previousTabPosition: number | null
    fretShiftFine: number
}

export const defaultRankTabsParams: RankTabsParams = {
    maxSpan: 4,
    pitchMissedFine: 100,
    spanFine: 10,
    previousTabPosition: null,
    fretShiftFine: 1,
}

export type TabWithMetrics = Tab & TabMetrics

export type FinedTab = TabWithMetrics & {
    fine: number
}

export function rankTabs(
    tabs: TabWithMetrics[],
    params: RankTabsParams = defaultRankTabsParams
): FinedTab[] {
    return tabs
        .map((tabWithMetrics) => {
            const fine = calculateTabFine(tabWithMetrics, params)
            return _.extend(tabWithMetrics, { fine })
        })
        .sort((a, b) => a.fine - b.fine)
}

function calculateTabFine(
    metrics: TabMetrics,
    {
        maxSpan,
        pitchMissedFine,
        spanFine,
        previousTabPosition,
        fretShiftFine,
    }: RankTabsParams = defaultRankTabsParams
): number {
    const spanExeededOn = Math.max(0, metrics.fretSpan - maxSpan)

    let tabsShifted = 0
    if (previousTabPosition !== null && previousTabPosition !== 0 && metrics.firstFret !== 0) {
        tabsShifted = Math.abs(metrics.firstFret - previousTabPosition)
    }

    const fine =
        spanExeededOn * spanFine +
        pitchMissedFine * metrics.pitchesMissed +
        tabsShifted * fretShiftFine
    return fine
}
