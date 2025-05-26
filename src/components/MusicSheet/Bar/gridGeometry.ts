export type Cell = {
    x: number
    y: number
    width: number
    height: number
    col: number
    row: number
}

export type Grid = {
    cols: number
    rows: number
    width: number
    height: number
}

export function getCellRect(grid: Grid, col: number, row: number): Cell {
    const colWidth = grid.width / grid.cols
    const rowHeight = grid.height / grid.rows

    return {
        x: col * colWidth,
        y: row * rowHeight,
        width: colWidth,
        height: rowHeight,
        col,
        row,
    }
}

export function getCellAtPoint(grid: Grid, x: number, y: number): Cell {
    const colWidth = grid.width / grid.cols
    const rowHeight = grid.height / grid.rows

    const col = Math.max(0, Math.min(grid.cols - 1, Math.floor(x / colWidth)))
    const row = Math.max(0, Math.min(grid.rows - 1, Math.floor(y / rowHeight)))

    return {
        x: col * colWidth,
        y: row * rowHeight,
        width: colWidth,
        height: rowHeight,
        col,
        row,
    }
}
