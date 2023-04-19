import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const ErrorPage = lazy(() => import("../pages/error_pages/ErrorPage"));
const NotFound = lazy(() => import("../pages/error_pages/NotFound"));
const DecodeEncodePage = lazy(() => import("../pages/decodeEncode/DecodeEncodePage"));
const ImageConverterPage = lazy(
  () => import("../pages/image_converter/ImageConverterPage")
);
const IndexPage = lazy(() => import("../pages/index/IndexPage"));

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
        element={<ImageConverterPage convertTo="lamp" maxH={100} maxW={300} />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/image-converter-brick"
        element={<ImageConverterPage convertTo="brick" maxH={500} maxW={500} />}
        errorElement={<ErrorPage />}
      />
      <Route path="/pixel-art-lamp" element={<ImageConverterPage convertTo="lamp" maxW={300} maxH={100} skipInput />} />
      <Route path="/pixel-art-brick" element={<ImageConverterPage convertTo="brick" maxW={500} maxH={500} skipInput />} />
      <Route path="/*" element={<NotFound />} errorElement={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
