<script setup lang="ts">
import { inject, ref, type CSSProperties, type Ref } from "vue"
import type { Pitch } from "../../../entities/Pitch"
import type { BarNotes } from "../MusicSheetContainer.vue"
import NoteImg from "./NoteImg.vue"
import type { InteractionMode } from "../MusicSheetControls.vue"

const props = defineProps<{ notes: BarNotes; pitches: Pitch[]; rows: number; cols: number }>()

defineEmits<{
    (e: "remove-note", payload: { col: number; pitch: Pitch }): void
}>()

const mode = inject<Ref<InteractionMode>>("interaction-mode", ref("insert"))

function notePositionStyle(pitch: Pitch, col: number): CSSProperties {
    const row = props.pitches.indexOf(pitch)
    return {
        left: `${(col / props.cols) * 100}%`,
        top: `${(row / props.rows) * 100}%`,
        width: `${100 / props.cols}%`,
        height: `${100 / props.rows}%`,
        opacity: mode.value === "remove" ? "50%" : "100%",
    } satisfies CSSProperties
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
}

.note {
    position: absolute;
    pointer-events: none;
}
</style>
