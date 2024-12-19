import { memo } from 'react'
import PixelArtCell from './pixelArtCell'
type Props = {
    cells: string[][],
    // eslint-disable-next-line no-unused-vars
    updateCell: (x: number, y: number) => void
}

export default memo(function PixelArtGrid({ cells, updateCell }: Props) {
    return (
        <div className='max-h-[70vh] max-w-[90vw] relative overflow-auto'>

            <div className="flex overflow-auto">
                {cells.map((cellrow, rindex) => (
                    <div className="flex flex-col justify-center" key={cellrow.length * rindex}>
                        {cellrow.map((cell, cindex) => (
                            <PixelArtCell x={cindex} y={rindex} color={cell} updateCell={updateCell} key={cellrow.length * rindex + cindex} />
                        ))}
                    </div>
                ))}
            </div>

        </div>

    )
})
