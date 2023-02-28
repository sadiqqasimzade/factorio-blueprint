import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const DecodeEncodePage = lazy(() => import("../pages/decodeEncodePage/DecodeEncodePage"));
const ErrorPage = lazy(() => import("../pages/error_pages/ErrorPage"));
const NotFound = lazy(() => import("../pages/error_pages/NotFound"));
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
        element={<ImageConverterPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/image-converter-brick"
        element={<ImageConverterPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<NotFound />} errorElement={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
