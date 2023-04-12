import React,{memo} from 'react'
import styles from './PixelArtGrid.module.scss'
type Props = {
    x: number,
    y: number,
    color: string
    updateCell: (x: number, y: number) => void
}

const Cell = ({ color,updateCell,x,y }: Props) => {
    return (
        <div className={styles['cell']} style={{ '--color': `#${color}`}} onClick={()=>{updateCell(x,y)}} ></div>
    )
}

export default memo(Cell)