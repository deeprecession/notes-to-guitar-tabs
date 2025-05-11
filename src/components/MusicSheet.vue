<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue"
import Bar from "./Bar.vue"

export type BarRowNotes = Record<number, boolean>
export type BarNotes = Record<number, BarRowNotes>
export type MusicSheetNotes = BarNotes[]

const notes = ref<MusicSheetNotes>([])

function handleAddNote(bar: number, line: number, col: number) {
    if (notes.value[bar] === undefined) {
        notes.value[bar] = {}
    }

    if (notes.value[bar][line] === undefined) {
        notes.value[bar][line] = {}
    }

    notes.value[bar][line][col] = true
}

const sheet = useTemplateRef("sheet")
const observer = new ResizeObserver(() => {
    if (!sheet.value) {
        return
    }

    noteWidth.value = Math.floor(sheet.value.scrollWidth / NOTE_COLS / BARS_PER_ROW)
})

onMounted(() => {
    if (!sheet.value) {
        throw new Error(`failed to start check size of MusicSheet`)
    }
    observer.observe(sheet.value)
})

onUnmounted(() => {
    observer.disconnect()
})

const NOTE_COLS = 16
const BARS_PER_ROW = 2

const NOTE_HEIGHT = 15
const NOTE_ROWS = 27

const noteWidth = ref(0)
</script>

<template>
    <div
        ref="sheet"
        :class="$style.container"
    >
        <Bar
            v-for="(barNotes, barInx) in notes"
            :barNotes="barNotes"
            :note-width="noteWidth"
            :columns-num="NOTE_COLS"
            :note-height="NOTE_HEIGHT"
            @add-note="(line, col) => handleAddNote(barInx, line, col)"
        />

        <button
            :style="{ height: NOTE_HEIGHT * NOTE_ROWS + 'px' }"
            :class="$style['add-bar-btn']"
            @click="notes.push({})"
        >
            Add Bar
        </button>
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0px;
    column-gap: 0px;
}

.add-bar-btn {
    height: 100%;
}
</style>
