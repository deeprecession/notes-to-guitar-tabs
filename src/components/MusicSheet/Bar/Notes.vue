<script setup lang="ts">
import type { Pitch } from "../../../entities/Pitch"
import type { BarNotes } from "../MusicSheetContainer.vue"
import NoteImg from "./NoteImg.vue"

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
    <div :class="$style.container">
        <template v-for="(barNotes, pitch) in notes">
            <div
                v-for="(noteFraction, col) in barNotes"
                :style="notePositionStyle(pitch, col)"
                :class="$style['note']"
            >
                <NoteImg :note-fraction="noteFraction" />
            </div>
        </template>
    </div>
</template>

<style lang="css" scoped module>
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.note {
    position: absolute;
}
</style>
