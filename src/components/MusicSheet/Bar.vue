<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref, useTemplateRef } from "vue"
import BarRow from "./BarRow.vue"
import type { BarNotes } from "./MusicSheetContainer.vue"

type BarProps = {
    barNotes: BarNotes
    columnsNum: number
}
defineProps<BarProps>()

const LINES_NUM = 23

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
    (e: "add-note", line: number, col: number): void
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
            :barRowNotes="barNotes[index] || {}"
            @add-note="(col) => $emit('add-note', index, col)"
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
