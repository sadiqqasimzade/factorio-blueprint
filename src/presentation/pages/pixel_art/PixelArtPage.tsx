import  { useState } from 'react'
import styles from './PixelArtPage.module.scss'
import PixelArtGrid from '../../components/pixel_art_grid/PixelArtGrid'
import ColorPicker from '../../components/color_picker/ColorPicker'
import { lampColorsArr, tileColorsArr } from '../../../domain/entity/stuctures/Enums'
import { calculateColorsInCanvas } from '../../utils/image/calculateColors'
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

const PixelArtPage = ({ sizex, sizey, resultCanvas, setPixelArt, convertTo }: Props) => {

    const [cells, setCells] = useState(typeof (sizex) == 'number' ?
        Array<string[]>(sizex).fill(Array<string>(sizey!).fill(convertTo == 'lamp' ? lampColorsArr[0] : tileColorsArr[0])) :
        calculateColorsInCanvas(resultCanvas, convertTo == 'lamp' ? lampColorsArr : tileColorsArr))

    const [selectedColor, setSelectedColor] = useState(convertTo == 'lamp' ? lampColorsArr[0] : tileColorsArr[0])
    const colors = convertTo == 'lamp' ? lampColorsArr : tileColorsArr

    if (typeof (sizex) != 'number') {
        let canvas = resultCanvas as HTMLCanvasElement
        sizex = canvas.width
        sizey = canvas.height
    }


    const updateCell =
        (x: number, y: number) => {
            const temp = cells.map((arr) => [...arr]);
            temp[y][x] = selectedColor
            setCells(temp)
        }

    return (
        <>
            <PixelArtGrid cells={cells} updateCell={updateCell} />
            <ColorPicker selectedColor={selectedColor} setColor={setSelectedColor} colors={colors} />
            <button className='button button__light' onClick={() => {
                setPixelArt(cells)
            }}>Continue</button>
        </>
    )
}

export default PixelArtPage