<script setup lang="ts">
import type { Pitch } from "../../entities/Pitch"
import Bar from "./Bar/Bar.vue"
import type { MusicSheetNotes } from "./MusicSheetContainer.vue"

defineProps<{ noteColumns: number; notes: MusicSheetNotes }>()
defineEmits<{
    (e: "add-note", payload: { barInx: number; pitch: Pitch; col: number }): void
    (e: "remove-note", payload: { barInx: number; pitch: Pitch; col: number }): void
}>()
</script>

<template>
    <div
        ref="sheet"
        :class="[$style.container, $style.paperSheet]"
    >
        <Bar
            v-for="(barNotes, barInx) in notes"
            :notes="barNotes"
            :class="$style.bar"
            @add-note="({ pitch, col }) => $emit('add-note', { barInx, pitch, col })"
            @remove-note="({ pitch, col }) => $emit('remove-note', { barInx, pitch, col })"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));

    align-self: stretch;

    justify-content: stretch;

    padding: 1rem;

    row-gap: 2rem;
}

.paperSheet {
    background: #f0f1c5;
    padding: 2rem;
    box-shadow:
        0 1px 1px rgba(0, 0, 0, 0.15),
        0 2px 2px rgba(0, 0, 0, 0.15),
        0 4px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #e8e0d0;
}

.add-bar-btn {
    padding: 8px 16px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #45a049;
    }
}

.bar {
    flex: 1;
    min-width: 320px;
    min-height: 220px;
}
</style>
