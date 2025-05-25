<script setup lang="ts">
import { computed, ref } from "vue"
import { getCellAtPoint } from "./gridGeometry"
import { type BarNotes } from "./MusicSheetContainer.vue"
import type { Pitch } from "../../entities/Pitch"
import { useSizeObserver } from "../../composables/sizeObserver"
import CellHighlight from "./CellHighlight.vue"

defineProps<{ notes: BarNotes }>()

const emit = defineEmits<{
    (e: "add-note", pitch: Pitch, col: number): void
}>()

const pitches: Pitch[] = [
    "E5",
    "D5",
    "C5",
    "B4",
    "A4",
    "G4",
    "F4",
    "E4",
    "D4",
    "C4",
    "B3",
    "A3",
    "G3",
    "F3",
    "E3",
    "D3",
    "C3",
    "B2",
    "A2",
    "G2",
    "F2",
    "E2",
]

const cols = 16

const gridContainer = ref<HTMLElement | null>(null)

const { scrollWidth: containerWidth, scrollHeight: containerHeight } =
    useSizeObserver(gridContainer)

const rows = pitches.length
const rowsAboveStaff = (rows - 9) / 2
const rowHeight = computed(() => containerHeight.value / rows)
const startY = computed(() => rowsAboveStaff * rowHeight.value)

function notePositionStyle(pitch: Pitch, col: number) {
    const row = pitches.indexOf(pitch)
    return {
        left: `${(col / cols) * 100}%`,
        top: `${(row / rows) * 100}%`,
        width: `${100 / cols}%`,
        height: `${100 / rows}%`,
    }
}

function addNoteUnderMouse(e: MouseEvent) {
    if (!gridContainer.value) return

    const bounds = gridContainer.value.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    const { col, row } = getCellAtPoint(
        { cols, rows, width: containerWidth.value, height: containerHeight.value },
        x,
        y
    )
    const pitch = pitches[row]

    emit("add-note", pitch, col)
}

function onMouseClick(e: MouseEvent) {
    addNoteUnderMouse(e)
}
</script>

<template>
    <div
        ref="gridContainer"
        :class="$style.container"
        @click="onMouseClick"
    >
        <CellHighlight
            :cols="cols"
            :rows="rows"
        >
            <div
                v-for="i in 5"
                :class="$style['line-container']"
                :style="{
                    top: startY + 2 * (i - 1) * rowHeight - 1 + 'px',
                    height: rowHeight + 'px',
                }"
            >
                <div :class="$style.line"></div>
            </div>

            <template v-for="(barNotes, pitch) in notes">
                <div
                    v-for="(_, col) in barNotes"
                    :style="notePositionStyle(pitch, col)"
                    :class="$style['cell']"
                ></div>
            </template>
        </CellHighlight>
    </div>
</template>

<style lang="css" scoped module>
.container {
    width: 100%;
    height: 100%;

    position: relative;
    border: 1px solid black;

    overflow: hidden;
}

.line-container {
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
}

.line {
    position: absolute;
    height: 3px;
    width: 100%;
    background: black;
    transform: translateY(50%);
}

.cell {
    position: absolute;
    background-color: black;
}
</style>
