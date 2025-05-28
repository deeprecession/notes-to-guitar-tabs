<script setup lang="ts">
import { ToolbarButton, ToolbarRoot, ToolbarToggleGroup, ToolbarToggleItem } from "radix-vue"
import { defaultNoteFractionKey, noteFractionsMap, type NoteFractionKey } from "./noteFractions"

const noteFractionModel = defineModel<NoteFractionKey>("noteFraction", {
    default: defaultNoteFractionKey,
})

const interactionMode = defineModel<InteractionMode>("interactionMode", {
    default: "insert",
})

export type InteractionMode = "remove" | "insert"

defineEmits<{
    (e: "addTab"): void
    (e: "resetSheet"): void
}>()
</script>

<template>
    <ToolbarRoot :class="$style.ToolbarRoot">
        <ToolbarButton
            :class="$style.AddTabButton"
            @click="$emit('addTab')"
            >Add Tab</ToolbarButton
        >

        <ToolbarButton
            v-if="interactionMode === 'insert'"
            :class="$style.AddTabButton"
            @click="$emit('update:interactionMode', 'remove')"
        >
            Remove mode
        </ToolbarButton>
        <ToolbarButton
            v-if="interactionMode === 'remove'"
            :class="$style.ResetSheetButton"
            @click="$emit('update:interactionMode', 'insert')"
        >
            Insert mode
        </ToolbarButton>

        <ToolbarToggleGroup
            :class="$style.ToolbarToggleGroup"
            :model-value="noteFractionModel"
            @update:model-value="(newVal) => (noteFractionModel = newVal as NoteFractionKey)"
        >
            <ToolbarToggleItem
                v-for="(fraction, key) in noteFractionsMap"
                :key="key"
                :value="key"
                :class="$style.ToolbarToggleItem"
            >
                <img
                    :src="fraction.iconPath"
                    :alt="fraction.name"
                    :class="$style.noteImage"
                />
            </ToolbarToggleItem>
        </ToolbarToggleGroup>

        <ToolbarButton
            :class="$style.ResetSheetButton"
            @click="$emit('resetSheet')"
            >Reset Sheet
        </ToolbarButton>
    </ToolbarRoot>
</template>

<style lang="css" scoped module>
a,
button {
    all: unset;
}

.ToolbarRoot {
    display: flex;
    flex-flow: row wrap;

    justify-content: center;
    align-items: center;

    gap: 10px;

    padding: 10px;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 2px 10px var(--black-a7);
}

.ToolbarToggleItem,
.ToolbarLink,
.ResetSheetButton,
.AddTabButton {
    flex: 0 0 auto;
    color: var(--mauve-11);
    height: 25px;
    padding: 0 5px;
    border-radius: 4px;
    display: inline-flex;
    font-size: 13px;
    line-height: 1;
    align-items: center;
    justify-content: center;
}

.ToolbarToggleItem:hover,
.ToolbarLink:hover {
    background-color: var(--grass-3);
    color: var(--grass-11);
}

.ToolbarToggleItem:focus,
.ToolbarLink:focus {
    position: relative;
    box-shadow: 0 0 0 2px var(--grass-7);
}

.ToolbarToggleItem {
    background-color: white;
    margin-left: 2px;
}
.ToolbarToggleItem:first-child {
    margin-left: 0;
}
.ToolbarToggleItem[data-state="on"] {
    background-color: var(--grass-5);
    color: var(--grass-11);
}

.ToolbarSeparator {
    width: 1px;
    background-color: var(--mauve-6);
    margin: 0 10px;
}

.AddTabButton {
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    background-color: var(--grass-9);
    cursor: pointer;
}
.AddTabButton:hover {
    background-color: var(--grass-10);
    color: white;
}

.ResetSheetButton {
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    background-color: var(--red-9);
    cursor: pointer;
}
.ResetSheetButton:hover {
    background-color: var(--red-10);
    color: white;
}

.noteImage {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: contain;
    object-position: center;
}
</style>
