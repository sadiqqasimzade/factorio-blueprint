import Container from "@/src/components/shared/container";
import { lampColorsArr } from "@/src/consts/colorsEnum";
import blueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import { CreateMemoryBlock } from "@/src/utils/convertors/videoToBlueprintConvertor";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { calculateColorsInCanvas, calculateColorsForLamps } from "@/src/utils/image/calculateColors";
import Head from "next/head";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VideoConverter() {
    const minW = 5, maxW = 200, minH = 5, maxH = 100


    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null)
    const resultRef = useRef<HTMLParagraphElement>(null)


    const [width, setWidth] = useState<number>(170);
    const [height, setHeight] = useState<number>(100);




    useEffect(() => {
        const images: number[][][][] = []
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const progress = progressRef.current as HTMLSpanElement;
        const video = videoRef.current as HTMLVideoElement;


        canvasRef.current!.width = width;
        canvasRef.current!.height = height;



        const drawFrame = () => {
            ctx.drawImage(video, 0, 0, width, height);

            progress.innerHTML = ((video.currentTime / video.duration) * 100).toFixed(2) + ' %';
            const newCanvas = document.createElement('canvas')
            newCanvas.width = width
            newCanvas.height = height
            const newCtx = newCanvas.getContext('2d')!
            newCtx.drawImage(canvas, 0, 0, width, height)
            canvasContainerRef.current?.appendChild(newCtx.canvas)
            if (video.duration <= video.currentTime) {
                const pixelArt = calculateColorsInCanvas(canvas, lampColorsArr)
                images.push(calculateColorsForLamps(pixelArt))
                const bp = CreateMemoryBlock(images)

                resultRef.current!.innerText = blueprintEncoder(bp)

                video.removeEventListener('timeupdate', drawFrame, false);
                video.play();
            } else {
                const pixelArt = calculateColorsInCanvas(canvas, lampColorsArr)
                images.push(calculateColorsForLamps(pixelArt))
                video.play();
            }
        }

        video.addEventListener('timeupdate', drawFrame, false);

        return () => {
            video.removeEventListener('timeupdate', drawFrame, false);
        };
    }, [width, height]);


    return (
        <Container>
            <Head>
                <title>Video to Blueprint Converter</title>
            </Head>
            <div className="flex flex-col gap-4">
                <video muted ref={videoRef} className="hidden"/>
                <p className="font-bold text-2xl">This generator creates very huge Blueprints even for 10 second video. I recommend using GIFs instead, you just need to convert them to videos. Converter I use:<a className="underline text-blue-400 hover:text-blue-800 transition-colors" href="https://convertio.co/gif-mp4/">https://convertio.co/gif-mp4/</a></p>
                <div className="flex gap-4 items-center">
                    <input type="file" accept="video/*" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            videoRef.current!.src = URL.createObjectURL(e.target.files[0]);
                        }
                    }} />
                    <p className="flex">Progress: <span ref={progressRef}>Not started</span></p>
                    {/* <div className="flex gap-2">
                        <label>Old version</label>
                        <input type="radio" name="version" value='true'/>
                        <label>New version</label>
                        <input type="radio" name="version" value='false'/>
                    </div> */}
                </div>
                <div className="flex gap-2 justify-between">
                    <div className="flex flex-col gap-2 w-full">
                        <label>Width</label>
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
                        <label>min:{minW} max:{maxW} </label>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Height</label>
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                        <label>min:{minH} max:{maxH} </label>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>.</label>
                        <button className="px-2 py-1 w-full rounded-md bg-blue-400 hover:bg-blue-800 transition-colors text-gray-800 hover:text-white" onClick={() => {
                            if (width < minW || width > maxW || isNaN(width)) {
                                toast.error("Please enter a valid width")
                            }
                            else if (height < minH || height > maxH || isNaN(height)) {
                                toast.error("Please enter a valid height")
                            }
                            else if (videoRef.current?.readyState === 0) {
                                toast.error("Load video first")
                            }
                            else if (videoRef.current?.readyState !== 4) {
                                toast.error("Video is not loaded yet")
                            }
                            else {
                                videoRef.current.play()
                            }
                        }}>Convert</button>
                    </div>
                </div>
                <div>
                    <p>Current Frame</p>
                    <canvas ref={canvasRef} />
                </div>
                <div>
                    <p>All Frames</p>
                    <div className="flex gap-2 flex-wrap" ref={canvasContainerRef}></div>
                </div>
                <div>
                    <p>Result</p>
                    <p ref={resultRef} onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Succesfully copied') : toast.error('Unable to copy')) }} className="h-96 overflow-y-auto mt-5 break-all transition-all" />
                </div>
            </div>
        </Container>
    );
}