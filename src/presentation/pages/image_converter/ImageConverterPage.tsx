import React, { lazy, Suspense, useState } from "react";

const FileDragAndDrop = lazy(
  () => import("../../components/drag_and_drop/FileDragAndDrop")
);
const ImageEditor = lazy(
  () => import("../../components/image_editor/ImageEditor")
);
const Result = lazy(() => import("../../components/result/Result"));

type Props = {};

const ImageConverterPage = (props: Props) => {
  const [Image, setImage] = useState<HTMLImageElement>();
  const [resultCanvas, setresultCanvas] = useState<HTMLCanvasElement>();
  return (
    <section className="container">
      <Suspense>
        {Image ? (
          <ImageEditor
            Image={Image}
            setImage={setImage}
            setresultCanvas={setresultCanvas}
          />
        ) : resultCanvas ? (
          <Result resultCanvas={resultCanvas} />
        ) : (
          <FileDragAndDrop setImage={setImage} />
        )}
      </Suspense>
    </section>
  );
};

export default ImageConverterPage;
