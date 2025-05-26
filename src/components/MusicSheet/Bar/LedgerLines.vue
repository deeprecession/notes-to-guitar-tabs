<script setup lang="ts">
import { computed } from "vue"
import { isPitch, type Pitch } from "../../../entities/Pitch"
import type { BarNotes } from "../MusicSheetContainer.vue"
import _ from "lodash"

const props = defineProps<{
    rowsAboveStaff: number
    rowHeight: number
    notes: BarNotes
    pitches: Pitch[]
    rows: number
    cols: number
    hoveredCell: { col: number; row: number }
    isHoveredCellShown: boolean
}>()

const firstRowBelowStaffInx = computed(() => props.rowsAboveStaff + 8)

const highestAndLowestNotesBelowAndAboveStaff = computed(() => {
    const notePositions = _.entries(props.notes).flatMap(([pitch, barNotes]) => {
        if (barNotes === undefined || Object.keys(barNotes).length === 0 || !isPitch(pitch)) {
            return []
        }

        const row = props.pitches.indexOf(pitch)
        return _.keys(barNotes).map((colStr) => ({
            col: parseInt(colStr),
            row,
        }))
    })

    if (props.isHoveredCellShown) {
        notePositions.push(props.hoveredCell)
    }

    const notesByColumn = _.groupBy(notePositions, "col")

    const result = _.mapValues(notesByColumn, (notes) => {
        const rows = notes.map((n) => n.row)

        const belowStaffRows = rows.filter((row) => row > firstRowBelowStaffInx.value)
        const lowestBelowStaff = belowStaffRows.length > 0 ? _.max(belowStaffRows) : undefined

        const aboveStaffRows = rows.filter((row) => row < props.rowsAboveStaff)
        const highestAboveStaff = aboveStaffRows.length > 0 ? _.min(aboveStaffRows) : undefined

        return {
            lowestBelowStaff,
            highestAboveStaff,
        }
    })

    return result
})

const ledgerLinesPositions = computed(() => {
    const positions: { col: number; row: number }[] = []

    _.forEach(
        highestAndLowestNotesBelowAndAboveStaff.value,
        ({ highestAboveStaff, lowestBelowStaff }, colStr) => {
            if (highestAboveStaff !== undefined) {
                for (let i = props.rowsAboveStaff - 2; i >= highestAboveStaff; i -= 2) {
                    positions.push({ row: i, col: parseInt(colStr) })
                }
            }

            if (lowestBelowStaff !== undefined) {
                for (let i = firstRowBelowStaffInx.value + 1; i <= lowestBelowStaff; i += 2) {
                    positions.push({ row: i, col: parseInt(colStr) })
                }
            }
        }
    )

    return positions
})

const ledgerLinesStyles = computed(() => {
    return ledgerLinesPositions.value.map(({ col, row }) => ({
        left: `${(col / props.cols) * 100}%`,
        top: `${(row / props.rows) * 100}%`,
        width: `${100 / props.cols}%`,
        height: `${100 / props.rows}%`,
    }))
})
</script>

<template>
    <div :class="$style.container">
        <div
            v-for="style in ledgerLinesStyles"
            :class="$style['line-container']"
            :style="style"
        >
            <div :class="$style['line']"></div>
        </div>
    </div>
</template>

<style lang="css" scoped module>
.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.line-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}

.line {
    position: absolute;
    background-color: black;
    height: 3px;
    width: 90%;
    transform: translateY(50%);
}
</style>
