import Container from "@/src/components/shared/container";
import SettingsContext from "@/src/contexts/settings/settingsContext";
import blueprintEncoder from "@/src/utils/convertors/blueprintEncoder";
import { CreateMemoryBlock } from "@/src/utils/convertors/videoToBlueprintConvertor";
import clickCopyHandler from "@/src/utils/handlers/clickCopyHandler";
import { getDecimalColorsFromCanvas } from "@/src/utils/image/calculateColors";
import Head from "next/head";
import { useRef, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";


export default function VideoConverter() {
    const { minHeight, minWidth, maxHeightForLamps, maxWidthForVideo, quality, setQuality } = useContext(SettingsContext);



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
            progress.textContent = `${currentTime}/${duration} seconds (${Math.floor((currentTime / duration) * 100)}%)`;

            // When video ends, create the blueprint
            if (video.ended) {
                video.pause();
                const blueprint = CreateMemoryBlock(images, quality);
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
    }, [width, height, quality]);


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
                <p className="text-red-500 text-2xl font-bold">Still in development, please report any issues</p>
                <div className="flex gap-4 items-center md:flex-row flex-col">
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

                                let newWidth = maxWidthForVideo;
                                let newHeight = maxHeightForLamps;

                                if (videoWidth > videoHeight) {
                                    newHeight = Math.min(maxHeightForLamps, Math.floor(maxWidthForVideo / aspectRatio));
                                } else {
                                    newWidth = Math.min(maxWidthForVideo, Math.floor(maxHeightForLamps * aspectRatio));
                                }

                                setWidth(newWidth);
                                setHeight(newHeight);
                            };
                        }
                    }} />
                    <p className="flex">Progress: <span ref={progressRef}>Not started</span></p>
                </div>
                <div className="flex gap-2 justify-between md:flex-row flex-col">
                    <div className="flex flex-col gap-2 w-full">
                        <label>Width</label>
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={width} onChange={(e) => {
                            const newWidth = Math.min(maxWidthForVideo, Number(e.target.value));
                            setWidth(newWidth);
                            setHeight(Math.min(maxHeightForLamps, Math.round(newWidth / aspectRatio)));
                        }} min={minWidth} max={maxWidthForVideo} />
                        <label>min:{minWidth} max:{maxWidthForVideo} </label>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Height</label>
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={height} onChange={(e) => {
                            const newHeight = Math.min(maxHeightForLamps, Number(e.target.value));
                            setHeight(newHeight);
                            setWidth(Math.min(maxWidthForVideo, Math.round(newHeight * aspectRatio)));
                        }} min={minHeight} max={maxHeightForLamps} />
                        <label>min:{minHeight} max:{maxHeightForLamps} </label>
                    </div>
                    <div className="flex flex-col w-full">
                        <p className="text-xl font-bold">Substation quality</p>
                        <div className="flex gap-4 py-2">
                            {[0, 1, 2, 3, 4, 5].map((value) => (
                                <label key={value} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value={value}
                                        checked={quality === value}
                                        onChange={(e) => setQuality(Number(e.target.value))}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                        <p>0 for no substations, 1 for base game</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>.</label>
                        <button className="px-2 py-1 w-full rounded-md bg-blue-400 hover:bg-blue-800 transition-colors text-gray-800 hover:text-white" onClick={() => {
                            if (width < minWidth || width > maxWidthForVideo || isNaN(width)) {
                                toast.error("Please enter a valid width")
                            }
                            else if (height < minHeight || height > maxHeightForLamps || isNaN(height)) {
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
