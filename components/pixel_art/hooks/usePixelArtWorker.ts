import { useEffect, useState } from 'react'

type UsePixelArtWorkerProps = {
    type: 'size' | 'canvas'
    sizex?: number
    sizey?: number
    resultCanvas?: HTMLCanvasElement
    colors: string[]
}

export function usePixelArtWorker({ type, sizex, sizey, resultCanvas, colors }: UsePixelArtWorkerProps) {
    const [cells, setCells] = useState<string[][]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const worker = new Worker(new URL('../../../workers/gridWorker.ts', import.meta.url))

        worker.onmessage = (e) => {
            setCells(e.data)
            setIsLoading(false)
        }

        worker.onerror = (error) => {
            console.error('Worker error:', error)
            setIsLoading(false)
        }

        if (type === 'size') {
            worker.postMessage({
                type: 'generate_empty',
                data: {
                    sizex: sizex!,
                    sizey: sizey!,
                    allowedColors: colors
                }
            })
        } else {
            const canvas = resultCanvas!
            const ctx = canvas.getContext('2d')!
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

            worker.postMessage({
                type: 'calculate_from_canvas',
                data: {
                    imageData,
                    allowedColors: colors
                }
            })
        }

        return () => worker.terminate()
    }, [type, sizex, sizey, resultCanvas, colors])

    return { cells, setCells, isLoading }
}
