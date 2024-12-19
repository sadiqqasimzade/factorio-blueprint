import { allTileColorsArr, basicTileColorsArr } from '@/src/consts/colorsEnum'
import { calculateClosestColorsInCanvas } from '@/src/utils/image/calculateColors'
import { useCallback, useContext, useState } from 'react'
import ColorPicker from './colorPicker'
import PixelArtGrid from './pixelArtGrid'
import SettingsContext from '@/src/contexts/settings/settingsContext'
type Props = {
    sizex: number,
    sizey: number,
    resultCanvas?: undefined,
    setPixelArt: React.Dispatch<React.SetStateAction<string[][] | number[][] | undefined>>
} | {
    sizex?: undefined,
    sizey?: undefined,
    resultCanvas: HTMLCanvasElement,
    setPixelArt: React.Dispatch<React.SetStateAction<string[][] | number[][] | undefined>>
}

export default function PixelArtPage({ sizex, sizey, resultCanvas, setPixelArt }: Props) {

    const { isAllowedRefinedTiles } = useContext(SettingsContext)

    const [cells, setCells] = useState((sizex && sizey) ?
        Array<string[]>(sizex).fill(Array<string>(sizey).fill(allTileColorsArr[0])) :
        calculateClosestColorsInCanvas(resultCanvas!, isAllowedRefinedTiles ? allTileColorsArr : basicTileColorsArr))
    // calculateClosestColorsInCanvas(resultCanvas!, tileColorsArr))

    const [selectedColor, setSelectedColor] = useState<string>(isAllowedRefinedTiles ? allTileColorsArr[0] : basicTileColorsArr[0])
    const colors = isAllowedRefinedTiles ? allTileColorsArr : basicTileColorsArr
    // const colors = tileColorsArr
    if (typeof (sizex) != 'number') {
        const canvas = resultCanvas as HTMLCanvasElement
        sizex = canvas.width
        sizey = canvas.height
    }

    const updateCell = useCallback((x: number, y: number) => {
        setCells(prev => prev!.map((col, j) => j === y ? col.map((cell, i) => i === x ? selectedColor : cell) : col))
    }, [selectedColor])



    return (
        <>
            <PixelArtGrid cells={cells} updateCell={updateCell} />
            <ColorPicker selectedColor={selectedColor} setColor={setSelectedColor} colors={colors} />
            <button className='p-2 bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md' onClick={() => {
                setPixelArt(cells)
            }}>Continue</button>
        </>
    )
}
