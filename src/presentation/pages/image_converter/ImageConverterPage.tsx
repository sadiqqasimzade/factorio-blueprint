import React, { lazy, Suspense, useState } from "react";
import SuspenseComponent from "../../components/suspense/SuspenseComponent";

const PixelArtPage = lazy(() => import("../pixel_art/PixelArtPage"));
const FileDragAndDrop = lazy(
  () => import("../../components/drag_and_drop/FileDragAndDrop")
);
const ImageEditor = lazy(
  () => import("../../components/image_editor/ImageEditor")
);
const Result = lazy(() => import("../../components/result/Result"));

type Props = {
  convertTo: "lamp" | "brick"
  maxW: number,
  maxH: number,
  skipInput?: boolean | undefined
};

const ImageConverterPage = ({ convertTo, maxW, maxH, skipInput }: Props) => {
  const [validatedImage, setValidatedImage] = useState<HTMLImageElement>();
  const [resultCanvas, setresultCanvas] = useState<HTMLCanvasElement>();
  const [pixelArt, setPixelArt] = useState<string[][]>()

  return (
    <section className="container">
      <Suspense fallback={<SuspenseComponent />}>
        {
          pixelArt ? <Result pixelArt={pixelArt} convert_to={convertTo} /> :
            resultCanvas || skipInput ?
              skipInput ?
                //fllor number
                <PixelArtPage sizex={parseInt(prompt('width'))} sizey={parseInt(prompt('height'))} convertTo="lamp" setPixelArt={setPixelArt} /> :
                <PixelArtPage resultCanvas={resultCanvas} setPixelArt={setPixelArt} convertTo={convertTo} />
              :
              validatedImage ? <ImageEditor
                Image={validatedImage}
                setImage={setValidatedImage}
                setresultCanvas={setresultCanvas}
                maxW={maxW}
                maxH={maxH}
                convertTo={convertTo}
              /> : <FileDragAndDrop setImage={setValidatedImage} />
        }


      </Suspense>
    </section>
  );
};

export default ImageConverterPage;
