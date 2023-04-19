import React, { lazy, Suspense, useState } from "react";
import SuspenseComponent from "../../components/suspense/SuspenseComponent";

const Modal = lazy(() => import("../../components/modal/Modal"));
const PixelArtPage = lazy(() => import("../pixel_art/PixelArtPage"));
const FileDragAndDrop = lazy(() => import("../../components/drag_and_drop/FileDragAndDrop"));
const ImageEditor = lazy(() => import("../../components/image_editor/ImageEditor"));
const Result = lazy(() => import("../../components/result/Result"));

type Props = {
  convertTo: "lamp" | "brick"
  maxW: number,
  maxH: number,
  skipInput?: boolean | undefined
};

const ImageConverterPage = ({ convertTo, maxW, maxH, skipInput }: Props) => {
  const [validatedImage, setValidatedImage] = useState<HTMLImageElement|null>(null);
  const [resultCanvas, setresultCanvas] = useState<HTMLCanvasElement|null>(null);
  const [pixelArt, setPixelArt] = useState<string[][]|null>(null)
  const [pixelArtSize, setPixelArtSize] = useState<{ width: number, height: number }>({width: 0, height: 0});
  const [skipInputState, setSkipInput] = useState<boolean>(skipInput == undefined ? false : skipInput)

  const minW = 5, minH = 5;
  return (
    <section className="container">
      <Suspense fallback={<SuspenseComponent />}>
        {
          pixelArt ? <Result pixelArt={pixelArt} convert_to={convertTo} /> :
            resultCanvas ? <PixelArtPage resultCanvas={resultCanvas} setPixelArt={setPixelArt} convertTo={convertTo} /> :
              pixelArtSize ? <PixelArtPage sizex={pixelArtSize.width} sizey={pixelArtSize.height} convertTo={convertTo} setPixelArt={setPixelArt} /> :
                skipInputState ? <Modal setSkipInput={setSkipInput} skipInput={skipInputState} setPixelArtSize={setPixelArtSize} maxW={maxW} maxH={maxH} minW={minW} minH={minH} /> :
                  validatedImage ? <ImageEditor Image={validatedImage} setImage={setValidatedImage} setresultCanvas={setresultCanvas} maxW={maxW} maxH={maxH} convertTo={convertTo} minW={minW} minH={minH} /> :
                    <FileDragAndDrop setImage={setValidatedImage} />
        }

      </Suspense>
    </section>
  );
};

export default ImageConverterPage;
