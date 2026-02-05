import { allTileColorsArr, basicTileColorsArr } from '@/consts/colorsEnum'
import { ColorProvider, useColor } from '@/contexts/pixelArt/colorContext'
import SettingsContext from '@/contexts/settings/settingsContext'
import { getDecimalColorsFromCanvas } from '@/utils/image/calculateColors'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ColorPickerContainer from './colorPickerContainer'
import OptimizedPixelArtGrid from './OptimizedPixelArtGrid'

type BaseProps = {
    setPixelArt: React.Dispatch<React.SetStateAction<string[][] | number[][] | undefined>>
}

type SizeBasedProps = BaseProps & {
    type: 'size'
    sizex: number
    sizey: number
    resultCanvas?: never
}

type CanvasBasedProps = BaseProps & {
    type: 'canvas'
    resultCanvas: HTMLCanvasElement
    sizex?: never
    sizey?: never
}

type Props = SizeBasedProps | CanvasBasedProps

function PixelArtPageContent(props: Props) {
    const { isAllowedRefinedTiles, convertTo } = useContext(SettingsContext)
    const { selectedColor } = useColor()

    const [cells, setCells] = useState<string[][]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [workerError, setWorkerError] = useState(false)

    const colors = useMemo(() =>
        isAllowedRefinedTiles ? allTileColorsArr : basicTileColorsArr,
        [isAllowedRefinedTiles]
    )

    const dimensions = useMemo(() => {
        if (props.type === 'size') {
            return { width: props.sizex, height: props.sizey }
        } else {
            return {
                width: props.resultCanvas.width,
                height: props.resultCanvas.height
            }
        }
    }, [props])

    useEffect(() => {
        const worker = new Worker(new URL('../../workers/gridWorker.ts', import.meta.url))
        let isMounted = true;

        worker.onmessage = (e) => {
            console.log('Worker message received:', e.data?.length, 'rows');
            if (isMounted) {
                setCells(e.data)
                setIsLoading(false)
            }
        }

        worker.onerror = (error) => {
            console.error('Worker error:', error)
            if (isMounted) {
                setWorkerError(true);
                // Fallback to direct generation
                if (props.type === 'size' && colors.length > 0) {
                    console.log('Using fallback grid generation');
                    const fallbackGrid = generateEmptyGrid(dimensions.width, dimensions.height, colors[0]!);
                    setCells(fallbackGrid);
                }
                setIsLoading(false);
            }
        }

        console.log('Sending message to worker:', {
            type: props.type,
            dimensions: props.type === 'size' ? dimensions : null,
            colorsLength: colors.length
        });

        if (props.type === 'size') {
            worker.postMessage({
                type: 'generate_empty',
                data: {
                    sizex: dimensions.width,
                    sizey: dimensions.height,
                    allowedColors: colors
                }
            });
        } else {
            const canvas = props.resultCanvas!
            const ctx = canvas.getContext('2d')!
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

            worker.postMessage({
                type: 'calculate_from_canvas',
                data: {
                    imageData,
                    allowedColors: colors
                }
            });
        }

        // Add timeout as fallback
        const timeoutId = setTimeout(() => {
            if (isMounted) {
                console.warn('Worker timeout - using fallback generation');
                setWorkerError(true);
                // Fallback to direct generation on timeout
                if (props.type === 'size' && colors.length > 0) {
                    const fallbackGrid = generateEmptyGrid(dimensions.width, dimensions.height, colors[0]!);
                    setCells(fallbackGrid);
                } else {
                    setCells([]);
                }
                setIsLoading(false);
            }
        }, 10000); // 10 second timeout

        // Cleanup function
        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
            worker.terminate();
        }

    }, [props, colors, dimensions])


    // Fallback function for direct grid generation
    const generateEmptyGrid = useCallback((width: number, height: number, color: string) => {
        return Array(height).fill(null).map(() => Array(width).fill(color));
    }, []);

    const updateCell = useCallback((x: number, y: number) => {
        setCells(prev => {
            const newCells = [...prev]
            if (!newCells[y]) {
                console.error('Invalid cell coordinates:', x, y)
                return prev
            }
            newCells[y] = [...prev[y]!]
            newCells[y][x] = selectedColor
            return newCells
        })
    }, [selectedColor])

    if (isLoading) {
        return <div className="flex justify-center items-center p-4 flex-col gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading grid...</span>
            {workerError && (
                <span className="text-sm text-yellow-600">Worker error - using fallback generation...</span>
            )}
        </div>
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="max-h-[70vh] max-w-[95vw] overflow-auto">
                <OptimizedPixelArtGrid
                    cells={cells}
                    updateCell={updateCell}
                />
            </div>
            <ColorPickerContainer
                convertTo={convertTo}
                colors={colors}
            />
            <button
                className='p-2 cursor-pointer bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md'
                onClick={() => convertTo === 'lamp' ? props.setPixelArt(getDecimalColorsFromCanvas(
                (() => {
                    const canvas = document.createElement('canvas');
                    canvas.width = cells[0]!.length;
                    canvas.height = cells.length;
                    const ctx = canvas.getContext('2d')!;
                    
                    cells.forEach((row, y) => {
                        row.forEach((color, x) => {
                            ctx.fillStyle = '#' + color;
                            ctx.fillRect(x, y, 1, 1);
                        });
                    });
                    
                    return canvas;
                })()
                )) : props.setPixelArt(cells)}
            >
                Continue
            </button>
        </div>
    )
}

export default function PixelArtPage(props: Props) {
    const { isAllowedRefinedTiles, convertTo } = useContext(SettingsContext)
    const initialColor =
        convertTo === "tile" ? (isAllowedRefinedTiles ? allTileColorsArr[0] : basicTileColorsArr[0]
        ) : "000000"

    return (
        <ColorProvider initialColor={initialColor!}>
            <PixelArtPageContent {...props} />
        </ColorProvider>
    )
}
