<script setup lang="ts">
import { ref } from "vue"
import MusicSheetContainer, {
    type MusicSheetNotes,
} from "./components/MusicSheet/MusicSheetContainer.vue"
import TabComponent from "./components/TabComponent/TabComponent.vue"
import type { Tab } from "./utils/notesToTabsAlgorithm/NotesToTabsConverter"

const tabs: Tab[] = []
const notes = ref<MusicSheetNotes>([{}, {}, {}, {}])
</script>

<template>
    <h1>Music sheet</h1>
    <MusicSheetContainer :model-value="notes" />

    <h1>Tabs</h1>
    <TabComponent :tabs="tabs" />
</template>

<style lang="css" scoped></style>
