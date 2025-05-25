<script setup lang="ts">
import MusicSheet from "./MusicSheet.vue"
import MusicSheetControls, { type InteractionMode } from "./MusicSheetControls.vue"
import { computed, provide, ref, type Ref } from "vue"
import {
    defaultNoteFractionKey,
    noteFractionsMap,
    type NoteFraction,
    type NoteFractionKey,
} from "./noteFractions"
import type { Pitch } from "../../entities/Pitch"

export type BarRowNotes = Record<number, NoteFraction>
export type BarNotes = {
    [P in Pitch]?: BarRowNotes
}
export type MusicSheetNotes = BarNotes[]

const props = defineProps<{
    modelValue: MusicSheetNotes
    noteCols: number
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

function handleRemoveNote(bar: number, pitch: Pitch, col: number) {
    if (notes.value[bar] === undefined) {
        return
    }

    if (notes.value[bar][pitch] === undefined) {
        return
    }

    delete notes.value[bar][pitch][col]
}

const selectedFractionKey = ref<NoteFractionKey>(defaultNoteFractionKey)
provide(
    "noteFraction",
    computed(() => noteFractionsMap[selectedFractionKey.value])
)

function resetSheet() {
    notes.value = notes.value.splice(0, notes.value.length)
    notes.value.push({})
}

const interactionMode = ref<InteractionMode>("insert")

provide<Ref<InteractionMode>>("interaction-mode", interactionMode)
</script>

<template>
    <div :class="$style.container">
        <MusicSheetControls
            v-model:interaction-mode="interactionMode"
            v-model:note-fraction="selectedFractionKey"
            @update:interaction-mode="(mode) => (interactionMode = mode)"
            @update:note-fraction="(fraction) => (selectedFractionKey = fraction)"
            @add-tab="notes.push({})"
            @reset-sheet="resetSheet"
        />
        <MusicSheet
            :notes="notes"
            :note-columns="noteCols"
            @add-note="({ barInx, pitch: line, col }) => handleAddNote(barInx, line, col)"
            @remove-note="({ barInx, pitch: line, col }) => handleRemoveNote(barInx, line, col)"
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
