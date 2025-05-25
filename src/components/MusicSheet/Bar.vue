<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue"
import BarRow from "./BarRow.vue"
import type { BarNotes } from "./MusicSheetContainer.vue"
import type { Pitch } from "../../entities/Pitch"

const barPitches: Pitch[] = [
    "E5",
    "D5",
    "C5",
    "B4",
    "A4",
    "G4",
    "F4",
    "E4",
    "D4",
    "C4",
    "B3",
    "A3",
    "G3",
    "F3",
    "E3",
    "D3",
    "C3",
    "B2",
    "A2",
    "G2",
    "F2",
    "E2",
]

type BarProps = {
    barNotes: BarNotes
    columnsNum: number
}
defineProps<BarProps>()

const LINES_NUM = 22

const barElem = useTemplateRef("barRef")
const barWidth = ref(0)

const observer = new ResizeObserver(() => {
    if (barElem.value) {
        barWidth.value = barElem.value.scrollWidth
    }
})

onMounted(() => {
    if (barElem.value) {
        observer.observe(barElem.value)
    }
})

onUnmounted(() => {
    observer.disconnect()
})

defineEmits<{
    (e: "add-note", pitch: Pitch, col: number): void
    (e: "remove-note", pitch: Pitch, col: number): void
}>()

const shouldHaveLine = (index: number) => {
    return index >= 7 && index <= 15 && (index - 7) % 2 === 0
}
</script>

<template>
    <div
        ref="barRef"
        :class="$style.container"
    >
        <BarRow
            v-for="(_, index) in [...Array(LINES_NUM).keys()]"
            :key="`barrow-${index}`"
            :hasLine="shouldHaveLine(index)"
            :columns-num="columnsNum"
            :barRowNotes="barNotes[barPitches[index]] || {}"
            @add-note="(col) => $emit('add-note', barPitches[index], col)"
            @remove-note="(col) => $emit('remove-note', barPitches[index], col)"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid black;
}
</style>
