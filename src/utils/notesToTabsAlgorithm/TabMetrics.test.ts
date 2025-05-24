import { describe, expect, it } from "vitest"
import { type Chord, type Tab } from "./NotesToTabsConverter"
import {
    calculateMetricsForTab,
    rankTabs,
    type TabMetrics,
    type TabWithMetrics,
} from "./TabMetrics"
import _ from "lodash"

describe("rank tabs", () => {
    it("should calculate no fine", () => {
        const tab: Tab = [0, 0]
        const metrics: TabMetrics = { firstFret: 0, fretSpan: 0, pitchesMissed: 0 }
        const tabWithMetrics: TabWithMetrics = _.extend(tab, metrics)
        const params = {
            maxSpan: 4,
            pitchMissedFine: 100,
            spanFine: 10,
            previousTabPosition: null,
            fretShiftFine: 1,
        }

        const ranked = rankTabs([tabWithMetrics], params)

        const expectedFine = 0
        expect(ranked[0].fine).to.deep.equal(expectedFine)
    })

    it("should handle correct fret span", () => {
        const tab: Tab = [1, 5]
        const metrics: TabMetrics = { firstFret: 1, fretSpan: 4, pitchesMissed: 0 }
        const tabWithMetrics: TabWithMetrics = _.extend(tab, metrics)

        const params = {
            maxSpan: 4,
            pitchMissedFine: 100,
            spanFine: 10,
            previousTabPosition: null,
            fretShiftFine: 1,
        }
        const ranked = rankTabs([tabWithMetrics], params)

        const expectedFine = 0
        expect(ranked[0].fine).to.equal(expectedFine)
    })

    it("should handle out of fret span and missed pitches", () => {
        const tab: Tab = [1, 5]
        const metrics: TabMetrics = { firstFret: 1, fretSpan: 6, pitchesMissed: 1 }
        const tabWithMetrics: TabWithMetrics = _.extend(tab, metrics)

        const params = {
            maxSpan: 4,
            pitchMissedFine: 100,
            spanFine: 10,
            previousTabPosition: null,
            fretShiftFine: 1,
        }
        const ranked = rankTabs([tabWithMetrics], params)

        const expectedFine = 120
        expect(ranked[0].fine).to.equal(expectedFine)
    })

    it("should sort by fine", () => {
        const tab1: Tab = [1, 5]
        const metrics1: TabMetrics = { firstFret: 1, fretSpan: 8, pitchesMissed: 1 }
        const tabWithMetrics1: TabWithMetrics = _.extend(tab1, metrics1)

        const tab2: Tab = [1, 5]
        const metrics2: TabMetrics = { firstFret: 1, fretSpan: 6, pitchesMissed: 1 }
        const tabWithMetrics2: TabWithMetrics = _.extend(tab2, metrics2)

        const tab3: Tab = [1, 5]
        const metrics3: TabMetrics = { firstFret: 1, fretSpan: 4, pitchesMissed: 1 }
        const tabWithMetrics3: TabWithMetrics = _.extend(tab3, metrics3)

        const params = {
            maxSpan: 4,
            pitchMissedFine: 100,
            spanFine: 10,
            previousTabPosition: null,
            fretShiftFine: 1,
        }
        const ranked = rankTabs([tabWithMetrics1, tabWithMetrics2, tabWithMetrics3], params)

        expect(ranked[0].fine).to.equal(100)
        expect(ranked[1].fine).to.equal(120)
        expect(ranked[2].fine).to.equal(140)
    })

    it("if next string is open string then fine for", () => {
        const tab: Tab = [4, 0]
        const metrics: TabMetrics = { firstFret: 0, fretSpan: 0, pitchesMissed: 0 }
        const tabWithMetrics: TabWithMetrics = _.extend(tab, metrics)

        const params = {
            maxSpan: 4,
            pitchMissedFine: 100,
            spanFine: 10,
            previousTabPosition: null,
            fretShiftFine: 1,
        }
        const ranked = rankTabs([tabWithMetrics], params)

        const expectedFine = 0
        expect(ranked[0].fine).to.equal(expectedFine)
    })
})

describe("calculate metrics for tab", () => {
    it("should handle empty input", () => {
        const tab: Tab = []
        const chord: Chord = []

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabMetrics = {
            firstFret: 0,
            fretSpan: 0,
            pitchesMissed: 0,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should calculate right metrics", () => {
        const tab: Tab = [1, 3, 5]
        const chord: Chord = ["C0", "G#0", "G#1"]

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabMetrics = {
            firstFret: 1,
            fretSpan: 4,
            pitchesMissed: 0,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should handle empty chord", () => {
        const tab: Tab = [1, 3, 5]
        const chord: Chord = []

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabMetrics = {
            firstFret: 1,
            fretSpan: 4,
            pitchesMissed: 0,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should handle open stings", () => {
        const tab: Tab = [1, 3, 5, 0]
        const chord: Chord = ["C0", "G#0", "G#1", "C0"]

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabMetrics = {
            firstFret: 1,
            fretSpan: 4,
            pitchesMissed: 0,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should handle input of only open stings", () => {
        const tab: Tab = [0]
        const chord: Chord = ["C0"]

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabMetrics = {
            firstFret: 0,
            fretSpan: 0,
            pitchesMissed: 0,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should handle zero fret span", () => {
        const tab: Tab = [3, 3]
        const chord: Chord = ["C0", "G#0"]

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabMetrics = {
            firstFret: 3,
            fretSpan: 0,
            pitchesMissed: 0,
        }
        expect(metrics).to.deep.equal(expected)
    })
})
