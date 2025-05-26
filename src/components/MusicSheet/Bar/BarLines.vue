<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    rowsAboveStaff: number
    rowHeight: number
}>()

const staffLinesTopCoord = computed(() => props.rowsAboveStaff * props.rowHeight)
</script>

<template>
    <div :class="$style.container">
        <div
            v-for="i in 5"
            :key="i"
            :class="$style['line-container']"
            :style="{
                top: `${staffLinesTopCoord + 2 * (i - 1) * rowHeight - 1}px`,
                height: `${rowHeight}px`,
            }"
        >
            <div :class="$style.line"></div>
        </div>
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

.line-container {
    position: absolute;
    width: 100%;
}

.line {
    position: absolute;

    top: 50%;

    height: 3px;
    width: 100%;

    background: black;
    transform: translateY(-50%);
}
</style>
