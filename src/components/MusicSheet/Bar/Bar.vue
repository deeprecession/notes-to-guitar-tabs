<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue"
import { getCellAtPoint } from "./gridGeometry"
import { type BarNotes } from "../MusicSheetContainer.vue"
import type { Pitch } from "../../../entities/Pitch"
import { useSizeObserver } from "../../../composables/sizeObserver"
import BarLines from "./BarLines.vue"
import HighlightOverlay from "./HighlightOverlay.vue"
import Notes from "./Notes.vue"
import LedgerLines from "./LedgerLines.vue"
import GhostNote from "./GhostNote.vue"
import type { InteractionMode } from "../MusicSheetControls.vue"

defineProps<{ notes: BarNotes }>()

const emit = defineEmits<{
    (e: "add-note", pitch: Pitch, col: number): void
}>()

const mode = inject<Ref<InteractionMode>>("interaction-mode", ref("insert"))

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

const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
    useSizeObserver(gridContainer)

const rows = pitches.length
const rowsAboveStaff = 6
const rowHeight = computed(() => containerHeight.value / rows)

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

function onMouseMove(e: MouseEvent) {
    if (!gridContainer.value) return

    const bounds = gridContainer.value.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    updateHoverCell(x, y)
}

const hoverCell = ref({ x: 0, y: 0, width: 0, height: 0, col: 0, row: 0 })
const isMouseOut = ref(true)

function updateHoverCell(x: number, y: number) {
    const cell = {
        ...getCellAtPoint(
            {
                cols: cols,
                rows: rows,
                width: containerWidth.value,
                height: containerHeight.value,
            },
            x,
            y
        ),
    }
    hoverCell.value = cell

    isMouseOut.value = false
}

function onMouseLeave() {
    isMouseOut.value = true
}
</script>

<template>
    <div
        ref="gridContainer"
        :class="$style.container"
        @click="onMouseClick"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
    >
        <BarLines
            :row-height="rowHeight"
            :rows-above-staff="rowsAboveStaff"
        />
        <HighlightOverlay
            v-show="!isMouseOut && mode === 'insert'"
            :area="hoverCell"
        />
        <Notes
            :notes="notes"
            :pitches="pitches"
            :rows="rows"
            :cols="cols"
        />
        <LedgerLines
            :notes="notes"
            :pitches="pitches"
            :rows="rows"
            :cols="cols"
            :row-height="rowHeight"
            :rows-above-staff="rowsAboveStaff"
            :hoveredCell="hoverCell"
            :is-hovered-cell-shown="!isMouseOut && mode === 'insert'"
        />
        <GhostNote
            v-show="!isMouseOut && mode === 'insert'"
            :rows="rows"
            :cols="cols"
            :row="hoverCell.row"
            :col="hoverCell.col"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    width: 100%;
    height: 100%;

    position: relative;
    border: 1px solid black;
}
</style>
