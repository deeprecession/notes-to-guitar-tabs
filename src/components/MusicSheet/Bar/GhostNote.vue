<script setup lang="ts">
import { inject } from "vue"
import { defaultNoteFraction, type NoteFraction } from "../noteFractions"
import NoteImg from "./NoteImg.vue"

const props = defineProps<{
    row: number
    col: number
    rows: number
    cols: number
}>()

const noteFraction = inject<NoteFraction>("noteFraction", defaultNoteFraction)

function notePositionStyle() {
    return {
        left: `${(props.col / props.cols) * 100}%`,
        top: `${(props.row / props.rows) * 100}%`,
        width: `${100 / props.cols}%`,
        height: `${100 / props.rows}%`,
    }
}
</script>

<template>
    <div :class="$style.container">
        <div
            :style="notePositionStyle()"
            :class="$style['note']"
        >
            <NoteImg :note-fraction="noteFraction" />
        </div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 50%;
}
.note {
    position: absolute;
}
</style>
