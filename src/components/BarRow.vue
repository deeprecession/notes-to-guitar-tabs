<script setup lang="ts">
import { ref, useTemplateRef } from "vue"
import Note from "./Note.vue"

defineProps<{
    hasLine: boolean
}>()

const notes = ref<Record<number, null>>({})

const COLS = 16

function onClick(e: MouseEvent) {
    const colClick = getColFromMouseEvent(e)

    notes.value[colClick] = null
}

function getColFromMouseEvent(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left

    if (x < 0 || x >= target.offsetWidth) {
        throw new Error(`click X coordinate is out ouf bounce x=${x}`)
    }

    const colClick = Math.floor((x * COLS) / target.offsetWidth)

    if (colClick >= COLS) {
        return COLS - 1
    }

    return colClick
}

const lineElem = useTemplateRef("lineElem")

function getColXPos(col: number) {
    if (!lineElem.value) {
        throw new Error(`getColXPos: lineElement is not mounted`)
    }

    const halfColumnShift = (lineElem.value?.clientWidth / COLS) * 0.5

    return halfColumnShift + (lineElem.value?.clientWidth * col) / COLS
}

function getNoteYPos() {
    if (!lineElem.value) {
        throw new Error(`getColYPos: lineElement is not mounted`)
    }

    return 2 * lineElem.value?.clientHeight
}

function click(col: number) {
    delete notes.value[col]
}

const isGhostNoteShown = ref(false)
const ghostNoteCol = ref(0)

// TODO: add throttle
function updateGhostNote(e: MouseEvent) {
    isGhostNoteShown.value = true
    ghostNoteCol.value = getColFromMouseEvent(e)
}

function hideGhostNote() {
    isGhostNoteShown.value = false
}
</script>

<template>
    <div ref="lineElem" :class="[$style.container, hasLine && $style.horizontalLine]" @mousemove="updateGhostNote" @mouseout="hideGhostNote" @click="onClick">
        <Note v-for="(_, col) in notes" ref="noteElem" :key="col" :class="$style.note" :x="getColXPos(col)" :y="getNoteYPos()" @click="click(col)" />
        <Note v-if="isGhostNoteShown" :class="$style.note" :x="getColXPos(ghostNoteCol)" :y="getNoteYPos()" />
    </div>
</template>

<style lang="css" scoped module>
.container {
    position: relative;
    height: 100%;
}

.container:hover {
    background-color: #ffca84;
}

.container.horizontalLine::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    border-bottom: 2px solid #000;
    transform: translateY(-50%);
    width: 100%;
}

.note {
    transform: translate(-50%, -100%);
    z-index: -10;
}
</style>
