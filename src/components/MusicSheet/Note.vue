<script setup lang="ts">
defineProps<{
    x: number
    y: number
}>()
</script>

<template>
    <div
        :style="{ left: `${x}px`, top: `${y}px` }"
        :class="$style['note-wrapper']"
    >
        <slot />
    </div>
</template>

<style lang="css" scoped module>
.note-wrapper {
    position: absolute;
    padding: 0px;
    height: fit-content;
}

.note {
    display: block;
}
</style>
