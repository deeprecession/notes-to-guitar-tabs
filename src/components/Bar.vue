<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref, useTemplateRef } from "vue"
import BarRow from "./BarRow.vue"

type BarProps = {
    columnsNum: number
}

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

defineProps<BarProps>()
</script>

<template>
    <div ref="barRef" :class="$style.container">
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />

        <BarRow :hasLine="true" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="true" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="true" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="true" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="true" :width="barWidth" />

        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
        <BarRow :hasLine="false" :width="barWidth" />
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
