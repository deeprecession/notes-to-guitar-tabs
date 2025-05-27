<script setup lang="ts">
import type { Pitch } from "../../entities/Pitch"
import Bar from "./Bar/Bar.vue"
import type { BarNotes, MusicSheetNotes } from "./MusicSheetContainer.vue"
import type { FinedTab } from "../../utils/notesToTabsAlgorithm/TabMetrics"
import type { ChordSequence } from "../../entities/ChordSequence"
import { standardTuning } from "../../entities/GuitarTuning"
import { computeFretboard } from "../../entities/fretboard/Fretboard"
import { getAllWaysToPlayChordSequence } from "../../utils/notesToTabsAlgorithm/NotesToTabsConverter"
import Tab from "./Tab/Tab.vue"

const props = defineProps<{ noteColumns: number; notes: MusicSheetNotes }>()
defineEmits<{
    (e: "add-note", payload: { barInx: number; pitch: Pitch; col: number }): void
    (e: "remove-note", payload: { barInx: number; pitch: Pitch; col: number }): void
}>()

function musicSheetToTab(bar: BarNotes): ChordSequence {
    const chordSequence: ChordSequence = Array.from({ length: props.noteColumns }, () => [])

    Object.entries(bar).forEach(([rowInx, row]) => {
        Object.entries(row).forEach(([col]) => {
            const colInx = Number(col)

            const chordInx = colInx
            chordSequence[chordInx].push(rowInx as Pitch)
        })
    })

    return chordSequence
}

function convertToTabs(notes: BarNotes): FinedTab[][] {
    const sequence = musicSheetToTab(notes)
    const fretboard = computeFretboard(standardTuning)

    return getAllWaysToPlayChordSequence(fretboard, sequence)
}
</script>

<template>
    <div
        ref="sheet"
        :class="[$style.container, $style.paperSheet]"
    >
        <div
            v-for="(barNotes, barInx) in notes"
            :class="$style['bar-tab-col']"
        >
            <Bar
                :notes="barNotes"
                :class="$style.bar"
                @add-note="({ pitch, col }) => $emit('add-note', { barInx, pitch, col })"
                @remove-note="({ pitch, col }) => $emit('remove-note', { barInx, pitch, col })"
            />
            <Tab
                :tabs="convertToTabs(barNotes)"
                :guitar-tuning="standardTuning"
                :class="$style.tab"
            />
        </div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));

    align-self: stretch;

    justify-content: stretch;

    padding: 1rem;

    row-gap: 2rem;
}

.paperSheet {
    background: #f0f1c5;
    padding: 2rem;
    box-shadow:
        0 1px 1px rgba(0, 0, 0, 0.15),
        0 2px 2px rgba(0, 0, 0, 0.15),
        0 4px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #e8e0d0;
}

.add-bar-btn {
    padding: 8px 16px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #45a049;
    }
}

.bar-tab-col {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;

    gap: 2rem;
}

.bar {
    min-width: 320px;
    min-height: 220px;
}
</style>
