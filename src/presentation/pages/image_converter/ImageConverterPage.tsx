import React, { lazy, Suspense, useState } from "react";
import SuspenseComponent from "../../components/suspense/SuspenseComponent";

const SizeInput = lazy(() => import("../../components/size_input/SizeInput"));
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

export default function ImageConverterPage({ convertTo, maxW, maxH, skipInput }: Props) {
  const [validatedImage, setValidatedImage] = useState<HTMLImageElement | undefined>(undefined);
  const [resultCanvas, setresultCanvas] = useState<HTMLCanvasElement | undefined>(undefined);
  const [pixelArt, setPixelArt] = useState<string[][] | undefined>(undefined)
  const [pixelArtSize, setPixelArtSize] = useState<{ width: number, height: number } | undefined>(undefined);
  const [skipInputState, setSkipInput] = useState<boolean>(skipInput == undefined ? false : skipInput)

  const minW = 5, minH = 5;
  return (
    <>
      <p className="fs-l white">Convert image to {convertTo} Blueprint</p>

      <Suspense fallback={<SuspenseComponent />}>
        {
          pixelArt ? <Result pixelArt={pixelArt} convert_to={convertTo} /> :
            resultCanvas ? <PixelArtPage resultCanvas={resultCanvas} setPixelArt={setPixelArt} convertTo={convertTo} /> :
              pixelArtSize ? <PixelArtPage sizex={pixelArtSize.width} sizey={pixelArtSize.height} convertTo={convertTo} setPixelArt={setPixelArt} /> :
                skipInputState ? <SizeInput setSkipInput={setSkipInput} setPixelArtSize={setPixelArtSize} maxW={maxW} maxH={maxH} minW={minW} minH={minH} /> :
                  validatedImage ? <ImageEditor Image={validatedImage} setImage={setValidatedImage} setresultCanvas={setresultCanvas} maxW={maxW} maxH={maxH} convertTo={convertTo} minW={minW} minH={minH} /> :
                    <FileDragAndDrop setImage={setValidatedImage} setSkipInput={setSkipInput} />
        }
      </Suspense>
    </>
  );
};

