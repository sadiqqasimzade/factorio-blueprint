import QualitySelector from '@/components/dropdown/QualitySelector';
import TileSelector from '@/components/dropdown/TileSelector';
import SettingsContext from "@/contexts/settings/settingsContext";
import { getDecimalColorsFromCanvas } from "@/utils/image/calculateColors";
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
  const { maxWidth, maxHeight, maxHeightForLamps, minWidth, minHeight, convertTo, quality, isAllowedRefinedTiles, blackLampsAllowed, setQuality, setIsAllowedRefinedTiles, setBlackLampsAllowed, lampBgTile, setLampBgTile } = useContext(SettingsContext);
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
      <div className="flex flex-col gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Image to Blueprint Editor</h1>
          <p className="text-neutral-300">Configure your image settings before conversion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-200">Dimensions</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Width</label>
                  <input
                    type="number"
                    value={width}
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={minWidth}
                    max={maxWidth}
                    onChange={handleWidthChange}
                  />
                  <p className="text-xs text-neutral-400">min: {minWidth} • max: {maxWidth}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Height</label>
                  <input
                    type="number"
                    value={height}
                    className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={minHeight}
                    max={maxH}
                    onChange={handleHeightChange}
                  />
                  <p className="text-xs text-neutral-400">min: {minHeight} • max: {maxH}</p>
                </div>
              </div>

              {convertTo === "lamp" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <QualitySelector
                    value={quality}
                    onChange={setQuality}
                    disabled={false}
                    className="w-full"
                  />
                  <TileSelector
                    value={lampBgTile}
                    onChange={setLampBgTile}
                    disabled={false}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-200">Settings</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="aspect-ratio"
                    className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-blue-500 focus:ring-blue-500"
                    checked={keepAspectRatio}
                    onChange={(e) => setKeepAspectRatio(e.target.checked)}
                  />
                  <label htmlFor="aspect-ratio" className="text-sm text-neutral-300">Maintain original aspect ratio</label>
                </div>

                {convertTo === "lamp" && (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="black-lamps"
                      className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-blue-500 focus:ring-blue-500"
                      checked={blackLampsAllowed}
                      onChange={(e) => setBlackLampsAllowed(e.target.checked)}
                    />
                    <label htmlFor="black-lamps" className="text-sm text-neutral-300">Black lamps allowed. Turn off to optimize png images</label>
                  </div>
                )}

                {convertTo === "tile" && (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="refined-tiles"
                      className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-blue-500 focus:ring-blue-500"
                      checked={isAllowedRefinedTiles}
                      onChange={(e) => setIsAllowedRefinedTiles(e.target.checked)}
                    />
                    <label htmlFor="refined-tiles" className="text-sm text-neutral-300">Allow refined tiles</label>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <div className="flex gap-4">
                <button
                  onClick={() => { setImage(undefined) }}
                  className="inline-flex cursor-pointer items-center justify-center rounded-md bg-neutral-700 px-4 py-2 text-white transition-colors hover:bg-neutral-600"
                >
                  Back
                </button>
                <button
                  className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                  onClick={() => {
                    const canvas = canvasRef.current;
                    if (canvas!.width > maxWidth || canvas!.width < minWidth) {
                      toast.error('Wrong width')
                    } else if (canvas!.height > maxH || canvas!.height < minHeight) {
                      toast.error('Wrong height')
                    } else {
                      if (convertTo === 'tile') setResultCanvas(canvasRef.current!);
                      if (convertTo === 'lamp') setPixelArt(getDecimalColorsFromCanvas(canvas!));
                      if (convertTo === 'platform') setPixelArt(getDecimalColorsFromCanvas(canvas!));
                      setImage(undefined);
                    }
                  }}>
                  Continue
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-neutral-700 bg-neutral-900/60 p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-neutral-300">Preview</p>
              <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                <canvas className="max-w-full" ref={canvasRef} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-neutral-300">Current Settings</p>
              <div className="rounded-md border border-neutral-700 bg-neutral-800/50 px-3 py-2">
                <div className="text-sm space-y-1">
                  <p>Width: {width}px • Height: {height}px</p>
                  <p>Convert to: {convertTo}</p>
                  <p>Aspect ratio: {keepAspectRatio ? 'Locked' : 'Unlocked'}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}


