<script setup lang="ts">
import MusicSheet from "./MusicSheet.vue"
import MusicSheetControls from "./MusicSheetControls.vue"
import { computed, markRaw, provide, ref } from "vue"
import {
    defaultNoteFractionKey,
    noteFractionsMap,
    type NoteFraction,
    type NoteFractionKey,
} from "./noteFractions"
import type { Pitch } from "../../utils/notesToTabsAlgorithm/Pitch"

export type BarRowNotes = Record<number, NoteFraction>
export type BarNotes = {
    [P in Pitch]?: BarRowNotes
}
export type MusicSheetNotes = BarNotes[]

const props = defineProps<{
    modelValue: MusicSheetNotes
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: MusicSheetNotes): void
}>()

const notes = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
})

function handleAddNote(bar: number, pitch: Pitch, col: number) {
    if (notes.value[bar] === undefined) {
        notes.value[bar] = {}
    }

    if (notes.value[bar][pitch] === undefined) {
        notes.value[bar][pitch] = {}
    }

    notes.value[bar][pitch][col] = noteFractionsMap[selectedFractionKey.value]
}

const selectedFractionKey = ref<NoteFractionKey>(defaultNoteFractionKey)
provide(
    "BaseNote",
    computed(() => markRaw(noteFractionsMap[selectedFractionKey.value].componentPath))
)

const NOTE_COLS = 16
</script>

<template>
    <div :class="$style.container">
        <MusicSheetControls
            v-model:note-fraction="selectedFractionKey"
            @update:note-fraction="(newVal) => (selectedFractionKey = newVal)"
            @add-tab="notes.push({})"
        />
        <MusicSheet
            :notes="notes"
            :note-columns="NOTE_COLS"
            @add-note="({ barInx, pitch: line, col }) => handleAddNote(barInx, line, col)"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
    align-items: center;
}
</style>
