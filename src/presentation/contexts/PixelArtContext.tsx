import React, { createContext } from 'react'

interface PixelArtContextType {
    current_color: string,
    cells: string[][],
    cellSetter: (x:number,y:number,callback:()=>{})=>{}


}

export const PixelArtContext = createContext<PixelArtContextType>(null)