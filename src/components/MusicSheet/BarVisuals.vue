<script setup lang="ts">
import { ref } from "vue"
import { getCellAtPoint } from "./gridGeometry"
import { type BarNotes } from "./MusicSheetContainer.vue"

defineProps<{ notes: BarNotes }>()

// type Clef = {
//
// }
//
// type StaffConfig = {
//     clef: Clef
// }

const cols = 16

const width = 480
const height = 210
const rows = 21
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
    x: number
    y: number
    width: number
    height: number
}

const hoverCell = ref<HoverCell>({ x: 0, y: 0, width: 0, height: 0 })

function updateHoverCell(x: number, y: number) {
    const cell = getCellAtPoint({ cols, rows, width, height }, x, y)
    hoverCell.value = cell
}

// function notePositionStyle(pitch: Pitch, col: number) {
//     return {
//         left: `${hoverCell.x}px`,
//         top: `${hoverCell.y}px`,
//         width: `${hoverCell.width}px`,
//         height: `${hoverCell.height}px`,
//     }
// }
</script>

<template>
    <div
        ref="gridContainer"
        :style="{ width: width + 'px', height: height + 'px' }"
        :class="$style.container"
        @mousemove="onMouseMove"
    >
        <div
            v-for="i in 5"
            :class="$style['line-container']"
            :style="{ top: startY + 2 * (i - 1) * rowHeight - 1 + 'px', height: rowHeight + 'px' }"
        >
            <div :class="$style.line"></div>
        </div>

        <!-- <template v-for="barNotes in notes"> -->
        <!--     <div -->
        <!--         v-for="pitchNotes in barNotes" -->
        <!--         :style="notePositionStyle()" -->
        <!--         :class="$style['cell']" -->
        <!--     ></div> -->
        <!-- </template> -->

        <div
            :style="{
                top: `${hoverCell.y}px`,
                height: `${hoverCell.height}px`,
            }"
            :class="$style['hover-cell']"
        ></div>
        <div
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
