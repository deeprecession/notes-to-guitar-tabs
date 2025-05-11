<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref, useTemplateRef } from "vue"
import BarRow from "./BarRow.vue"
import type { BarNotes } from "./MusicSheet.vue"

type BarProps = {
    barNotes: BarNotes
    columnsNum: number
    noteWidth: number
    noteHeight: number
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
        :style="{ maxWidth: columnsNum * noteWidth + 'px' }"
    >
        <BarRow
            v-for="(_, index) in [...Array(LINES_NUM).keys()]"
            :key="`barrow-${index}`"
            :height="noteHeight"
            :noteWidth="noteWidth"
            :hasLine="shouldHaveLine(index)"
            :barRowNotes="barNotes[index] || {}"
            :columnsNum="columnsNum"
            @add-note="(col) => $emit('add-note', index, col)"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid black;
    height: 100%;
}
</style>
