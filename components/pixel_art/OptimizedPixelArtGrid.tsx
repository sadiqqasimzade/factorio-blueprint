import { useVirtualizer } from '@tanstack/react-virtual';
import React, { memo, useCallback, useMemo } from 'react';

type OptimizedPixelArtGridProps = {
    cells: string[][];
    updateCell: (x: number, y: number) => void;
    cellSize?: number;
};

// Memoized Cell component for better performance
const Cell = memo(({ 
    color, 
    onPaint,
    size 
}: { 
    color: string; 
    onPaint: () => void;
    size: number;
}) => {
    // Memoize style object to prevent recreation on each render
    const style = useMemo(() => ({
        backgroundColor: "#" + color,
        width: `${size}px`,
        height: `${size}px`
    }), [color, size]);

    return (
        <div
            className="border border-black cursor-pointer select-none"
            style={style}
            onMouseDown={onPaint}
            onMouseEnter={(e) => {
                // Only paint if left mouse button is pressed
                if (e.buttons === 1) {
                    onPaint();
                }
            }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
        />
    );
});

Cell.displayName = 'Cell';

// Virtualized row component
const VirtualizedRow = memo(({ 
    row, 
    rowIndex, 
    updateCell, 
    cellSize,
    virtualColumnRange
}: { 
    row: string[]; 
    rowIndex: number; 
    updateCell: (x: number, y: number) => void;
    cellSize: number;
    virtualColumnRange: { startIndex: number; endIndex: number };
}) => {
    const visibleCells = useMemo(() => {
        return row.slice(virtualColumnRange.startIndex, virtualColumnRange.endIndex + 1);
    }, [row, virtualColumnRange]);

    return (
        <div
            className="flex"
            style={{ 
                height: `${cellSize}px`,
                transform: `translateX(${virtualColumnRange.startIndex * cellSize}px)`
            }}
            onDragStart={(e) => e.preventDefault()}
        >
            {visibleCells.map((color, columnIndex) => {
                const actualIndex = virtualColumnRange.startIndex + columnIndex;
                return (
                    <Cell
                        key={`${actualIndex}-${rowIndex}`}
                        color={color}
                        size={cellSize}
                        onPaint={() => updateCell(actualIndex, rowIndex)}
                    />
                );
            })}
        </div>
    );
});

VirtualizedRow.displayName = 'VirtualizedRow';

/**
 * Performance-optimized Pixel Art Grid with virtualization
 * Only renders visible cells to improve performance for large grids
 */
function OptimizedPixelArtGrid({ 
    cells, 
    updateCell, 
    cellSize = 16 
}: OptimizedPixelArtGridProps) {
    const parentRef = React.useRef<HTMLDivElement>(null);

    // Virtualize rows
    const rowVirtualizer = useVirtualizer({
        count: cells.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => cellSize,
        overscan: 10,
    });

    // Virtualize columns for wide grids
    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: cells[0]?.length || 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => cellSize,
        overscan: 15,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();
    const virtualColumns = columnVirtualizer.getVirtualItems();

    // Memoize the column range calculation
    const columnRange = useMemo(() => ({
        startIndex: virtualColumns[0]?.index ?? 0,
        endIndex: virtualColumns[virtualColumns.length - 1]?.index ?? 0
    }), [virtualColumns]);

    // Memoized update handler
    const handleUpdateCell = useCallback((x: number, y: number) => {
        updateCell(x, y);
    }, [updateCell]);

    if (cells.length === 0 || !cells[0] || cells[0].length === 0) {
        return (
            <div className="text-center text-gray-500 p-4">
                No pixel data available
            </div>
        );
    }

    // Dynamic virtualization threshold based on total cell count
    // Virtualize when total cells > 2500 (50x50) or either dimension > 100
    const totalCells = cells.length * (cells[0]?.length || 0);
    const shouldVirtualize = totalCells > 2500 || cells.length > 100 || (cells[0]?.length || 0) > 100;

    if (shouldVirtualize) {
        return (
            <div 
                ref={parentRef}
                className="overflow-auto border border-gray-700 rounded"
                style={{ 
                    width: '100%', 
                    height: '500px',
                    touchAction: 'none'
                }}
            >
                <div
                    style={{
                        height: rowVirtualizer.getTotalSize(),
                        width: columnVirtualizer.getTotalSize(),
                        position: 'relative',
                    }}
                >
                    {virtualRows.map((virtualRow) => {
                        const row = cells[virtualRow.index];
                        if (!row) return null;
                        
                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                <VirtualizedRow
                                    row={row}
                                    rowIndex={virtualRow.index}
                                    updateCell={handleUpdateCell}
                                    cellSize={cellSize}
                                    virtualColumnRange={columnRange}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // For smaller grids, use regular rendering
    return (
        <div 
            className="inline-block border border-gray-700 rounded overflow-auto max-h-[500px]"
            style={{ touchAction: 'none' }}
        >
            {cells.map((row, y) => (
                <div key={y} className="flex">
                    {row.map((color, x) => (
                        <Cell
                            key={`${x}-${y}`}
                            color={color}
                            size={cellSize}
                            onPaint={() => handleUpdateCell(x, y)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default memo(OptimizedPixelArtGrid);