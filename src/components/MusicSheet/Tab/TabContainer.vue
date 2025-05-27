<script setup lang="ts">
import { ref, watch } from "vue"
import type { FinedTab } from "../../../utils/notesToTabsAlgorithm/TabMetrics"
import TabControls from "./TabControls.vue"
import TabVisuals from "./TabVisuals.vue"

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

function getSolutionInxForCol(tabSolutions: FinedTab[], col: number) {
    return tabSolutions[curTabInx.value[col]]
}
</script>

<template>
    <div :class="$style.container">
        <TabControls
            :tabs="tabs"
            :selected-solutions="curTabInx"
            @update:selected-solutions="
                (val) => {
                    curTabInx = val
                }
            "
        >
            <TabVisuals :tabs="tabs.map(getSolutionInxForCol)" />
        </TabControls>
    </div>
</template>

<style lang="css" scoped module>
.container {
    width: 100%;
    height: 100%;
}
</style>
