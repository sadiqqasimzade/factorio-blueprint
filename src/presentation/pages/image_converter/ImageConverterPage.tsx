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
  maxH: number
};

const ImageConverterPage = ({ convertTo, maxW, maxH }: Props) => {
  const [Image, setImage] = useState<HTMLImageElement>();
  const [resultCanvas, setresultCanvas] = useState<HTMLCanvasElement>();
  const [pixelArt, setPixelArt] = useState<string[][]>()

  return (
    <section className="container">
      <Suspense fallback={<SuspenseComponent />}>
        {Image ? (
          <ImageEditor
            Image={Image}
            setImage={setImage}
            setresultCanvas={setresultCanvas}
            maxW={maxW}
            maxH={maxH}
            convertTo={convertTo}
          />
        ) : resultCanvas && !pixelArt ? (
          <PixelArtPage resultCanvas={resultCanvas} setPixelArt={setPixelArt} convertTo={convertTo} />
        ) : pixelArt ? (
          <Result pixelArt={pixelArt} convert_to={convertTo} />
        ) : (
          <FileDragAndDrop setImage={setImage} />
        )}
      </Suspense>
    </section>
  );
};

export default ImageConverterPage;
