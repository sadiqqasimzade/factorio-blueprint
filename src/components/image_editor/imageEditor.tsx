import { calculateEntitiesCount } from "@/src/utils/calculateEntitiesCount";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  Image: HTMLImageElement;
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>;
  setresultCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>;
  maxW: number,
  maxH: number,
  minW: number,
  minH: number,
  convertTo: 'lamp' | 'brick'
};

export default function ImageEditor({ Image, setImage, setresultCanvas, maxW, maxH, minW, minH, convertTo }: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>(Image.naturalWidth);
  const [height, setHeight] = useState<number>(Image.naturalHeight);
  const [aspectRatio, setAspectRatio] = useState<boolean>(true);
  const entityCount: [number, number, number, number] | undefined = convertTo === 'lamp' ? calculateEntitiesCount(width, height) : undefined


  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = width;
    canvas.height = height;

    context.drawImage(Image, 0, 0, width, height);
  };

  const handleAspectRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAspectRatio(event.target.checked);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newWidth = Number(event.target.value);
    if (newWidth > maxW) {
      newWidth = maxW;
    }
    if (aspectRatio && Image) {
      let newHeight = (newWidth / Image.width) * Image.height;
      if (newHeight > maxH) {
        setHeight(Math.floor(maxH));
        setWidth(Math.floor((maxH / Image.height) * Image.width));
      } else {
        setHeight(Math.floor(newHeight));
        setWidth(Math.floor(newWidth));
      }
    } else {
      setWidth(Math.floor(newWidth));
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newHeight = Number(event.target.value);
    if (newHeight > maxH) {
      newHeight = maxH;
    }

    if (aspectRatio && Image) {
      let newWidth = (newHeight / Image.height) * Image.width;
      if (newWidth > maxW) {
        setWidth(Math.floor(maxW));
        setWidth(Math.floor((newHeight / Image.height) * maxW));
      } else {
        setWidth(Math.floor(newWidth));
        setHeight(Math.floor(newHeight));
      }
    } else {
      setHeight(Math.floor(newHeight));
    }
  };

  useEffect(() => {
    handleResize();
  }, [width, height]);


  return (
    <>
      <div className="grid grid-cols-2 gap-20">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-xl font-bold">Width</p>
            <input
              type="number"
              value={width}
              className="border-b outline-none bg-transparent py-2"
              min={minW}
              max={maxW}
              onChange={handleWidthChange}
            />
            <p>Min:{minW}/Max:{maxW}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-bold">Height</p>
            <input
              type="number"
              value={height}
              className="border-b outline-none bg-transparent py-2"
              min={minH}
              max={maxH}
              onChange={handleHeightChange}
            />
            <p>Min:{minH}/Max:{maxH}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-xl font-bold">Maintain aspect ratio</p>
            <input
              type="checkbox"
              checked={aspectRatio}
              onChange={handleAspectRatioChange}
            />
          </div>
          {entityCount && <div>
            <p className="flex font-bold gap-2">
              <img className="w-8 h-8" src="/imgs/entites/constantCombinator.png" />
              {entityCount[0]}</p>

            <p className="flex font-bold gap-2">
              <img className="w-8 h-8" src="/imgs/entites/substation.png" />
              {entityCount[1]}</p>

            <p className="flex font-bold gap-2">
              <img className="w-8 h-8" src="/imgs/entites/arithmeticCombinator.png" />
              {entityCount[2]}</p>

            <p className="flex font-bold gap-2">
              <img className="w-8 h-8" src="/imgs/entites/lamp.png" />
              {entityCount[3]}</p>
          </div>
          }
        </div>
        <div className="col-span-2">
          <div className="flex justify-between">
            <button
              onClick={() => { setImage(undefined) }}
              className="p-2 bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md"
            >
              Back
            </button>
            <button
              className="p-2 bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md"
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas!.width > maxW || canvas!.width < minW) {
                  toast.error('Wrong width')
                } else if (canvas!.height > maxH || canvas!.height < minH) {
                  toast.error('Wrong height')
                } else {
                  setresultCanvas(canvasRef.current!);
                  setImage(undefined);
                }
              }}>
              Continue
            </button>
          </div>
        </div>
      </div>
      <p className="text-2xl font-bold mt-5">Result size</p>
      <canvas className="mt-2" ref={canvasRef} />
    </>
  );
}


