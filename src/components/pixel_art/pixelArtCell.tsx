import { memo } from 'react'

type Props = {
    x: number,
    y: number,
    color: string
    // eslint-disable-next-line no-unused-vars
    updateCell: (x: number, y: number) => void
}

export default memo(function PixelArtCell({ color, updateCell, x, y }: Props) {
    return (
        <div className="w-5 h-5 outline outline-black" style={{ backgroundColor: "#" + color }} onClick={() => { updateCell(x, y) }} ></div>
    )
})

