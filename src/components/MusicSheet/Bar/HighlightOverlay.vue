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
    <div :class="$style.container">
        <div
            :style="{
                top: `${area.y}px`,
                left: 0,
                height: `${area.height}px`,
            }"
            :class="$style['highlighted-cell']"
        ></div>
        <div
            :style="{
                left: `${area.x}px`,
                top: 0,
                width: `${area.width}px`,
            }"
            :class="$style['highlighted-cell']"
        ></div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.highlighted-cell {
    position: absolute;
    background-color: #000000;
    opacity: 30%;
    width: 100%;
    height: 100%;
}
</style>
