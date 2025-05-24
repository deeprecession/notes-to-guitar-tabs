export type NoteFraction = {
    readonly id: number
    readonly fraction: number
    readonly iconName: string
    readonly name: string
}

export const noteFractionsMap = {
    whole: { id: 1, fraction: 1, iconName: "whole-note", name: "1/1" },
    half: { id: 2, fraction: 1 / 2, iconName: "half-note", name: "1/2" },
    quarter: { id: 3, fraction: 1 / 4, iconName: "quarter-note", name: "1/4" },
    eighth: { id: 4, fraction: 1 / 8, iconName: "eighth-note", name: "1/8" },
    sixteenth: { id: 5, fraction: 1 / 16, iconName: "sixteenth-note", name: "1/16" },
} as const satisfies Record<string, NoteFraction>

export type NoteFractionKey = keyof typeof noteFractionsMap

export const noteFractions = Object.values(noteFractionsMap) satisfies NoteFraction[]

export const defaultNoteFractionKey: NoteFractionKey = "quarter"
export const defaultNoteFraction = noteFractionsMap[defaultNoteFractionKey]
