<script setup lang="ts">
import type { Tab } from "../../utils/notesToTabsAlgorithm/NotesToTabsConverter"

defineProps<{
    tabs: Tab[]
}>()
</script>

<template>
    <div :class="$style.container">
        <div
            v-for="tab in tabs"
            :class="$style.col"
        >
            <div v-for="num in [...tab].reverse()">{{ num === null ? "-" : num }}-------</div>
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
