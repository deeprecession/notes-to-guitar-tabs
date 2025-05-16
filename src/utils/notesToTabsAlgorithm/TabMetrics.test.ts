import { describe, expect, it } from "vitest"
import { type Chord, type Tab, type TabSolutionMetrics } from "./NotesToTabsConverter"
import { calculateMetricsForTab } from "./TabMetrics"

describe("calculate metrics for tab", () => {
    it("should handle empty input", () => {
        const tab: Tab = []
        const chord: Chord = []

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabSolutionMetrics = {
            firstFret: 0,
            fretSpan: 0,
            pitchesFailed: 0,
            tab: [],
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should calculate right metrics", () => {
        const tab: Tab = [1, 3, 5]
        const chord: Chord = ["C0", "G#0", "G#1"]

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabSolutionMetrics = {
            firstFret: 1,
            fretSpan: 4,
            pitchesFailed: 0,
            tab: tab,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should handle empty chord", () => {
        const tab: Tab = [1, 3, 5]
        const chord: Chord = []

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabSolutionMetrics = {
            firstFret: 1,
            fretSpan: 4,
            pitchesFailed: 0,
            tab: tab,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should handle open stings", () => {
        const tab: Tab = [1, 3, 5, 0]
        const chord: Chord = ["C0", "G#0", "G#1", "C0"]

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabSolutionMetrics = {
            firstFret: 1,
            fretSpan: 4,
            pitchesFailed: 0,
            tab: tab,
        }
        expect(metrics).to.deep.equal(expected)
    })

    it("should handle input of only open stings", () => {
        const tab: Tab = [0]
        const chord: Chord = ["C0"]

        const metrics = calculateMetricsForTab(tab, chord)

        const expected: TabSolutionMetrics = {
            firstFret: 0,
            fretSpan: 0,
            pitchesFailed: 0,
            tab: tab,
        }
        expect(metrics).to.deep.equal(expected)
    })
})
