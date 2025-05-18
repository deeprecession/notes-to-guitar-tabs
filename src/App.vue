<script setup lang="ts">
import { ref } from "vue"
import MusicSheetContainer, {
    type MusicSheetNotes,
} from "./components/MusicSheet/MusicSheetContainer.vue"
import TabComponent from "./components/TabComponent/TabComponent.vue"
import {
    convertChordSequence,
    type ChordSequence,
    type Tab,
} from "./utils/notesToTabsAlgorithm/NotesToTabsConverter"
import { standardTuning } from "./utils/notesToTabsAlgorithm/GuitarTuning"
import { computeFretboard } from "./utils/notesToTabsAlgorithm/GuitarFretboard"
import type { Pitch } from "./utils/notesToTabsAlgorithm/Pitch"

const tabs = ref<Tab[]>([])
const notes = ref<MusicSheetNotes>([{}])

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
    console.log(sequence)
    const fretboard = computeFretboard(standardTuning)

    tabs.value = convertChordSequence(fretboard, sequence)
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
    <TabComponent :tabs="tabs" />
</template>

<style lang="css" scoped></style>
