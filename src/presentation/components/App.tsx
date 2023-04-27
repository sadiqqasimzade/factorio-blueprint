import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import MainRouter from "../routes/MainRouter";
import ModalProvider from "../contexts/ModalProvider";
import AlertProvider from "../contexts/AlertProvider";

export const App: React.FC<{}> = () => {
  return (
    <AlertProvider>
      <ModalProvider>
        <Navbar />
        <main>
          <MainRouter />
        </main>
        <Footer />
      </ModalProvider>
    </AlertProvider>
  );
};
