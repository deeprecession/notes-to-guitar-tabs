<script setup lang="ts">
import { watch, defineModel } from "vue"
import type { FinedTab } from "../../../utils/notesToTabsAlgorithm/TabMetrics"

const props = defineProps<{
    tabs: FinedTab[][]
}>()

const curTabInx = defineModel<number[]>("selected-solutions", {
    default: [],
})

watch(
    () => props.tabs,
    () => {
        curTabInx.value = new Array(props.tabs.length).fill(0)
    }
)
</script>

<template>
    <div :class="$style.container">
        <div :class="$style.row">
            <button
                v-for="(tab, tabInx) in tabs"
                :disabled="!tab[curTabInx[tabInx]] || !tab[curTabInx[tabInx] - 1]"
                :class="$style.btn"
                @click="curTabInx[tabInx]--"
            >
                ↑
            </button>
        </div>

        <slot />

        <div :class="$style.row">
            <button
                v-for="(tab, tabInx) in tabs"
                :disabled="!tab[curTabInx[tabInx]] || !tab[curTabInx[tabInx] + 1]"
                :class="$style.btn"
                @click="curTabInx[tabInx]++"
            >
                ↓
            </button>
        </div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
}

.row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}

.btn {
    padding: 0;
    width: 100%;
}
</style>
