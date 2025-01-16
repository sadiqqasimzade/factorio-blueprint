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
    const resultRef = useRef<HTMLParagraphElement>(null)
    const convertButtonRef = useRef<HTMLButtonElement>(null)



    const [width, setWidth] = useState<number>(50);
    const [height, setHeight] = useState<number>(50);
    const [aspectRatio, setAspectRatio] = useState<number>(1);
    const [frameRate, setFrameRate] = useState<number>(30)
    const [skipFrames, setSkipFrames] = useState<number>(2)
    const [inGameUpdateSpeed, setInGameUpdateSpeed] = useState(10)
    const [loopWithoutBlankFrame, setLoopWithoutBlankFrame] = useState(true)
    const [readyToStart, setReadyToStart] = useState(false)


    const extractFrames = async () => {
        const currentCanvas = canvasRef.current as HTMLCanvasElement;
        const currentCanvasCtx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
        const images: number[][][] = []
        const video = videoRef.current as HTMLVideoElement;
        const progress = progressRef.current as HTMLSpanElement;


        currentCanvas.width = width
        currentCanvas.height = height

        const captureFrame = (currentTime: number): Promise<void> => {
            return new Promise((resolve) => {
                video.currentTime = currentTime;

                video.onseeked = () => {
                    // Wait for the video frame to be fully decoded before drawing
                    if (video.readyState >= 2) { // Video has enough data to play
                        currentCanvasCtx.drawImage(video, 0, 0, width, height);

                        // Clone the canvas to store the current frame
                        const newCanvas = document.createElement("canvas");
                        newCanvas.width = currentCanvas.width;
                        newCanvas.height = currentCanvas.height;
                        const newCtx = newCanvas.getContext("2d");
                        if (newCtx) {
                            newCtx.drawImage(currentCanvas, 0, 0);
                            const frameColors = getDecimalColorsFromCanvas(currentCanvas);
                            images.push(frameColors);
                        }
                    }
                    resolve();
                };
            });
        };

        const extract = async () => {

            const duration = video.duration;
            const totalFrames = Math.floor(duration * frameRate);
            const frameInterval = 1 / frameRate;

            for (let i = 0; i < totalFrames; i += 1 + skipFrames) {
                const currentTime = i * frameInterval;
                progress.textContent = `${Math.floor((currentTime / duration) * 100)}%`;
                await captureFrame(currentTime);
            }

        };

        const generateResult = () => {
            console.log(loopWithoutBlankFrame)
            const blueprint = CreateMemoryBlock(images, quality, 60 / inGameUpdateSpeed, loopWithoutBlankFrame);
            const encoded = blueprintEncoder(blueprint);
            if (resultRef.current) {
                resultRef.current.textContent = encoded;
            }
            progress.textContent = 'Done!';
        }

        extract().then(() => {
            generateResult()
        });
    }


    const getFrameRate = async () => {
        // Part 1:
        const vid = videoRef.current as HTMLVideoElement;
        var last_media_time: number, last_frame_num: number, fps: number;
        var fps_rounder: number[] = [];
        var frame_not_seeked = true;
        progressRef.current!.textContent = "Getting framerate..."

        // Part 2 (with some modifications):
        function ticker(useless: any, metadata: any) {
            var media_time_diff = Math.abs(metadata.mediaTime - last_media_time);
            var frame_num_diff = Math.abs(metadata.presentedFrames - last_frame_num);
            var diff = media_time_diff / frame_num_diff;
            if (
                diff &&
                diff < 1 &&
                frame_not_seeked &&
                fps_rounder.length < 50 &&
                vid.playbackRate === 1 &&
                document.hasFocus()
            ) {
                fps_rounder.push(diff);
                fps = Math.round(1 / get_fps_average());
            }
            frame_not_seeked = true;
            last_media_time = metadata.mediaTime;
            last_frame_num = metadata.presentedFrames;
            vid.requestVideoFrameCallback(ticker);
        }
        vid.requestVideoFrameCallback(ticker);
        // Part 3:
        const callback = () => {
            fps_rounder.pop();
            frame_not_seeked = false;
        }
        vid.addEventListener("seeked", callback);
        // Part 4:
        function get_fps_average() {
            return fps_rounder.reduce((a, b) => a + b) / fps_rounder.length;
        }
        vid.play()

        await new Promise((resolve) => {
            setTimeout(() => {
                vid.pause()
                vid.removeEventListener("seeked", callback);
                resolve(fps)
            }, 3000);
        }).then((fps) => {
            setFrameRate(fps as number)
        })



    }



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
                <p className="flex text-2xl font-bold">Progress: <span ref={progressRef}>Waiting input</span></p>

                <div className="flex gap-4 items-center md:flex-row flex-col">
                    <input type="file" accept="video/*" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const videoFile = e.target.files[0];
                            const videoURL = URL.createObjectURL(videoFile);
                            const currentVideo = videoRef.current as HTMLVideoElement
                            currentVideo.src = videoURL;

                            currentVideo.onloadedmetadata = () => {
                                const videoWidth = currentVideo.videoWidth;
                                const videoHeight = currentVideo.videoHeight;

                                const ratio = videoWidth / videoHeight;

                                let newWidth = maxWidthForVideo;
                                let newHeight = maxHeightForLamps;

                                if (videoWidth > videoHeight) {
                                    newHeight = Math.min(maxHeightForLamps, Math.floor(maxWidthForVideo / ratio));
                                } else {
                                    newWidth = Math.min(maxWidthForVideo, Math.floor(maxHeightForLamps * ratio));
                                }

                                setWidth(newWidth);
                                setHeight(newHeight);
                                setAspectRatio(ratio);
                                // const quality = currentVideo.getVideoPlaybackQuality()
                                // console.log(currentVideo.duration , quality)
                                getFrameRate().then(() => {
                                    progressRef.current!.textContent = "Ready to start"
                                    setReadyToStart(true)
                                })
                            };
                        }
                    }} />
                </div>
                <div className="flex gap-6 justify-between md:flex-row flex-col">
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
                    <div className="flex flex-col gap-2 w-full">
                        <label>Skip Frames</label>
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={skipFrames} min={0} onChange={(e) => {
                            setSkipFrames(Number(e.target.value))
                        }} />
                        <label>Skip some frames to achive smaller result</label>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>In game frame counter speed</label>
                        <input type="number" className="text-black px-2 py-1 rounded-md" value={inGameUpdateSpeed} min={1} max={60} onChange={(e) => {
                            setInGameUpdateSpeed(Number(e.target.value))
                        }} />
                        <label>Max value 60</label>
                    </div>
                    <div className="flex flex-row gap-2 items-start w-full">
                        <label>Loop without blank frame <input type="checkbox" className="text-black px-2 py-1 rounded-md" checked={loopWithoutBlankFrame} onChange={(e) => {
                            setLoopWithoutBlankFrame(e.target.checked)
                        }} /></label>
                    </div>
                    <div className="flex flex-col w-full">
                        <p className="text-xl font-bold">Substation quality</p>
                        <div className="flex gap-4 py-2">
                            {/* 2, 3, 4, 5 */}
                            {[0, 1,].map((value) => (
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
                        <p>Better quality will be available someday....</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-transparent">.</label>
                        <button ref={convertButtonRef} disabled={!readyToStart} className="px-2 py-1 w-full rounded-md bg-gray-400 enabled:bg-blue-400 enabled:hover:bg-blue-800 transition-colors text-gray-800 enabled:hover:text-white" onClick={() => {
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
                                extractFrames()
                            }
                        }}>Convert</button>
                    </div>
                </div>
                <div>
                    <p>Current Frame</p>
                    <canvas ref={canvasRef} />
                </div>
                <div>
                    <p>Result</p>
                    <p ref={resultRef} onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Successfully copied') : toast.error('Unable to copy')) }} className="max-h-80 overflow-y-auto mt-5 break-all transition-all" />
                </div>
            </div>
        </Container >
    );
}

