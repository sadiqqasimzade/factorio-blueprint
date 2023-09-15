// import { lampColorsArr } from '@/src/consts/colorsEnum';
// import blueprintEncoder from '@/src/utils/convertors/blueprintEncoder';
// import { CreateMemoryBlock } from '@/src/utils/convertors/videoToBlueprintConvertor';
// import { calculateColorsInCanvas, calculateColorsForLamps } from '@/src/utils/image/calculateColors';
// import { useEffect, useRef } from 'react';

// interface VideoToBpProps {
//     fps: number;
//     width: number;
//     height: number;
// }

// const VideoToBp: React.FC<VideoToBpProps> = ({ fps, width, height }) => {
//     const inputRef = useRef<HTMLInputElement>(null);
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const progressRef = useRef<HTMLParagraphElement>(null);
//     const lastFrameTimeRef = useRef<number>(0);

//     useEffect(() => {
//         const images: number[][][][] = []
//         const extractFrames = () => {
//             const video = videoRef.current as HTMLVideoElement;
//             const array: Blob[] = [];
//             const canvas = canvasRef.current as HTMLCanvasElement;
//             const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
//             const progress = progressRef.current as HTMLParagraphElement;
//             let frameCount = 0;

//             function initCanvas(this: HTMLVideoElement) {
//                 canvas.width = width;
//                 canvas.height = height;
//             }

//             const drawFrame = (time: number) => {
//                 lastFrameTimeRef.current = time;
//                 ctx.drawImage(video, 0, 0, width, height);

//                 canvas.toBlob((blob) => {
//                     array.push(blob as Blob);
//                 }, 'image/jpeg');

//                 progress.innerHTML = ((video.currentTime / video.duration) * 100).toFixed(2) + ' %';
//                 frameCount++;

//                 if (video.duration <= video.currentTime) {
//                     const book=CreateMemoryBlock(images)

//                     console.log(blueprintEncoder(book))


//                     video.removeEventListener('timeupdate', drawFrame, false);
//                     video.play();
//                 } else {
//                     console.log('frame')
//                     const pixelArt = calculateColorsInCanvas(canvas, lampColorsArr)
//                     images.push(calculateColorsForLamps(pixelArt))
//                     video.play();
//                 }

//             };

//             video.muted = true;
//             video.addEventListener('loadedmetadata', initCanvas, false);
//             video.addEventListener('timeupdate', drawFrame, false);

//             if (inputRef.current?.files && inputRef.current.files[0]) {
//                 video.src = URL.createObjectURL(inputRef.current.files[0]);
//                 video.play();
//             }
//         };

//         inputRef.current?.addEventListener('change', extractFrames, false);

//         return () => {
//             inputRef.current?.removeEventListener('change', extractFrames, false);
//         };
//     }, [fps, width, height]);

//     return (
//         <div>
//             <input type="file" accept="video/*" ref={inputRef} />
//             <p id="progress" ref={progressRef}></p>
//             <video ref={videoRef} style={{ display: 'none' }} />
//             <canvas ref={canvasRef} style={{}}></canvas>
//         </div>
//     );
// };

// export default VideoToBp;
