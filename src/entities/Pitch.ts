export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const
export type Note = (typeof NOTE_NAMES)[number]

export const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
export type Octave = (typeof OCTAVES)[number]

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

export function isPitch(str: string): str is Pitch {
    const notePart = str.slice(0, str.length - 1)
    const octavePart = parseInt(str.slice(-1))

    return NOTE_NAMES.includes(notePart as Note) && OCTAVES.includes(octavePart as Octave)
}

export function toPitch(str: string): Pitch {
    if (isPitch(str)) {
        return str
    }

    throw new Error(
        `Invalid pitch: ${str}. Pitch must be in the format NoteOctave (e.g., 'C4', 'A#2')`
    )
}
