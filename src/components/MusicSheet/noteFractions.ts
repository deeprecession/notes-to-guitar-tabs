import wholeNotePath from "../../assets/whole-note.svg?url"
import halfNotePath from "../../assets/half-note.svg?url"
import quarterNotePath from "../../assets/quarter-note.svg?url"
import eighthNotePath from "../../assets/eighth-note.svg?url"
import sixteenthNotePath from "../../assets/sixteenth-note.svg?url"

export type NoteFraction = {
    readonly id: number
    readonly fraction: number
    readonly iconPath: string
    readonly name: string
}

export const noteFractionsMap = {
    whole: { id: 1, fraction: 1, iconPath: wholeNotePath, name: "1/1" },
    half: { id: 2, fraction: 1 / 2, iconPath: halfNotePath, name: "1/2" },
    quarter: { id: 3, fraction: 1 / 4, iconPath: quarterNotePath, name: "1/4" },
    eighth: { id: 4, fraction: 1 / 8, iconPath: eighthNotePath, name: "1/8" },
    sixteenth: { id: 5, fraction: 1 / 16, iconPath: sixteenthNotePath, name: "1/16" },
} as const satisfies Record<string, NoteFraction>

export type NoteFractionKey = keyof typeof noteFractionsMap

export const noteFractions = Object.values(noteFractionsMap) satisfies NoteFraction[]

export const defaultNoteFractionKey: NoteFractionKey = "quarter"
export const defaultNoteFraction = noteFractionsMap[defaultNoteFractionKey]
