<script setup lang="ts">
import Bar from "./Bar.vue"
</script>

<template>
    <div :class="$style.container">
        <Bar :columns-num="64" />
    </div>
</template>

<style lang="css" scoped module>
.container {
    height: 230px;
}
</style>
