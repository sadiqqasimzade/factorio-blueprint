import { memo, useCallback } from 'react'

type Props = {
    cells: string[][]
    updateCell: (x: number, y: number) => void
}

const Cell = memo(({ color, x, y, updateCell }: { color: string, x: number, y: number, updateCell: (x: number, y: number) => void }) => {
    const handlePaint = useCallback(() => {
        updateCell(x, y)
    }, [x, y, updateCell])

    const handleMouseEnter = useCallback((e: React.MouseEvent) => {
        if (e.buttons === 1) {
            handlePaint()
        }
    }, [handlePaint])

    return (
        <div
            className="w-4 h-4 border border-black"
            style={{ backgroundColor: "#" + color }}
            onMouseDown={handlePaint}
            onMouseEnter={handleMouseEnter}
        />
    )
}, (prevProps, nextProps) => {
    return prevProps.color === nextProps.color &&
        prevProps.x === nextProps.x &&
        prevProps.y === nextProps.y &&
        prevProps.updateCell === nextProps.updateCell
})

Cell.displayName = 'Cell'

const Row = memo(({ row, y, updateCell }: { row: string[], y: number, updateCell: (x: number, y: number) => void }) => (
    <div
        className="flex"
        onDragStart={(e) => e.preventDefault()}
    >
        {row.map((color, x) => (
            <Cell
                key={`${x}-${y}`}
                color={color}
                x={x}
                y={y}
                updateCell={updateCell}
            />
        ))}
    </div>
))

Row.displayName = 'Row'

function PixelArtGrid({ cells, updateCell }: Props) {
    return (
        <div
            className="inline-block"
            onDragStart={(e) => e.preventDefault()}
            style={{ touchAction: 'none' }}
        >
            {cells.map((row, y) => (
                <Row
                    key={y}
                    row={row}
                    y={y}
                    updateCell={updateCell}
                />
            ))}
        </div>
    )
}

export default memo(PixelArtGrid)
