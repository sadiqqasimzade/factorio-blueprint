import React from 'react'
import styles from './ColorPicker.module.scss'
import { colorsArr } from '../../../domain/entity/stuctures/Enums'
type Props = {
    selectedColor: string,
    setColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorPicker = ({ selectedColor, setColor }: Props) => {
    return (
        <div className={styles['row']}>
            {colorsArr.map((color, index) => <div className={`${styles['color']} ${color == selectedColor ? styles['active'] : ''}`} style={{ '--color': `#${color}` }} key={index} onClick={() => {
                color == selectedColor ? '' : setColor(color)
            }}></div>)
            }
        </div >
    )
}

export default ColorPicker