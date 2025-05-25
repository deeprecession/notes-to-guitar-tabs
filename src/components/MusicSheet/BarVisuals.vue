<script setup lang="ts">
import { ref } from "vue"
import { getCellAtPoint, getCellRect } from "./gridGeometry"
import { type BarNotes } from "./MusicSheetContainer.vue"
import type { Pitch } from "../../entities/Pitch"

defineProps<{ notes: BarNotes }>()

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

const width = 480
const height = 210
const rows = 22
const rowsAboveStaff = (rows - 9) / 2
const rowHeight = height / rows
const startY = rowsAboveStaff * rowHeight

const gridContainer = ref<HTMLElement | null>(null)

function onMouseMove(e: MouseEvent) {
    if (!gridContainer.value) return

    const bounds = gridContainer.value.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    updateHoverCell(x, y)
}

type HoverCell = {
    isShown: boolean
    x: number
    y: number
    width: number
    height: number
}

const hoverCell = ref<HoverCell>({ isShown: false, x: 0, y: 0, width: 0, height: 0 })

function updateHoverCell(x: number, y: number) {
    const cell: HoverCell = {
        ...getCellAtPoint({ cols, rows, width, height }, x, y),
        isShown: true,
    }
    hoverCell.value = cell
}

function hideHoverCell() {
    hoverCell.value.isShown = false
}

function onMouseOut() {
    hideHoverCell()
}

function notePositionStyle(pitch: Pitch, col: number) {
    const row = pitches.findIndex((v) => v === pitch)

    const cell = getCellRect({ width, rows, cols, height }, col, row)

    return {
        left: `${cell.x}px`,
        top: `${cell.y}px`,
        width: `${cell.width}px`,
        height: `${cell.height}px`,
    }
}
</script>

<template>
    <div
        ref="gridContainer"
        :style="{ width: width + 'px', height: height + 'px' }"
        :class="$style.container"
        @mousemove="onMouseMove"
        @mouseleave="onMouseOut"
    >
        <div
            v-for="i in 5"
            :class="$style['line-container']"
            :style="{ top: startY + 2 * (i - 1) * rowHeight - 1 + 'px', height: rowHeight + 'px' }"
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

        <div
            v-show="hoverCell.isShown"
            :style="{
                top: `${hoverCell.y}px`,
                height: `${hoverCell.height}px`,
            }"
            :class="$style['hover-cell']"
        ></div>
        <div
            v-show="hoverCell.isShown"
            :style="{
                left: `${hoverCell.x}px`,
                width: `${hoverCell.width}px`,
            }"
            :class="$style['hover-cell']"
        ></div>
    </div>
</template>

<style lang="css" scoped module>
.container {
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

.hover-cell {
    position: absolute;
    background-color: mediumseagreen;
    opacity: 25%;
    width: 100%;
    height: 100%;
}

.cell {
    position: absolute;
    background-color: black;
}
</style>
