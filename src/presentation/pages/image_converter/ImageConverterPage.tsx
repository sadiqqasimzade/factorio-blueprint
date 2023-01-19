import React, { useState } from "react";
import FileDragAndDrop from "../../components/drag_and_drop/FileDragAndDrop";
import ImageEditor from "../../components/image_editor/ImageEditor";
import ImageOverView from "../../components/image_overview/ImageOverView";
import { useImage } from "../../contexts/ImageContext";

type Props = {};

const ImageConverterPage = (props: Props) => {
  const [Image, setImage] = useState<HTMLImageElement>();
  return (
    <section style={{ width: "100%", height: "100%" }}>
      <FileDragAndDrop setImage={setImage}></FileDragAndDrop>
      <ImageOverView></ImageOverView>
      {Image && <ImageEditor image={Image}></ImageEditor>}
    </section>
  );
};

export default ImageConverterPage;
