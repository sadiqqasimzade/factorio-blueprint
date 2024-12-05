import Container from "@/src/components/shared/container";
import blueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import { CreateMemoryBlock } from "@/src/utils/convertors/videoToBlueprintConvertor";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { getDecimalColorsFromCanvas } from "@/src/utils/image/calculateColors";
import Head from "next/head";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";


const minW = 5, maxW = 200, minH = 5, maxH = 80
export default function VideoConverter() {


    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null)
    const resultRef = useRef<HTMLParagraphElement>(null)

    
    const [width, setWidth] = useState<number>(50);
    const [height, setHeight] = useState<number>(50);
    const [aspectRatio, setAspectRatio] = useState<number>(1);




    useEffect(() => {
        const images: number[][][] = []
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const progress = progressRef.current as HTMLSpanElement;
        const video = videoRef.current as HTMLVideoElement;


        canvasRef.current!.width = width;
        canvasRef.current!.height = height;

        const drawFrame = () => {
            // Draw the current frame to canvas
            ctx.drawImage(video, 0, 0, width, height);
            
            // Get decimal colors from the canvas
            const frameColors = getDecimalColorsFromCanvas(canvas);
            images.push(frameColors);

            // Create a visual preview of the frame
            const framePreview = document.createElement('canvas');
            framePreview.width = width;
            framePreview.height = height;
            const frameCtx = framePreview.getContext('2d')!;
            frameCtx.drawImage(canvas, 0, 0);
            canvasContainerRef.current?.appendChild(framePreview);

            // Update progress
            const currentTime = Math.floor(video.currentTime);
            const duration = Math.floor(video.duration);
            progress.textContent = `${currentTime}/${duration} seconds (${Math.floor((currentTime/duration) * 100)}%)`;

            // When video ends, create the blueprint
            if (video.ended) {
                video.pause();
                const blueprint = CreateMemoryBlock(images);
                const encoded = blueprintEncoder(blueprint);
                if (resultRef.current) {
                    resultRef.current.textContent = encoded;
                }
                progress.textContent = 'Done!';
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
                <meta property="og:title" content="Video to Blueprint Converter" />
                <meta name="twitter:title" content="Video to Blueprint Converter" />
                <meta name="description" content="Effortlessly convert video into Factorio blueprints with this online tool. Transform your visual content into playable game elements seamlessly." />
                <meta property="og:description" content="Effortlessly convert video into Factorio blueprints with this online tool. Transform your visual content into playable game elements seamlessly." />
                <meta name="twitter:description" content="Effortlessly convert video into Factorio blueprints with this online tool. Transform your visual content into playable game elements seamlessly." />
            </Head>
            <div className="flex flex-col gap-4">
                <video muted ref={videoRef} className="hidden" />
                <p className="font-bold text-2xl">This generator creates very huge Blueprints even for 10 second video. I recommend using GIFs instead, you just need to convert them to videos.<a className="underline text-blue-400 hover:text-blue-800 transition-colors" target="_blank" href="https://convertio.co/gif-mp4/">Converter I used</a></p>
                <div className="flex gap-4 items-center">
                    <input type="file" accept="video/*" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const videoFile = e.target.files[0];
                            const videoURL = URL.createObjectURL(videoFile);
                            videoRef.current!.src = videoURL;

                            videoRef.current!.onloadedmetadata = () => {
                                const videoWidth = videoRef.current!.videoWidth;
                                const videoHeight = videoRef.current!.videoHeight;
                                const ratio = videoWidth / videoHeight;
                                setAspectRatio(ratio);
                                const aspectRatio = ratio;

                                let newWidth = maxW;
                                let newHeight = maxH;

                                if (videoWidth > videoHeight) {
                                    newHeight = Math.min(maxH, Math.floor(maxW / aspectRatio));
                                } else {
                                    newWidth = Math.min(maxW, Math.floor(maxH * aspectRatio));
                                }

                                setWidth(newWidth);
                                setHeight(newHeight);
                            };
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
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={width} onChange={(e) => {
                            const newWidth = Math.min(maxW, Math.max(minW, Number(e.target.value)));
                            setWidth(newWidth);
                            setHeight(Math.min(maxH, Math.max(minH, Math.round(newWidth / aspectRatio))));
                        }} min={minW} max={maxW} />
                        <label>min:{minW} max:{maxW} </label>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Height</label>
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={height} onChange={(e) => {
                            const newHeight = Math.min(maxH, Math.max(minH, Number(e.target.value)));
                            setHeight(newHeight);
                            setWidth(Math.min(maxW, Math.max(minW, Math.round(newHeight * aspectRatio))));
                        }} min={minH} max={maxH} />
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
                    <p ref={resultRef} onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Successfully copied') : toast.error('Unable to copy')) }} className="max-h-80 overflow-y-auto mt-5 break-all transition-all" />
                </div>
            </div>
        </Container>
    );
}

// export default function VideoConverterPage() {
//     return <>WIP</>
// }
