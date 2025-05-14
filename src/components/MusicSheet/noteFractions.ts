import Quarter from "@/assets/quarter-note.svg?component"
import Eighth from "@/assets/eighth-note.svg?component"
import Half from "@/assets/half-note.svg?component"
import Whole from "@/assets/whole-note.svg?component"
import Sixteenth from "@/assets/sixteenth-note.svg?component"
import type { Component } from "vue"

export type NoteFraction = {
    readonly id: number
    readonly fraction: number
    readonly componentPath: Component
    readonly name: string
}

export const noteFractionsMap = {
    whole: { id: 1, fraction: 1, componentPath: Whole, name: "1/1" },
    half: { id: 2, fraction: 1 / 2, componentPath: Half, name: "1/2" },
    quarter: { id: 3, fraction: 1 / 4, componentPath: Quarter, name: "1/4" },
    eighth: { id: 4, fraction: 1 / 8, componentPath: Eighth, name: "1/8" },
    sixteenth: { id: 5, fraction: 1 / 16, componentPath: Sixteenth, name: "1/16" },
} as const satisfies Record<string, NoteFraction>

export const noteFractions = Object.values(noteFractionsMap) satisfies NoteFraction[]

export const defaultNoteFraction = noteFractionsMap.whole
