import { onMounted, onUnmounted, ref, type ShallowRef } from "vue"

export function useSizeObserver(elem: ShallowRef<HTMLElement | null>) {
    const offsetWidth = ref(0)
    const offsetHeight = ref(0)

    const observer = new ResizeObserver(() => {
        if (!elem.value) {
            return
        }

        offsetWidth.value = elem.value.offsetWidth
        offsetHeight.value = elem.value.offsetHeight
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

    return { offsetWidth, offsetHeight }
}
