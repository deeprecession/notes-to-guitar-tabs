<script setup lang="ts">
import { ref } from "vue"
import { getCellAtPoint } from "./gridGeometry"
import { useSizeObserver } from "../../../composables/sizeObserver"

const props = defineProps<{ cols: number; rows: number }>()

const gridContainer = ref<HTMLElement | null>(null)

const { scrollWidth: containerWidth, scrollHeight: containerHeight } =
    useSizeObserver(gridContainer)

function onMouseMove(e: MouseEvent) {
    if (!gridContainer.value) return

    const bounds = gridContainer.value.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    updateHoverCell(x, y)
}

const hoverCell = ref({ isShown: false, x: 0, y: 0, width: 0, height: 0 })

function updateHoverCell(x: number, y: number) {
    const cell = {
        ...getCellAtPoint(
            {
                cols: props.cols,
                rows: props.rows,
                width: containerWidth.value,
                height: containerHeight.value,
            },
            x,
            y
        ),
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
</script>

<template>
    <div
        ref="gridContainer"
        :class="$style.container"
        @mousemove="onMouseMove"
        @mouseleave="onMouseOut"
    >
        <div
            v-show="hoverCell.isShown"
            :style="{
                top: `${hoverCell.y}px`,
                height: `${hoverCell.height}px`,
            }"
            :class="$style['highlighted-cell']"
        ></div>
        <div
            v-show="hoverCell.isShown"
            :style="{
                left: `${hoverCell.x}px`,
                width: `${hoverCell.width}px`,
            }"
            :class="$style['highlighted-cell']"
        ></div>

        <slot></slot>
    </div>
</template>

<style lang="css" scoped module>
.container {
    width: 100%;
    height: 100%;

    position: relative;
}

.highlighted-cell {
    position: absolute;
    background-color: mediumseagreen;
    opacity: 25%;
    width: 100%;
    height: 100%;
}
</style>
