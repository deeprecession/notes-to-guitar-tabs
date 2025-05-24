import { onMounted, onUnmounted, ref, type ShallowRef } from "vue"

export function useSizeObserver(elem: ShallowRef<HTMLElement | null>) {
    const scrollWidth = ref(0)
    const scrollHeight = ref(0)

    const observer = new ResizeObserver(() => {
        if (!elem.value) {
            return
        }

        scrollWidth.value = elem.value.scrollWidth
        scrollHeight.value = elem.value.scrollHeight
    })

    onMounted(() => {
        if (!elem.value) {
            throw new Error(`failed to start check size of MusicSheet`)
        }
        observer.observe(elem.value)
    })

    onUnmounted(() => {
        observer.disconnect()
    })

    return { scrollWidth, scrollHeight }
}
