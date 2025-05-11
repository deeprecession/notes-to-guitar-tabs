<script setup lang="ts">
import { computed, ref, useCssModule, type StyleValue } from "vue"
import Note from "./Note.vue"
import type { BarRowNotes } from "./MusicSheet.vue"

const props = defineProps<{
    hasLine: boolean
    noteWidth: number
    barRowNotes: BarRowNotes
    columnsNum: number
    height: number
}>()

const emit = defineEmits<{
    (e: "add-note", col: number): void
}>()

const width = computed(() => props.columnsNum * props.noteWidth)

function onClick(e: MouseEvent) {
    const clickedColumn = getColumnUnderMouseCursor(e)
    emit("add-note", clickedColumn)
}

function getColumnUnderMouseCursor(e: MouseEvent) {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left

    if (x <= 0) {
        return 0
    }

    if (x >= target.offsetWidth) {
        return props.columnsNum - 1
    }

    const colClick = Math.floor((x * props.columnsNum) / target.offsetWidth)

    if (colClick >= props.columnsNum) {
        return props.columnsNum - 1
    }

    return colClick
}

function getNoteXShift(col: number) {
    const halfColumnShift = (width.value / props.columnsNum) * 0.5
    const nColumnsShift = (width.value * col) / props.columnsNum
    return halfColumnShift + nColumnsShift
}

function getNoteYShift() {
    return props.height
}

const isGhostNoteShown = ref(false)
const ghostNoteCol = ref(0)

// TODO: add throttle
function updateGhostNote(e: MouseEvent) {
    isGhostNoteShown.value = true
    ghostNoteCol.value = getColumnUnderMouseCursor(e)
}

function hideGhostNote() {
    isGhostNoteShown.value = false
}

const classes = useCssModule()

function lineClass() {
    return {
        [classes.container]: true,
        [classes.horizontalLine]: props.hasLine,
    }
}
function lineStyles(): StyleValue {
    return [{ width: width + "px", height: props.height + "px" }]
}
</script>

<template>
    <div
        ref="lineElem"
        :style="lineStyles()"
        :class="lineClass()"
        @mousemove="updateGhostNote"
        @mouseout="hideGhostNote"
        @click="onClick"
    >
        <Note
            v-for="(_, col) in barRowNotes"
            ref="noteElem"
            :key="col"
            :class="$style.note"
            :x="getNoteXShift(col)"
            :y="getNoteYShift()"
        />
        <Note
            v-if="isGhostNoteShown"
            :class="$style.note"
            :x="getNoteXShift(ghostNoteCol)"
            :y="getNoteYShift()"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    position: relative;
    height: 100%;
    width: 100%;
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
