import React,{ createContext, ReactNode, useContext } from "react";

type ImageProveiderProps={
    children:ReactNode
}
type ImageContextProps={
    
}

const ImageContext = createContext({});
export function useImage() {
  return useContext(ImageContext);
}

export function ImageProvider({children}:ImageProveiderProps){
    return <ImageContext.Provider value={{}}>{children}</ImageContext.Provider>
}
