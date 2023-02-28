import React, { Suspense } from "react";
import Router from "../routes/Router";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import SuspenseComponent from "./suspense/SuspenseComponent";
export const App: React.FC<{}> = () => {
  
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<SuspenseComponent/>}>
          <Router />
        </Suspense>
      </main>

      <Footer/>
    </>
  );
};
