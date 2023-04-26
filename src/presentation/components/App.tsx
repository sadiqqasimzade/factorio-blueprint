import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import MainRouter from "../routes/MainRouter";
import ModalProvider from "../contexts/ModalProvider";

export const App: React.FC<{}> = () => {
  return (
    <ModalProvider>
      <Navbar />
      <main>
        <MainRouter />
      </main>
      <Footer />
    </ModalProvider>
  );
};
