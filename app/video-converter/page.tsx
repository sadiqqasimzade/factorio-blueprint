"use client"

import SettingsContext from "@/contexts/settings/settingsContext";
import { useAspectRatioResize } from "@/hooks/useAspectRatioResize";
import { getDecimalColorsFromCanvas } from "@/utils/image/calculateColors";
import { decompressFrames, ParsedFrame, parseGIF } from "gifuct-js";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import VideoPreview from "./components/VideoPreview";
import VideoResult from "./components/VideoResult";
import VideoSettings from "./components/VideoSettings";




export default function VideoConverter() {
    const { minHeight, minWidth, maxHeightForLamps, maxWidthForVideo, quality, setQuality } = useContext(SettingsContext);



    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);
    const resultRef = useRef<HTMLParagraphElement>(null);
    const convertButtonRef = useRef<HTMLButtonElement>(null);
    const blueprintWorkerRef = useRef<Worker | null>(null);


    const [originalWidth, setOriginalWidth] = useState<number>(0);
    const [originalHeight, setOriginalHeight] = useState<number>(0);
    const [frameRate, setFrameRate] = useState<number>(30)
    const [skippedFrames, setSkippedFrames] = useState<number>(2)
    const [screenUps, setScreenUps] = useState(10)
    const [loopWithoutBlankFrame, setLoopWithoutBlankFrame] = useState(true)
    const [readyToStart, setReadyToStart] = useState(false)
    const [gifFrames, setGifFrames] = useState<ParsedFrame[]>()
    const [isGenerating, setIsGenerating] = useState(false);
    const { width, height, setWidth, setHeight,aspectRatio } = useAspectRatioResize(
        originalWidth,
        originalHeight,
        {
            minWidth,
            minHeight,
            maxWidth: maxWidthForVideo,
            maxHeight: maxHeightForLamps,
        }
    );

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
            const frame = gifFrames![i]!;
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
        const progress = progressRef.current;
        if (progress) progress.textContent = "Generating blueprint...";
        setIsGenerating(true);

        const worker = new Worker(new URL("../../workers/blueprintWorker.ts", import.meta.url));
        blueprintWorkerRef.current = worker;

        worker.onmessage = (e: MessageEvent<string>) => {
            const encoded = e.data;
            if (resultRef.current) resultRef.current.textContent = encoded;
            if (progress) progress.textContent = "Done!";
            setIsGenerating(false);
            worker.terminate();
            blueprintWorkerRef.current = null;
        };

        worker.onerror = (error) => {
            console.error("Worker error:", error);
            if (progress) progress.textContent = "Error generating blueprint!";
            setIsGenerating(false);
            worker.terminate();
            blueprintWorkerRef.current = null;
        };

        worker.postMessage({
            images,
            quality,
            screenUps,
            loopWithoutBlankFrame,
        });
    };

    useEffect(() => {
        return () => {
            if (blueprintWorkerRef.current) {
                blueprintWorkerRef.current.terminate();
                blueprintWorkerRef.current = null;
            }
        };
    }, []);

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

            setOriginalHeight(newHeight)
            setOriginalWidth(newWidth)
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

        setOriginalHeight(newHeight)
        setOriginalWidth(newWidth)
        setGifFrames(decompressedFrames)

        // Calculate frame rate for GIF and set in-game update speed
        const gifFrameRate = 1000 / decompressedFrames[0]!.delay; // Delay is in ms
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
                    <VideoSettings
                        minWidth={minWidth}
                        maxWidth={maxWidthForVideo}
                        minHeight={minHeight}
                        maxHeight={maxHeightForLamps}
                        width={width}
                        height={height}
                        aspectRatio={aspectRatio}
                        setWidth={setWidth}
                        setHeight={setHeight}
                        skippedFrames={skippedFrames}
                        setSkippedFrames={setSkippedFrames}
                        screenUps={screenUps}
                        setScreenUps={setScreenUps}
                        loopWithoutBlankFrame={loopWithoutBlankFrame}
                        setLoopWithoutBlankFrame={setLoopWithoutBlankFrame}
                        quality={quality}
                        setQuality={setQuality}
                        readyToStart={readyToStart}
                        handleVideoInput={handleVideoInput}
                        handleGifInput={handleGifInput}
                        isGenerating={isGenerating}
                        onConvert={() => {
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
                        convertButtonRef={convertButtonRef}
                    />

                    <section className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
                        <VideoPreview
                            canvasRef={canvasRef}
                            progressRef={progressRef}
                            isGenerating={isGenerating}
                        />

                        <VideoResult
                            resultRef={resultRef}
                        />
                    </section>
                </div>
            </div>
        </>
    );
}
