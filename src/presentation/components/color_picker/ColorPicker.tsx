import React from 'react'
import styles from './ColorPicker.module.scss'
type Props = {
    selectedColor: string,
    setColor: React.Dispatch<React.SetStateAction<string>>,
    colors:string[]
}

const ColorPicker = ({ selectedColor, setColor,colors }: Props) => {
    return (
        <div className={styles['row']}>
            {colors.map((color, index) => <div className={`${styles['color']} ${color == selectedColor ? styles['active'] : ''}`} style={{ '--color': `#${color}` }} key={index} onClick={() => {
                color == selectedColor ? '' : setColor(color)
            }}></div>)
            }
        </div >
    )
}

export default ColorPicker