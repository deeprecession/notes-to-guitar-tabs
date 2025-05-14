<script setup lang="ts">
import { computed, markRaw, provide, ref, shallowRef } from "vue"
import Bar from "./Bar.vue"
import { defaultNoteFraction, type NoteFraction } from "./noteFractions"
import NoteFractionSelector from "./NoteFractionSelector.vue"

export type BarRowNotes = Record<number, NoteFraction>
export type BarNotes = Record<number, BarRowNotes>
export type MusicSheetNotes = BarNotes[]

const notes = ref<MusicSheetNotes>([{}, {}, {}, {}])

function handleAddNote(bar: number, line: number, col: number) {
    if (notes.value[bar] === undefined) {
        notes.value[bar] = {}
    }

    if (notes.value[bar][line] === undefined) {
        notes.value[bar][line] = {}
    }

    notes.value[bar][line][col] = selectedFraction.value
}

const selectedFraction = shallowRef<NoteFraction>(defaultNoteFraction)
provide(
    "BaseNote",
    computed(() => markRaw(selectedFraction.value.componentPath))
)

const NOTE_COLS = 16
</script>

<template>
    <NoteFractionSelector
        v-model="selectedFraction"
        @update:model-value="(newVal) => (selectedFraction = newVal)"
    />

    <button
        :class="$style['add-bar-btn']"
        @click="notes.push({})"
    >
        Add Bar
    </button>
    <div
        ref="sheet"
        :class="$style.container"
    >
        <Bar
            v-for="(barNotes, barInx) in notes"
            :barNotes="barNotes"
            :class="$style.bar"
            :columns-num="NOTE_COLS"
            @add-note="(line, col) => handleAddNote(barInx, line, col)"
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
}
</style>
