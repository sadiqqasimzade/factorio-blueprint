import React, { useState } from 'react'
import styles from './PixelArtPage.module.scss'
import PixelArtGrid from '../../components/pixel_art_grid/PixelArtGrid'
import ColorPicker from '../../components/color_picker/ColorPicker'
import { colorsArr } from '../../../domain/entity/stuctures/Enums'
import { calculateColors } from '../../utils/image/calculateColors'
type Props = {
    sizex: number,
    sizey: number,
    resultCanvas?: undefined,
    setPixelArt?: undefined
} | {
    sizex?: undefined,
    sizey?: undefined,
    resultCanvas: HTMLCanvasElement,
    setPixelArt: React.Dispatch<React.SetStateAction<string[][]>>
}

const PixelArtPage = ({ sizex, sizey, resultCanvas, setPixelArt }: Props) => {

    const [cells, setCells] = useState(typeof (sizex) == 'number' ? Array<string[]>(sizex).fill(Array<string>(sizey).fill("ffffff")) : calculateColors(resultCanvas))
    const [selectedColor, setSelectedColor] = useState(colorsArr[0])
    
    if (typeof (sizex) != 'number') {
        sizex = resultCanvas.width
        sizey = resultCanvas.height
    }

    const updateCell = (x: number, y: number) => {
        const temp = cells.map((arr) => [...arr]);
        temp[y][x] = selectedColor
        setCells(temp)
    }

    return (
        <div className={styles['grid']}>
            <PixelArtGrid cells={cells} updateCell={updateCell} />
            <ColorPicker selectedColor={selectedColor} setColor={setSelectedColor} />
            <button onClick={(e) => {
                setPixelArt(cells)
            }} />
        </div>
    )
}

export default PixelArtPage