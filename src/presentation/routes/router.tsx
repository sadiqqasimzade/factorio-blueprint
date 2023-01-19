import React from "react";
import { Route, Routes } from "react-router-dom";
import DecodeEncodePage from "../pages/DecodeEncodePage";
import ErrorPage from "../pages/error_pages/ErrorPage";
import NotFound from "../pages/error_pages/NotFound";
import ImageConverterPage from "../pages/image_converter/ImageConverterPage";
import IndexPage from "../pages/index/IndexPage";

type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<IndexPage />}
        errorElement={<ErrorPage />}
        
      ></Route>
      <Route
        path="/decode-encode"
        element={<DecodeEncodePage />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/image-converter"
        element={<ImageConverterPage />}
        errorElement={<ErrorPage />}
      ></Route>
    </Routes>
  );
};

export default Router;
