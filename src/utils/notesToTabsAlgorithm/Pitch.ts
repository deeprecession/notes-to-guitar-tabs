export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const

export type Note = (typeof NOTE_NAMES)[number]
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Pitch = `${Note}${Octave}`

export function getPitchIndex(pitch: Pitch): number {
    const note = pitch.slice(0, -1) as Note
    const octave = parseInt(pitch.slice(-1))

    return octave * 12 + NOTE_NAMES.indexOf(note)
}

export function fromPitchIndex(index: number): Pitch {
    const note = NOTE_NAMES[index % 12]
    const octave = Math.floor(index / 12) as Octave
    return `${note}${octave}` as Pitch
}
