<script setup lang="ts">
import type { Pitch } from "../../../entities/Pitch"
import type { BarNotes } from "../MusicSheetContainer.vue"

const props = defineProps<{ notes: BarNotes; pitches: Pitch[]; rows: number; cols: number }>()

function notePositionStyle(pitch: Pitch, col: number) {
    const row = props.pitches.indexOf(pitch)
    return {
        left: `${(col / props.cols) * 100}%`,
        top: `${(row / props.rows) * 100}%`,
        width: `${100 / props.cols}%`,
        height: `${100 / props.rows}%`,
    }
}
</script>

<template>
    <template v-for="(barNotes, pitch) in notes">
        <div
            v-for="(_, col) in barNotes"
            :style="notePositionStyle(pitch, col)"
            :class="$style['note']"
        ></div>
    </template>
</template>

<style lang="css" scoped module>
.note {
    position: absolute;
    background-color: black;
}
</style>
