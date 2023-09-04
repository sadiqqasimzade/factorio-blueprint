import React, { useEffect, useRef } from 'react';
import { calculateColorsForLamps, calculateColorsInCanvas } from '../../utils/image/calculateColors';
import { lampColorsArr, signals } from '../../../domain/entity/stuctures/Enums';
import imgToLampBlueprintConvertor from '../../utils/convertors/imgToLampBlueprintConvertor';
import blueprintEncoder from '../../utils/convertors/blueprintEncoder';
import BpEntity from '../../../domain/entity/models/BpEntity';
import { CreateMemoryBlock } from '../../utils/convertors/videoToBlueprintConvertor';
import BpConstCombinator from '../../../domain/entity/models/BpConstCombinator';
import Blueprint from '../../../domain/entity/models/Blueprint';
import Blueprint_Icon from "../../../domain/entity/models/BpIcon";
import BlueprintDecoder from '../../utils/convertors/blueprintDecoder';

interface VideoToBpProps {
    fps: number;
    width: number;
    height: number;
}

const VideoToBp: React.FC<VideoToBpProps> = ({ fps, width, height }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef<HTMLParagraphElement>(null);
    const lastFrameTimeRef = useRef<number>(0);

    useEffect(() => {
        const images: number[][][][] = []
        const extractFrames = () => {
            const video = videoRef.current as HTMLVideoElement;
            const array: Blob[] = [];
            const canvas = canvasRef.current as HTMLCanvasElement;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            const progress = progressRef.current as HTMLParagraphElement;
            let frameCount = 0;

            function initCanvas(this: HTMLVideoElement) {
                canvas.width = width;
                canvas.height = height;
            }

            const drawFrame = (time: number) => {
                lastFrameTimeRef.current = time;
                ctx.drawImage(video, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    array.push(blob as Blob);
                }, 'image/jpeg');

                progress.innerHTML = ((video.currentTime / video.duration) * 100).toFixed(2) + ' %';
                frameCount++;

                if (video.duration <= video.currentTime) {
                    // console.log(images)
                    const entities=CreateMemoryBlock(images)
                    const result: Blueprint = new Blueprint(
                        [new Blueprint_Icon(signals.signal_white, 1)],
                        entities,
                    );
                    console.log(blueprintEncoder({ blueprint: result }))


                    video.removeEventListener('timeupdate', drawFrame, false);
                    video.play();
                } else {
                    console.log('first')
                    const pixelArt = calculateColorsInCanvas(canvas, lampColorsArr)
                    images.push(calculateColorsForLamps(pixelArt))
                    video.play();
                }

            };

            video.muted = true;
            video.addEventListener('loadedmetadata', initCanvas, false);
            video.addEventListener('timeupdate', drawFrame, false);

            if (inputRef.current?.files && inputRef.current.files[0]) {
                video.src = URL.createObjectURL(inputRef.current.files[0]);
                video.play();
            }
        };

        inputRef.current?.addEventListener('change', extractFrames, false);

        return () => {
            inputRef.current?.removeEventListener('change', extractFrames, false);
        };
    }, [fps, width, height]);

    return (
        <div>
            <input type="file" accept="video/*" ref={inputRef} />
            <p id="progress" ref={progressRef}></p>
            <video ref={videoRef} style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{}}></canvas>
        </div>
    );
};

export default VideoToBp;
