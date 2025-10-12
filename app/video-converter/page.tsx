"use client"

import FileDropZone from "@/components/drag_and_drop/FileDropZone";
import SettingsContext from "@/contexts/settings/settingsContext";
import clickCopyHandler from "@/utils/handlers/clickCopyHandler";
import { getDecimalColorsFromCanvas } from "@/utils/image/calculateColors";
import { decompressFrames, ParsedFrame, parseGIF } from "gifuct-js";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


const qualities = [
    "/imgs/entities/quality 0.webp",
    "/imgs/entities/quality 1.webp",
    // "/imgs/entities/quality 2.webp",
    // "/imgs/entities/quality 3.webp",
    // "/imgs/entities/quality 4.webp",
    // "/imgs/entities/quality 5.webp",
]

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
    const [skippedFrames, setSkippedFrames] = useState<number>(2)
    const [screenUps, setScreenUps] = useState(10)
    const [loopWithoutBlankFrame, setLoopWithoutBlankFrame] = useState(true)
    const [readyToStart, setReadyToStart] = useState(false)
    const [gifFrames, setGifFrames] = useState<ParsedFrame[]>()
    const [isGenerating, setIsGenerating] = useState(false);


    useEffect(() => {
        setScreenUps(Math.min(60, Math.max(1, Math.round(frameRate / (1 + skippedFrames)))))
    }, [skippedFrames])

    const extractVideoFrames = async () => {
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

            for (let i = 0; i <= totalFrames; i += 1 + skippedFrames) {
                const currentTime = i * frameInterval;
                progress.textContent = `${Math.floor((currentTime / duration) * 100)}%`;
                await captureFrame(currentTime);
            }

        };

        extract().then(() => {
            generateResult(images)
        });
    }

    const extractGifFrames = async () => {
        const currentCanvas = canvasRef.current as HTMLCanvasElement;
        const currentCanvasCtx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;

        // Set the canvas dimensions to match the desired output dimensions
        currentCanvas.width = width;
        currentCanvas.height = height;

        const images: number[][][] = []; // Store resized frames

        for (let i = 0; i < gifFrames!.length; i += 1 + skippedFrames) {
            const frame = gifFrames![i];
            // Create a temporary canvas for the original GIF frame
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = frame.dims.width;
            tempCanvas.height = frame.dims.height;

            const tempCtx = tempCanvas.getContext("2d")!;
            const imageData = tempCtx.createImageData(frame.dims.width, frame.dims.height);
            imageData.data.set(frame.patch); // Set the pixel data for the frame
            tempCtx.putImageData(imageData, 0, 0);

            // Draw the resized frame onto the current canvas
            currentCanvasCtx.clearRect(0, 0, width, height); // Clear previous frame
            currentCanvasCtx.drawImage(
                tempCanvas,
                0, 0, frame.dims.width, frame.dims.height, // Source dimensions
                0, 0, width, height // Destination dimensions (resized)
            );

            // Extract colors from the resized canvas
            const frameColors = getDecimalColorsFromCanvas(currentCanvas);
            images.push(frameColors);
        }
        generateResult(images);
    };


    const getFrameRate = async () => {
        // Part 1:
        const vid = videoRef.current as HTMLVideoElement;
        let last_media_time: number, last_frame_num: number, fps: number;
        const fps_rounder: number[] = [];
        let frame_not_seeked = true;
        progressRef.current!.textContent = "Getting framerate..."

        // Part 2 (with some modifications):
        function ticker(_: unknown, metadata: { mediaTime: number; presentedFrames: number }) {
            const media_time_diff = Math.abs(metadata.mediaTime - last_media_time);
            const frame_num_diff = Math.abs(metadata.presentedFrames - last_frame_num);
            const diff = media_time_diff / frame_num_diff;
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
            setScreenUps(Math.min(60, Math.max(1, Math.round(fps as number / (1 + skippedFrames)))))
        }
        )
    }

    const generateResult = (images: number[][][]) => {
        const progress = progressRef.current as HTMLSpanElement;
        setIsGenerating(true);
        progress.textContent = 'Generating blueprint...';

        // Create a new worker
        const worker = new Worker(new URL('../../workers/blueprintWorker.ts', import.meta.url));

        // Listen for the result
        worker.onmessage = (e) => {
            const encoded = e.data;
            if (resultRef.current) {
                resultRef.current.textContent = encoded;
            }
            progress.textContent = 'Done!';
            setIsGenerating(false);
            worker.terminate();
        };

        // Handle any errors
        worker.onerror = (error) => {
            console.error('Worker error:', error);
            progress.textContent = 'Error generating blueprint!';
            setIsGenerating(false);
            worker.terminate();
        };

        // Send data to worker
        worker.postMessage({
            images,
            quality,
            screenUps,
            loopWithoutBlankFrame
        });
    }

    const handleVideoInput = (file: File) => {
        const videoURL = URL.createObjectURL(file);
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
            setGifFrames(undefined);

            getFrameRate().then(() => {
                progressRef.current!.textContent = "Ready to start"
                setReadyToStart(true)
            })
        };
    }

    const handleGifInput = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();

        const gif = parseGIF(arrayBuffer);
        const decompressedFrames = decompressFrames(gif, true);

        const gifWidth = gif.lsd.width;
        const gifHeight = gif.lsd.height;

        const ratio = gifWidth / gifHeight;

        let newWidth = maxWidthForVideo;
        let newHeight = maxHeightForLamps;

        if (gifWidth > gifHeight) {
            newHeight = Math.min(maxHeightForLamps, Math.floor(maxWidthForVideo / ratio));
        } else {
            newWidth = Math.min(maxWidthForVideo, Math.floor(maxHeightForLamps * ratio));
        }

        setWidth(newWidth);
        setHeight(newHeight);
        setAspectRatio(ratio);
        setGifFrames(decompressedFrames)

        // Calculate frame rate for GIF and set in-game update speed
        const gifFrameRate = 1000 / decompressedFrames[0].delay; // Delay is in ms
        setFrameRate(gifFrameRate)
        setScreenUps(Math.min(60, Math.max(1, Math.round(gifFrameRate / (1 + skippedFrames)))))

        progressRef.current!.textContent = "Ready to start"
        setReadyToStart(true)
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <video muted ref={videoRef} className="hidden" />

                <div className="rounded-md border border-neutral-700 bg-neutral-900/60 p-3 text-sm text-neutral-200">
                    Still in development, please report any issues
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold">Video to Blueprint Converter</h1>
                    <p className="text-neutral-300">Convert videos or GIFs into Factorio blueprints with customizable settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <section className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
                        <div className="flex flex-col gap-2">
                            <FileDropZone
                                fileType="video/*,.gif"
                                label="Drag & drop your video or GIF here"
                                description="or click to browse"
                                openPixelArtEditorInstead={false}
                                onFileAccepted={(file) => {
                                    if (file.type === 'image/gif') {
                                        handleGifInput(file)
                                    }
                                    else {
                                        handleVideoInput(file)
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-neutral-300">Width</label>
                                <input
                                    type="number"
                                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={width}
                                    disabled={!readyToStart}
                                    onChange={(e) => {
                                        const newWidth = Math.min(maxWidthForVideo, Number(e.target.value));
                                        setWidth(newWidth);
                                        setHeight(Math.min(maxHeightForLamps, Math.round(newWidth / aspectRatio)));
                                    }}
                                    min={minWidth}
                                    max={maxWidthForVideo}
                                />
                                <p className="text-xs text-neutral-400">min: {minWidth} • max: {maxWidthForVideo}</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-neutral-300">Height</label>
                                <input
                                    type="number"
                                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={height}
                                    disabled={!readyToStart}
                                    onChange={(e) => {
                                        const newHeight = Math.min(maxHeightForLamps, Number(e.target.value));
                                        setHeight(newHeight);
                                        setWidth(Math.min(maxWidthForVideo, Math.round(newHeight * aspectRatio)));
                                    }}
                                    min={minHeight}
                                    max={maxHeightForLamps}
                                />
                                <p className="text-xs text-neutral-400">min: {minHeight} • max: {maxHeightForLamps}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-neutral-300">Skip Frames</label>
                                <input
                                    type="number"
                                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={skippedFrames}
                                    disabled={!readyToStart}
                                    min={0}
                                    onChange={(e) => {
                                        setSkippedFrames(Number(e.target.value))
                                    }}
                                />
                                <p className="text-xs text-neutral-400">Skip frames to reduce result size. UPS adjusts to maintain speed.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-neutral-300">Screen UPS</label>
                                <input
                                    type="number"
                                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={screenUps}
                                    disabled={!readyToStart}
                                    min={1}
                                    max={60}
                                    onChange={(e) => {
                                        setScreenUps(Number(e.target.value))
                                    }}
                                />
                                <p className="text-xs text-neutral-400">Max 60</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                id="loop-without-blank"
                                type="checkbox"
                                className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-blue-500 focus:ring-blue-500"
                                checked={loopWithoutBlankFrame}
                                disabled={!readyToStart}
                                onChange={(e) => {
                                    setLoopWithoutBlankFrame(e.target.checked)
                                }}
                            />
                            <label htmlFor="loop-without-blank" className="text-sm text-neutral-300">Loop without blank frame</label>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-semibold">Substation quality</p>
                            <div className="flex gap-4 py-1">
                                {qualities.map((value, index) => (
                                    <label key={index} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            value={index}
                                            checked={quality === index}
                                            disabled={!readyToStart}
                                            onChange={() => setQuality(index)}
                                            className="h-4 w-4"
                                        />
                                        {index}
                                        <Image src={value} alt={`Quality ${qualities.indexOf(value)}`} width={20} height={20} />
                                    </label>
                                ))}
                            </div>
                            <p className="text-xs text-neutral-400">0 for no substations, 1 for base game.More options coming soon.......</p>
                        </div>

                        <div className="pt-2">
                            <button
                                ref={convertButtonRef}
                                disabled={!readyToStart || isGenerating}
                                className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => {
                                    if (width < minWidth || width > maxWidthForVideo || isNaN(width)) {
                                        toast.error("Please enter a valid width")
                                    }
                                    else if (height < minHeight || height > maxHeightForLamps || isNaN(height)) {
                                        toast.error("Please enter a valid height")
                                    }
                                    else if (skippedFrames < 0 || isNaN(skippedFrames)) {
                                        toast.error("Please enter a valid skip frames")
                                    }
                                    else if (screenUps < 1 || screenUps > 60 || isNaN(screenUps)) {
                                        toast.error("Please enter a valid in game update speed")
                                    }
                                    else if (gifFrames) {
                                        extractGifFrames()
                                    }
                                    else if (videoRef.current?.readyState === 0) {
                                        toast.error("Load video first")
                                    }
                                    else if (videoRef.current?.readyState !== 4) {
                                        toast.error("Video is not loaded yet")
                                    }
                                    else {
                                        extractVideoFrames()
                                    }
                                }}
                            >
                                Convert
                            </button>
                        </div>
                    </section>

                    <section className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm text-neutral-300">Current Frame</p>
                            <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                                <canvas ref={canvasRef} className="max-w-full" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-neutral-300">Status</p>
                            <div className="flex items-center justify-between rounded-md border border-neutral-700 bg-neutral-800/50 px-3 py-2">
                                <span className="text-sm">Progress: <span ref={progressRef}>Waiting input</span></span>
                                {isGenerating && <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-semibold">Result</p>
                            <p
                                ref={resultRef}
                                onClick={(e) => { clickCopyHandler(e).then(result => result ? toast.success('Successfully copied') : toast.error('Unable to copy')) }}
                                className="max-h-80 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800/50 p-3 text-sm break-all cursor-pointer hover:border-blue-500 transition-colors"
                            />
                            <p className="text-xs text-neutral-400">Click the result to copy</p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
