<script setup lang="ts">
import { defaultNoteFraction, noteFractions, type NoteFraction } from "./noteFractions"

const model = defineModel<NoteFraction>({ default: defaultNoteFraction })
</script>

<template>
    <button
        v-for="noteFrac in noteFractions"
        :key="noteFrac.id"
        :class="{ [$style.active]: model.id === noteFrac.id }"
        @click="model = noteFrac"
    >
        {{ noteFrac.name }}
    </button>
</template>

<style lang="css" scoped module>
.active {
    background-color: #ddd;
}
</style>
