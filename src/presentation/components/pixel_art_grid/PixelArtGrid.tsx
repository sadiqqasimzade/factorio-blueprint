import React, { memo } from 'react'
import styles from './PixelArtGrid.module.scss'
import Cell from './Cell'
type Props = {
    cells: string[][],
    updateCell: (x:number,y:number)=>void
}

const PixelArtGrid = ({ cells,updateCell }: Props) => {
    return (
        <>
            <div className={styles['overflow']}>
                {cells.map((cellrow, rindex) => (
                    <div className={styles['row']} key={cellrow.length * rindex}>
                        {cellrow.map((cell, cindex) => (
                            <Cell x={cindex} y={rindex} color={cell} updateCell={updateCell} key={cellrow.length * rindex + cindex} />
                        ))}
                    </div>
                )
                )}
            </div>
        </>

    )
}

export default memo(PixelArtGrid)