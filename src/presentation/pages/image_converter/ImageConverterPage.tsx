import React, { useState } from "react";
import FileDragAndDrop from "../../components/drag_and_drop/FileDragAndDrop";
import ImageEditor from "../../components/image_editor/ImageEditor";
import ImageOverView from "../../components/image_overview/ImageOverView";

type Props = {};

const ImageConverterPage = (props: Props) => {
  const [Canvas, setCanvas] = useState<HTMLCanvasElement>();
  return (
    <section className="container">
      <FileDragAndDrop setCanvas={setCanvas}></FileDragAndDrop>
      <ImageOverView></ImageOverView>
      {Canvas && <ImageEditor Canvas={Canvas}></ImageEditor>}
    </section>
  );
};

export default ImageConverterPage;
