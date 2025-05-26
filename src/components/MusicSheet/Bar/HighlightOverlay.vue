<script setup lang="ts">
defineProps<{
    area: {
        height: number
        width: number
        x: number
        y: number
    }
}>()
</script>

<template>
    <div>
        <div
            :style="{
                top: `${area.y}px`,
                height: `${area.height}px`,
            }"
            :class="$style['highlighted-cell']"
        ></div>
        <div
            :style="{
                left: `${area.x}px`,
                width: `${area.width}px`,
            }"
            :class="$style['highlighted-cell']"
        ></div>
    </div>
</template>

<style lang="css" scoped module>
.highlighted-cell {
    position: absolute;
    background-color: mediumseagreen;
    opacity: 25%;
    width: 100%;
    height: 100%;
}
</style>
