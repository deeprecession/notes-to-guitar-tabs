<script setup lang="ts">
import NoteIcon from "@/assets/note.svg"
defineProps<{
    x: number
    y: number
}>()

defineEmits<{
    (e: "delete"): void
}>()
</script>

<template>
    <div
        :style="{ left: `${x}px`, top: `${y}px` }"
        :class="$style['note-wrapper']"
        @click="$emit('delete')"
    >
        <NoteIcon :class="$style.note" />
    </div>
</template>

<style lang="css" scoped module>
.note-wrapper {
    position: absolute;
    border: 1px black solid;
    padding: 0px;
    height: fit-content;
}

.note {
    display: block;
}
</style>
