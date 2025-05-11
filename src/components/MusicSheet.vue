<script setup lang="ts">
import { ref } from "vue"
import Bar from "./Bar.vue"

const notes = ref<Record<number, Record<number, boolean>>>({})

function handleAddNote(line: number, col: number) {
    if (notes.value[line] === undefined) {
        notes.value[line] = {}
    }

    notes.value[line][col] = true
}
</script>

<template>
    <div :class="$style.container">
        <Bar
            :notes="notes"
            :note-width="10"
            :columns-num="64"
            @add-note="handleAddNote"
        />
    </div>
</template>

<style lang="css" scoped module>
.container {
    height: 230px;
}
</style>
