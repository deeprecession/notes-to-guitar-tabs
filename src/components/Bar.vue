<script setup lang="ts">
import { defineProps } from "vue"
import BarRow from "./BarRow.vue"

type BarProps = {
    columnsNum: number
}

defineProps<BarProps>()
</script>

<template>
    <div :class="$style.container">
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />

        <BarRow :hasLine="true" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="true" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="true" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="true" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="true" />

        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
        <BarRow :hasLine="false" />
    </div>
</template>

<style lang="css" scoped module>
.container {
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid black;
    height: 100%;
}
</style>
