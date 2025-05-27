<script setup lang="ts">
import { inject, ref, type CSSProperties, type Ref } from "vue"
import type { Pitch } from "../../../entities/Pitch"
import type { BarNotes } from "../MusicSheetContainer.vue"
import type { InteractionMode } from "../MusicSheetControls.vue"

const props = defineProps<{ notes: BarNotes; pitches: Pitch[]; rows: number; cols: number }>()

defineEmits<{
    (e: "remove-note", payload: { col: number; pitch: Pitch }): void
}>()

const mode = inject<Ref<InteractionMode>>("interaction-mode", ref("insert"))

function removeAreaStyle(pitch: Pitch, col: number): CSSProperties {
    const row = props.pitches.indexOf(pitch)
    return {
        left: `${(col / props.cols) * 100}%`,
        top: `${(row / props.rows) * 100}%`,
        width: `${100 / props.cols}%`,
        height: `${100 / props.rows}%`,
        cursor: mode.value === "remove" ? "pointer" : "unset",
        pointerEvents: mode.value === "remove" ? "auto" : "none",
        zIndex: mode.value === "remove" ? 10 : 0,
    } satisfies CSSProperties
}
</script>

<template>
    <div :class="$style.container">
        <template v-for="(barNotes, pitch) in notes">
            <div
                v-for="(_, col) in barNotes"
                v-show="mode === 'remove'"
                :style="removeAreaStyle(pitch, col)"
                :class="$style['remove-area']"
                @mouseup="$emit('remove-note', { col, pitch })"
            ></div>
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

.remove-area {
    position: absolute;
    background-color: red;
    opacity: 90%;
}
</style>
