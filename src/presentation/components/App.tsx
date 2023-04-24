import React, { Suspense } from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import SuspenseComponent from "./suspense/SuspenseComponent";
import MainRouter from "../routes/MainRouter";

export const App: React.FC<{}> = () => {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<SuspenseComponent />}>
          <MainRouter />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
