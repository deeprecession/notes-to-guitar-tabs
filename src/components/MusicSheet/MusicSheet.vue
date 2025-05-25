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
        :class="$style.container"
    >
        <!-- <Bar -->
        <!--     v-for="(barNotes, barInx) in notes" -->
        <!--     :barNotes="barNotes" -->
        <!--     :class="$style.bar" -->
        <!--     :columns-num="noteColumns" -->
        <!--     @add-note="(pitch, col) => $emit('add-note', { barInx, pitch, col })" -->
        <!--     @remove-note="(pitch, col) => $emit('remove-note', { barInx, pitch, col })" -->
        <!-- /> -->

        <Bar
            v-for="(barNotes, barInx) in notes"
            :notes="barNotes"
            :class="$style.bar"
            @add-note="(pitch, col) => $emit('add-note', { barInx, pitch, col })"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));

    align-self: stretch;

    justify-content: stretch;

    row-gap: 2rem;
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
    min-width: 300px;
    min-height: 180px;
}
</style>
