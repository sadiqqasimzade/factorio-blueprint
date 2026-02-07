import { allTileColorsArr, basicTileColorsArr } from '@/consts/colorsEnum'
import { ColorProvider, useColor } from '@/contexts/pixelArt/colorContext'
import SettingsContext from '@/contexts/settings/settingsContext'
import { useCallback, useContext, useMemo } from 'react'
import ColorPickerContainer from './colorPickerContainer'
import { usePixelArtWorker } from './hooks/usePixelArtWorker'
import PixelArtGrid from './OptimizedPixelArtGrid'
import PixelArtActions from './PixelArtActions'

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

    const colors = useMemo(() =>
        isAllowedRefinedTiles ? allTileColorsArr : basicTileColorsArr,
        [isAllowedRefinedTiles]
    )

    const { cells, setCells, isLoading } = usePixelArtWorker({
        type: props.type,
        sizex: props.type === 'size' ? props.sizex : undefined,
        sizey: props.type === 'size' ? props.sizey : undefined,
        resultCanvas: props.type === 'canvas' ? props.resultCanvas : undefined,
        colors
    })

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
    }, [selectedColor, setCells])

    if (isLoading) {
        return <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading grid...</span>
        </div>
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="max-h-[70vh] max-w-[95vw] overflow-auto">
                <PixelArtGrid
                    cells={cells}
                    updateCell={updateCell}
                />
            </div>
            <ColorPickerContainer
                convertTo={convertTo}
                colors={colors}
            />
            <PixelArtActions
                convertTo={convertTo}
                setPixelArt={props.setPixelArt}
                cells={cells}
            />
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