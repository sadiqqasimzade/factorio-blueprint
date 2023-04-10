import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const PixelArtPage = lazy(() => import("../pages/pixel_art/PixelArtPage"));
const DecodeEncodePage = lazy(() => import("../pages/decodeEncode/DecodeEncodePage"));
const ErrorPage = lazy(() => import("../pages/error_pages/ErrorPage"));
const NotFound = lazy(() => import("../pages/error_pages/NotFound"));
const ImageConverterPage = lazy(
  () => import("../pages/image_converter/ImageConverterPage")
);
const IndexPage = lazy(() => import("../pages/index/IndexPage"));
const MusicConverterPage = lazy(() => import("../pages/music_converter/MusicConverterPage"))

type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} errorElement={<ErrorPage />} />
      <Route
        path="/decode-encode"
        element={<DecodeEncodePage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/image-converter-lamp"
        element={<ImageConverterPage convert_to="lamp" maxH={100} maxW={300} />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/image-converter-brick"
        element={<ImageConverterPage convert_to="brick" maxH={500} maxW={500} />}
        errorElement={<ErrorPage />}
      />
      <Route path="/music-converter" element={<MusicConverterPage />} errorElement={<ErrorPage />} />
      <Route path="/pixel-art" element={<PixelArtPage sizex={40} sizey={40} />} errorElement={<ErrorPage />} />

      <Route path="*" element={<NotFound />} errorElement={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
