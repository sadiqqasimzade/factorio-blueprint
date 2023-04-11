import React, { useState } from 'react'
import styles from './PixelArtPage.module.scss'
import PixelArtGrid from '../../components/pixel_art_grid/PixelArtGrid'
import ColorPicker from '../../components/color_picker/ColorPicker'
import { colorsArr } from '../../../domain/entity/stuctures/Enums'
type Props = {
    sizex: number,
    sizey: number,
    resultCanvas?: undefined
} | {
    sizex?: undefined,
    sizey?: undefined,
    resultCanvas: HTMLCanvasElement
}

const PixelArtPage = ({ sizex, sizey,resultCanvas }: Props) => {

    if(typeof(sizex)!='number'){
        sizex=resultCanvas.width
        sizey=resultCanvas.height
    } 

 
    const [cells, setCells] = useState(Array<string[]>(sizex).fill(Array<string>(sizey).fill("ffffff")))
    const [selectedColor, setSelectedColor] = useState(colorsArr[0])

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

            }} />
        </div>
    )
}

export default PixelArtPage