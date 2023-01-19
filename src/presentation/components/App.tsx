import React from "react";
import Router from "../routes/router";
import Navbar from "./navbar/Navbar";
export const App: React.FC<{}> = () => {
  return (
    <>
      <Navbar />
      <main>
        <Router />
      </main>
    </>
  );
};
