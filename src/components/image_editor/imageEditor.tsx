import SettingsContext from "@/src/contexts/settings/settingsContext";
import { getDecimalColorsFromCanvas } from "@/src/utils/image/calculateColors";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


type Props = {
  // Image related props
  image: HTMLImageElement;
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>;
  setResultCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>;

  // Output
  setPixelArt: React.Dispatch<React.SetStateAction<string[][] | number[][] | undefined>>;
};

export default function ImageEditor({ image, setImage, setResultCanvas, setPixelArt }: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);
  const { maxWidth, maxHeight, maxHeightForLamps, minWidth, minHeight, convertTo, quality, isAllowedRefinedTiles, blackLampsAllowed, setQuality, setIsAllowedRefinedTiles, setBlackLampsAllowed  } = useContext(SettingsContext);
  const maxH = convertTo === 'lamp' ? maxHeightForLamps : maxHeight;
  /**
   * clear and redraw canvas with new size
   * @returns void
   */
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = width;
    canvas.height = height;

    context.drawImage(image, 0, 0, width, height);
  };



  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!image) return;

    let newWidth = Math.min(Number(event.target.value), maxWidth);

    if (keepAspectRatio) {
      const aspectRatio = image.height / image.width;
      let newHeight = newWidth * aspectRatio;

      if (newHeight > maxH) {
        newHeight = maxH;
        newWidth = newHeight / aspectRatio;
      }

      setHeight(Math.floor(newHeight));
    }

    setWidth(Math.floor(newWidth));
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!image) return;

    let newHeight = Math.min(Number(event.target.value), maxH);

    if (keepAspectRatio) {
      const aspectRatio = image.width / image.height;
      let newWidth = newHeight * aspectRatio;

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
      }

      setWidth(Math.floor(newWidth));
    }

    setHeight(Math.floor(newHeight));
  };

  useEffect(() => {
    handleResize();
  }, [width, height]);

  /**
   * initial canvas size set to image size or max available size if image is larger
   */
  useEffect(() => {
    if (!image) return;

    const aspectRatio = image.width / image.height;
    let newWidth = Math.min(image.width, maxWidth);
    let newHeight = newWidth / aspectRatio;

    if (newHeight > maxH) {
      newHeight = maxH;
      newWidth = newHeight * aspectRatio;
    }

    setWidth(Math.floor(newWidth));
    setHeight(Math.floor(newHeight));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-col w-full">
            <p className="text-xl font-bold">Width</p>
            <input
              type="number"
              value={width}
              className="border-b outline-none bg-transparent py-2"
              min={minWidth}
              max={maxWidth}
              onChange={handleWidthChange}
            />
            <p>Min:{minWidth}/Max:{maxWidth}</p>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xl font-bold">Height</p>
            <input
              type="number"
              value={height}
              className="border-b outline-none bg-transparent py-2"
              min={minHeight}
              max={maxH}
              onChange={handleHeightChange}
            />
            <p>Min:{minHeight}/Max:{maxH}</p>
          </div>
          {convertTo === "lamp" && <div className="flex flex-col w-full">
            <p className="text-xl font-bold">Substation quality</p>
            <div className="flex gap-4 py-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={value - 1}
                    checked={quality === value - 1}
                    onChange={(e) => setQuality(Number(e.target.value))}
                  />
                  {value}
                </label>
              ))}
            </div>
            <p>Leave 1 for base game</p>
          </div>}
        </div>
        <div className="flex md:flex-row md:justify-between flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <p className="text-xl font-bold">Maintain original aspect ratio</p>
              <input
                type="checkbox"
                checked={keepAspectRatio}
                onChange={(e) => setKeepAspectRatio(e.target.checked)}
              />
            </div>
            {convertTo === "lamp" && <div className="flex gap-4">
              <p className="text-xl font-bold">Black lamps allowed. Turn off to optimize png images</p>
              <input
                type="checkbox"
                checked={blackLampsAllowed}
                onChange={(e) => setBlackLampsAllowed(e.target.checked)}
              />
            </div>}
            {convertTo === "tile" && <div className="flex gap-4">
              <p className="text-xl font-bold">Allow refined tiles</p>
              <input
                type="checkbox"
                checked={isAllowedRefinedTiles}
                onChange={(e) => setIsAllowedRefinedTiles(e.target.checked)}
              />
            </div>}
          </div>

          <div className="flex gap-4">
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
                if (canvas!.width > maxWidth || canvas!.width < minWidth) {
                  toast.error('Wrong width')
                } else if (canvas!.height > maxH || canvas!.height < minHeight) {
                  toast.error('Wrong height')
                } else {
                  convertTo === 'tile' && setResultCanvas(canvasRef.current!);
                  convertTo === 'lamp' && setPixelArt(getDecimalColorsFromCanvas(canvas!));
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


