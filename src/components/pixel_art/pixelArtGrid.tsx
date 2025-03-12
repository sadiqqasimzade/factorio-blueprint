import { memo } from 'react'

type Props = {
    cells: string[][]
    updateCell: (x: number, y: number) => void
}

const Cell = memo(({ color, onPaint }: { color: string, onPaint: () => void }) => (
    <div
        className="w-4 h-4 border border-black"
        style={{ backgroundColor: "#" + color }}
        onMouseDown={onPaint}
        onMouseEnter={(e) => {
            // Only paint if left mouse button is pressed
            if (e.buttons === 1) {
                onPaint()
            }
        }}
    />
))

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
                onPaint={() => updateCell(x, y)}
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
