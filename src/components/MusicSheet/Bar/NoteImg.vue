<script setup lang="ts">
import type { NoteFraction } from "../noteFractions"

defineProps<{ noteFraction: NoteFraction }>()
</script>

<template>
    <img
        :src="noteFraction.iconPath"
        :alt="noteFraction.name"
        :class="$style.noteImage"
    />
</template>

<style lang="css" scoped module>
.noteImage {
    /* transform-origin: 0 0; */
    display: block;
    position: absolute;
    top: 150%;
    left: 20%;
    height: 800%;
    transform: scale(100%) translateX(0%) translateY(-100%);
}
</style>
