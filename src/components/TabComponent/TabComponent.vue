<script setup lang="ts">
import { ref, watch } from "vue"
import type { GuitarTuning } from "../../utils/notesToTabsAlgorithm/GuitarTuning"
import type { FinedTab } from "../../utils/notesToTabsAlgorithm/TabMetrics"

const props = defineProps<{
    tabs: FinedTab[][]
    guitarTuning: GuitarTuning
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
        <div :class="$style.col">
            Tuning
            <div v-for="pitch in guitarTuning">
                {{ pitch }}
            </div>
        </div>

        <div
            v-for="(tab, tabInx) in tabs"
            :class="$style.col"
        >
            <button
                :disabled="!tab[curTabInx[tabInx]] || !tab[curTabInx[tabInx] - 1]"
                @click="curTabInx[tabInx]--"
            >
                ⬆️
            </button>
            <div v-for="num in [...tab[curTabInx[tabInx]]].reverse()">
                {{ num === null ? "-" : num }}--
            </div>
            <button
                :disabled="!tab[curTabInx[tabInx]] || !tab[curTabInx[tabInx] + 1]"
                @click="curTabInx[tabInx]++"
            >
                ⬇️
            </button>
        </div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: flex;
    flex-flow: row wrap;
    row-gap: 10rem;

    padding: 1rem;

    background-color: #e5decf;
}

.col {
    display: flex;
    flex-flow: column nowrap;
}
</style>
