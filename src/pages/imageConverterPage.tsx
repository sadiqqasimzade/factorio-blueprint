import { useContext, useEffect, useState } from "react";
import FileDragAndDrop from "../components/drag_and_drop/fileDragAndDrop";
import ImageEditor from "../components/image_editor/imageEditor";
import PixelArtPage from "../components/pixel_art/pixelArtPage";
import Result from "../components/result/result";
import SizeInput from "../components/size_input/sizeInput";
import SettingsContext from "../contexts/settings/settingsContext";


type Props = {
    convertToProp: "lamp" | "tile"
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
        setSkipInput(skipInputProp);
    }, []);


    return (
        <>
            <p className="text-white font-bold text-2xl mb-4">Convert image to {convertTo} Blueprint</p>

            {
                pixelArt ? <Result pixelArt={pixelArt} /> :
                    resultCanvas ? <PixelArtPage resultCanvas={resultCanvas} setPixelArt={setPixelArt} /> :
                        pixelArtSize ? <PixelArtPage
                            sizex={pixelArtSize.width} sizey={pixelArtSize.height}
                            setPixelArt={setPixelArt} /> :

                            validatedImage ? <ImageEditor
                                image={validatedImage} setImage={setValidatedImage}
                                setResultCanvas={setResultCanvas} setPixelArt={setPixelArt}
                            /> :

                                <FileDragAndDrop setImage={setValidatedImage} />
            }
            {
                skipInput && <SizeInput setPixelArtSize={setPixelArtSize} />
            }
        </>
    );
}

