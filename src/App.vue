<script setup lang="ts">
import MusicSheetContainer from "./components/MusicSheet/MusicSheetContainer.vue"
import { useNotesStorage } from "./composables/notesStorage"


const notes = useNotesStorage()

const BAR_COLS = 16
</script>

<template>
    <div :class="$style.layout">
        <MusicSheetContainer
            :note-cols="BAR_COLS"
            :model-value="notes"
        />
    </div>
</template>

<style lang="css" scoped module>
.layout {
    min-height: 100vh;
    background-color: #bf9264;
    padding: 1rem;
}
</style>
