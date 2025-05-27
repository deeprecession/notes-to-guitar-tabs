<script setup lang="ts">
import { computed, type CSSProperties } from "vue"
import type { FinedTab } from "../../../utils/notesToTabsAlgorithm/TabMetrics"

const props = defineProps<{
    tabs: FinedTab[]
}>()

const cols = computed(() => props.tabs.length)
const rows = computed(() => props.tabs[0]?.length || 0)

function numStyles(col: number, row: number): CSSProperties {
    return {
        left: `${(col / cols.value) * 100}%`,
        top: `${(row / rows.value) * 100}%`,
        width: `${100 / cols.value}%`,
        height: `${100 / rows.value}%`,
    }
}

function lineStyles(row: number): CSSProperties {
    return {
        left: `0`,
        top: `${(row / rows.value) * 100}%`,
        width: `100%`,
        height: `${100 / rows.value}%`,
    }
}
</script>

<template>
    <div :class="$style.container">
        <template v-for="(tab, colInx) in tabs">
            <template v-for="(num, rowInx) in tab">
                <div
                    v-if="num !== null"
                    :style="numStyles(colInx, rowInx)"
                    :class="$style.number"
                >
                    {{ num }}
                </div>
                <template v-else />
            </template>
        </template>

        <div
            v-for="rowInx in rows"
            :class="$style['line-container']"
            :style="lineStyles(rowInx - 1)"
        >
            <div :class="$style.line"></div>
        </div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    width: 100%;
    height: 100%;

    position: relative;

    border-left: 1px solid black;
    border-right: 1px solid black;
}

.number {
    position: absolute;

    font-size: 1.2rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
}

.line-container {
    position: absolute;
    width: 100%;
}

.line {
    position: absolute;

    top: 50%;

    height: 1px;
    width: 100%;

    background: black;
    transform: translateY(-50%);
}
</style>
