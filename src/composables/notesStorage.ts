import { onMounted, ref, watch } from "vue"
import type { MusicSheetNotes } from "../components/MusicSheet/MusicSheetContainer.vue"

export function useNotesStorage() {
    const notes = ref<MusicSheetNotes>([{}])

    const saveNotes = () => {
        localStorage.setItem("musicSheetNotes", JSON.stringify(notes.value))
    }

    const loadNotes = () => {
        const storedNotes = localStorage.getItem("musicSheetNotes")
        if (storedNotes) {
            try {
                const parsed = JSON.parse(storedNotes)
                notes.value = parsed
            } catch (e) {
                console.error("Failed to parse stored notes", e)
            }
        }
    }

    watch(notes, saveNotes, { deep: true })

    onMounted(loadNotes)

    return notes
}
