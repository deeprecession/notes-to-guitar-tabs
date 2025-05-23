<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import MusicSheetContainer, {
    type MusicSheetNotes,
} from "./components/MusicSheet/MusicSheetContainer.vue"
import TabComponent from "./components/TabComponent/TabComponent.vue"
import {
    getAllWaysToPlayChordSequence,
    type ChordSequence,
} from "./utils/notesToTabsAlgorithm/NotesToTabsConverter"
import { standardTuning } from "./utils/notesToTabsAlgorithm/GuitarTuning"
import { computeFretboard } from "./utils/notesToTabsAlgorithm/GuitarFretboard"
import type { Pitch } from "./utils/notesToTabsAlgorithm/Pitch"
import type { FinedTab } from "./utils/notesToTabsAlgorithm/TabMetrics"

const tabs = ref<FinedTab[][]>([])
const notes = ref<MusicSheetNotes>([{}])

watch(
    notes,
    (newNotes) => {
        localStorage.setItem("musicSheetNotes", JSON.stringify(newNotes))
    },
    { deep: true }
)

onMounted(() => {
    const storedNotes = localStorage.getItem("musicSheetNotes")
    if (storedNotes) {
        try {
            const parsed = JSON.parse(storedNotes)
            notes.value = parsed
        } catch (e) {
            console.error("Failed to parse stored notes", e)
        }
    }
})

const BAR_COLS = 16

function musicSheetToTab(sheet: MusicSheetNotes): ChordSequence {
    const chordSequence: ChordSequence = Array.from({ length: sheet.length * BAR_COLS }, () => [])

    for (let barInx = 0; barInx < sheet.length; barInx++) {
        const bar = sheet[barInx]

        Object.entries(bar).forEach(([rowInx, row]) => {
            Object.entries(row).forEach(([col]) => {
                const colInx = Number(col)

                const chordInx = colInx + barInx * BAR_COLS
                chordSequence[chordInx].push(rowInx as Pitch)
            })
        })
    }

    return chordSequence
}

function convertToTabs() {
    const sequence = musicSheetToTab(notes.value)
    const fretboard = computeFretboard(standardTuning)

    tabs.value = getAllWaysToPlayChordSequence(fretboard, sequence)
    console.log(tabs.value)
}
</script>

<template>
    <h1>Music sheet</h1>
    <MusicSheetContainer
        :note-cols="BAR_COLS"
        :model-value="notes"
    />

    <h1>Tabs</h1>
    <button @click="convertToTabs">convert to tabs</button>
    <TabComponent
        :tabs="tabs"
        :guitar-tuning="standardTuning"
    />
</template>

<style lang="css" scoped></style>
