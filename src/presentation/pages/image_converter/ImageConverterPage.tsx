import React, { lazy, Suspense, useState } from "react";
import SuspenseComponent from "../../components/suspense/SuspenseComponent";

const FileDragAndDrop = lazy(
  () => import("../../components/drag_and_drop/FileDragAndDrop")
);
const ImageEditor = lazy(
  () => import("../../components/image_editor/ImageEditor")
);
const Result = lazy(() => import("../../components/result/Result"));

type Props = {
  convert_to:"lamp"|"brick"
  maxW:number,
  maxH:number
};

const ImageConverterPage = ({convert_to,maxW,maxH}: Props) => {
  const [Image, setImage] = useState<HTMLImageElement>();
  const [resultCanvas, setresultCanvas] = useState<HTMLCanvasElement>();
  return (
    <section className="container">
      <Suspense fallback={<SuspenseComponent/>}>
        {Image ? (
          <ImageEditor
            Image={Image}
            setImage={setImage}
            setresultCanvas={setresultCanvas}
            maxW={maxW}
            maxH={maxH}
          />
        ) : resultCanvas ? (
          <Result resultCanvas={resultCanvas} convert_to={convert_to} />
        ) : (
          <FileDragAndDrop setImage={setImage} />
        )}
      </Suspense>
    </section>
  );
};

export default ImageConverterPage;
