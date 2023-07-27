import React, { useEffect, useRef } from 'react';
import { calculateColorsForLamps, calculateColorsInCanvas } from '../../utils/image/calculateColors';
import { lampColorsArr } from '../../../domain/entity/stuctures/Enums';
import imgToLampBlueprintConvertor from '../../utils/convertors/imgToLampBlueprintConvertor';
import blueprintEncoder from '../../utils/convertors/blueprintEncoder';

export default function VideoToBp({ fps, width, height }: { fps: number, width: number, height: number }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
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

            function drawFrame(this: HTMLVideoElement) {
                this.pause();
                ctx.drawImage(this, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    array.push(blob as Blob);
                }, 'image/jpeg');

                progress.innerHTML = ((this.currentTime / this.duration) * 100).toFixed(2) + ' %';
                frameCount++;

                if (this.duration <= this.currentTime) {
                    // const pixelArt = calculateColorsInCanvas(canvas, lampColorsArr)
                    // console.log(blueprintEncoder({
                    //     blueprint: imgToLampBlueprintConvertor(
                    //         pixelArt.length,
                    //         pixelArt[0].length,
                    //         calculateColorsForLamps(pixelArt)
                    //     )
                    // }))

                    this.removeEventListener('timeupdate', drawFrame, false);
                    this.play()
                } else {
                    console.log('fc:' + frameCount + '\ndc:' + this.duration + '\nct:' + this.currentTime)
                    console.log(this.getVideoPlaybackQuality().totalVideoFrames)
                    this.play();
                }
            }



            // function onend(this: HTMLVideoElement) {
            //     // let img: HTMLImageElement;
            //     // for (let i = 0; i < array.length; i++) {
            //     //     img = new Image();
            //     //     img.onload = () => URL.revokeObjectURL(this.src);;
            //     //     img.src = URL.createObjectURL(array[i]);
            //     //     document.body.appendChild(img);
            //     // }
            //     // URL.revokeObjectURL(this.src);
            //     console.log(this)
            //     console.log('end2')
            // }

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
    }, [fps]);

    return (
        <div>
            <input type="file" accept="video/*" ref={inputRef} />
            <p id="progress" ref={progressRef}></p>
            <video ref={videoRef} style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{}}></canvas>
        </div>
    );
};

