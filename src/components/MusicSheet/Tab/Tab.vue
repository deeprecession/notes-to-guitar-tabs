<script setup lang="ts">
import { ref, watch } from "vue"
import type { FinedTab } from "../../../utils/notesToTabsAlgorithm/TabMetrics"

const props = defineProps<{
    tabs: FinedTab[][]
}>()

const curTabInx = ref(new Array(props.tabs.length).fill(0))

watch(
    () => props.tabs,
    () => {
        curTabInx.value = new Array(props.tabs.length).fill(0)
    }
)
</script>

<template>
    <div :class="$style.container">
        <div
            v-for="(tab, tabInx) in tabs"
            :class="$style.col"
        >
            <button
                :disabled="!tab[curTabInx[tabInx]] || !tab[curTabInx[tabInx] - 1]"
                :class="$style.btn"
                @click="curTabInx[tabInx]--"
            >
                ⬆️
            </button>
            <div v-for="num in [...tab[curTabInx[tabInx]]].reverse()">
                {{ num === null ? "-" : num }}--
            </div>
            <button
                :disabled="!tab[curTabInx[tabInx]] || !tab[curTabInx[tabInx] + 1]"
                :class="$style.btn"
                @click="curTabInx[tabInx]++"
            >
                ⬇️
            </button>
        </div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: row nowrap;
    row-gap: 10rem;

    justify-content: space-around;

    border-left: 1px solid black;
    border-right: 1px solid black;
}

.col {
    display: flex;
    flex-flow: column nowrap;
}

.btn {
    padding: 0;
}
</style>
