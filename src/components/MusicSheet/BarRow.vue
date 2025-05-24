<script setup lang="ts">
import {
    inject,
    onMounted,
    onUnmounted,
    ref,
    useCssModule,
    useTemplateRef,
    type Component,
    type Ref,
} from "vue"
import Note from "./Note.vue"
import type { BarRowNotes } from "./MusicSheetContainer.vue"
import type { InteractionMode } from "./MusicSheetControls.vue"

const mode = inject<Ref<InteractionMode>>("interaction-mode", ref("insert"))

const props = defineProps<{
    hasLine: boolean
    barRowNotes: BarRowNotes
    columnsNum: number
}>()

const emit = defineEmits<{
    (e: "add-note", col: number): void
    (e: "remove-note", col: number): void
}>()

const noteWidth = ref(0)
const width = ref(0)

const lineElem = useTemplateRef("lineElem")
const observer = new ResizeObserver(() => {
    if (!lineElem.value) {
        return
    }

    width.value = lineElem.value.scrollWidth
    noteWidth.value = Math.floor(width.value / props.columnsNum)
})

onMounted(() => {
    if (!lineElem.value) {
        throw new Error(`failed to start check size of MusicSheet`)
    }
    observer.observe(lineElem.value)
})

onUnmounted(() => {
    observer.disconnect()
})

function onClick(e: MouseEvent) {
    const clickedColumn = getColumnUnderMouseCursor(e)

    if (mode.value === "remove") {
        emit("remove-note", clickedColumn)
    } else {
        emit("add-note", clickedColumn)
    }
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
    if (lineElem.value) {
        return lineElem.value?.offsetHeight * 1.5
    }
    return 0
}

const isGhostNoteShown = ref(false)
const ghostNoteCol = ref(0)

// TODO: add throttle
function onMouseMove(e: MouseEvent) {
    if (mode.value === "remove") return

    isGhostNoteShown.value = true
    ghostNoteCol.value = getColumnUnderMouseCursor(e)
}

function onMouseOut() {
    isGhostNoteShown.value = false
}

const classes = useCssModule()

function lineClass() {
    return {
        [classes.container]: true,
        [classes.horizontalLine]: props.hasLine,
    }
}

const BaseNote = inject<Component>("BaseNote")
</script>

<template>
    <div
        ref="lineElem"
        :class="lineClass()"
        @mousemove="onMouseMove"
        @mouseout="onMouseOut"
        @click="onClick"
    >
        <Note
            v-for="(note, col) in barRowNotes"
            ref="noteElem"
            :key="col"
            :class="[$style.note, { [$style['note-remove-mode']]: mode === 'remove' }]"
            :x="getNoteXShift(col)"
            :y="getNoteYShift()"
            :col="col"
            @remove-note="$emit('remove-note', col)"
        >
            <component :is="note.componentPath" />
        </Note>
        <Note
            v-if="isGhostNoteShown"
            :class="[$style.note, $style['ghost-note']]"
            :x="getNoteXShift(ghostNoteCol)"
            :y="getNoteYShift()"
            :col="ghostNoteCol"
        >
            <component :is="BaseNote" />
        </Note>
    </div>
</template>

<style lang="css" scoped module>
.container {
    position: relative;
    height: 15px;
    cursor: pointer;
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

.note-remove-mode {
    background-color: red;
}

.note {
    transform: translate(-25%, -100%);
    z-index: -10;
}

.ghost-note {
    opacity: 0.6;
}
</style>
