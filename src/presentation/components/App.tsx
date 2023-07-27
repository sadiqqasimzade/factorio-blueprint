import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import MainRouter from "../routes/MainRouter";
import ModalProvider from "../contexts/ModalProvider";
import AlertProvider from "../contexts/AlertProvider";
import VideoToImages from "./videoToBlueprint/VideoToBp";

export const App: React.FC<{}> = () => {
  return (
    <AlertProvider>
      <ModalProvider>
        <Navbar />
        <main>
          <MainRouter />
        </main>
        <Footer />
        <VideoToImages fps={1} height={20} width={20}/>
      </ModalProvider>
    </AlertProvider>
  );
};
