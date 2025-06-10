'use client'

import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../contexts/settings/settingsContext";
import FileDragAndDrop from "../drag_and_drop/fileDragAndDrop";
import ImageEditor from "../image_editor/imageEditor";
import PixelArtPage from "../pixel_art/pixelArtPage";
import Result from "../result/result";
import SizeInput from "../size_input/sizeInput";


type Props = {
    convertToProp: "lamp" | "tile" | "platform"
    skipInputProp: boolean
};

export default function ImageConverterPage({ convertToProp, skipInputProp }: Props) {
    const [validatedImage, setValidatedImage] = useState<HTMLImageElement>();
    const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement>();
    const [pixelArt, setPixelArt] = useState<string[][] | number[][] | undefined>()
    const [pixelArtSize, setPixelArtSize] = useState<{ width: number, height: number }>();
    
    const { setConvertTo, setSkipInput, convertTo, skipInput } = useContext(SettingsContext);
    useEffect(() => {
        setConvertTo(convertToProp);
    }, [convertToProp]);
    useEffect(() => {
        setSkipInput(skipInputProp);
    }, [skipInputProp]);

    return (
        <>
            <p className="text-white font-bold text-2xl mb-4">Convert image to {convertTo} Blueprint</p>

            {
                pixelArt ? <Result pixelArt={pixelArt} /> :
                    resultCanvas ? <PixelArtPage type="canvas" resultCanvas={resultCanvas} setPixelArt={setPixelArt} /> :
                        pixelArtSize ? <PixelArtPage type="size" sizex={pixelArtSize.width} sizey={pixelArtSize.height} setPixelArt={setPixelArt} /> :
                            validatedImage ? <ImageEditor
                                image={validatedImage} setImage={setValidatedImage}
                                setResultCanvas={setResultCanvas} setPixelArt={setPixelArt} />
                                :
                                <FileDragAndDrop setImage={setValidatedImage} />
            }
            {
                skipInput && <SizeInput setPixelArtSize={setPixelArtSize} />
            }
        </>
    );
}

