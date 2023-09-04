import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./MainRouter.module.scss";
import SuspenseComponent from "../components/suspense/SuspenseComponent";

const ErrorPage = lazy(() => import("../pages/error_pages/ErrorPage"));
const NotFound = lazy(() => import("../pages/error_pages/NotFound"));
const DecodeEncodePage = lazy(() => import("../pages/decodeEncode/DecodeEncodePage"));
const ImageConverterPage = lazy(() => import("../pages/image_converter/ImageConverterPage"));
const IndexPage = lazy(() => import("../pages/index/IndexPage"));



export default function MainRouter() {
  const [transitionStage, settransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn')
  const [displayedLocation, setDisplayedLocation] = useState<string>()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== displayedLocation)
      settransitionStage("fadeOut");
  }, [location, displayedLocation]);
  return (
    <section className={`${styles[transitionStage ? transitionStage : '']} container`} onAnimationEnd={() => {
      if (transitionStage === 'fadeOut') {
        settransitionStage("fadeIn");
        setDisplayedLocation(location.pathname);
      }
    }}>
      <Suspense fallback={<SuspenseComponent />}>
        <Routes location={displayedLocation}>
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
      </Suspense>
    </section>
  );
};

