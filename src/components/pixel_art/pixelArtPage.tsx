import { useCallback, useState } from 'react'
import { lampColorsArr, tileColorsArr } from '@/src/consts/colorsEnum'
import { calculateColorsInCanvas } from '@/src/utils/image/calculateColors'
import ColorPicker from './colorPicker'
import PixelArtGrid from './pixelArtGrid'

type Props = {
    sizex: number,
    sizey: number,
    resultCanvas?: undefined,
    setPixelArt: React.Dispatch<React.SetStateAction<string[][] | undefined>>
    convertTo: 'lamp' | 'brick'

} | {
    sizex?: undefined,
    sizey?: undefined,
    resultCanvas: HTMLCanvasElement,
    setPixelArt: React.Dispatch<React.SetStateAction<string[][] | undefined>>
    convertTo: 'lamp' | 'brick'
}

export default function PixelArtPage({ sizex, sizey, resultCanvas, setPixelArt, convertTo }: Props) {

    const [cells, setCells] = useState(typeof (sizex) === 'number' ?
        Array<string[]>(sizex).fill(Array<string>(sizey!).fill(convertTo === 'lamp' ? lampColorsArr[0] : tileColorsArr[0])) :
        calculateColorsInCanvas(resultCanvas, convertTo === 'lamp' ? lampColorsArr : tileColorsArr))

    const [selectedColor, setSelectedColor] = useState(convertTo === 'lamp' ? lampColorsArr[0] : tileColorsArr[0])
    const colors = convertTo === 'lamp' ? lampColorsArr : tileColorsArr

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
