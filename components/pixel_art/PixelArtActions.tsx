import { getDecimalColorsFromCanvas } from '@/utils/image/calculateColors'
import { memo } from 'react'

type Props = {
    convertTo: "tile" | "lamp" | "platform"
    setPixelArt: React.Dispatch<React.SetStateAction<string[][] | number[][] | undefined>>
    cells: string[][]
}

function PixelArtActions({ convertTo, setPixelArt, cells }: Props) {

    const handleContinue = () => {
        if (convertTo === 'lamp') {
            const canvas = document.createElement('canvas')
            canvas.width = cells[0]!.length
            canvas.height = cells.length
            const ctx = canvas.getContext('2d')!

            cells.forEach((row, y) => {
                row.forEach((color, x) => {
                    ctx.fillStyle = '#' + color
                    ctx.fillRect(x, y, 1, 1)
                })
            })

            setPixelArt(getDecimalColorsFromCanvas(canvas))
        } else {
            setPixelArt(cells)
        }
    }

    return (
        <button
            className='p-2 cursor-pointer bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md'
            onClick={handleContinue}
        >
            Continue
        </button>
    )
}

export default memo(PixelArtActions)
