import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


type Props = {
  image: HTMLImageElement;
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>;
  setresultCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>;
  maxW: number,
  maxH: number,
  minW: number,
  minH: number,
  convertTo: 'lamp' | 'brick'
};

export default function ImageEditor({ image, setImage, setresultCanvas, maxW, maxH, minW, minH }: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);


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
    let newWidth = Number(event.target.value);
    if (newWidth > maxW) {
      newWidth = maxW;
    }
    if (keepAspectRatio && image) {
      let newHeight = (newWidth / image.width) * image.height;
      if (newHeight > maxH) {
        setHeight(Math.floor(maxH));
        setWidth(Math.floor((maxH / image.height) * image.width));
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

    if (keepAspectRatio && image) {
      let newWidth = (newHeight / image.height) * image.width;
      if (newWidth > maxW) {
        setWidth(Math.floor(maxW));
        setWidth(Math.floor((newHeight / image.height) * maxW));
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

  /**
   * initial canvas size resized to max available size saving aspect ratio
   * */
  useEffect(() => {
    if (image) {
      const aspectRatio = image.width / image.height;
      let newWidth = maxW;
      let newHeight = newWidth / aspectRatio;
      if (newHeight > maxH) {
        newHeight = maxH;
        newWidth = newHeight * aspectRatio;
      }
      setWidth(Math.floor(newWidth));
      setHeight(Math.floor(newHeight));
    }
  }, [])

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
              min={minW}
              max={maxW}
              onChange={handleWidthChange}
            />
            <p>Min:{minW}/Max:{maxW}</p>
          </div>
          <div className="flex flex-col w-full">
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
            <div className="flex gap-4">
              <p className="text-xl font-bold">Background</p>
              <input
                type="checkbox"
                checked={keepAspectRatio}
                onChange={(e) => setKeepAspectRatio(e.target.checked)}
              />
            </div>
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


