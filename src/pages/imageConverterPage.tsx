import { useState } from "react";
import FileDragAndDrop from "../components/drag_and_drop/fileDragAndDrop";
import ImageEditor from "../components/image_editor/imageEditor";
import SizeInput from "../components/size_input/sizeInput";
import PixelArtPage from "../components/pixel_art/pixelArtPage";
import Result from "../components/result/result";


type Props = {
    convertTo: "lamp" | "brick"
    skipInput: boolean
};

export default function ImageConverterPage({ convertTo, skipInput }: Props) {
    const [validatedImage, setValidatedImage] = useState<HTMLImageElement | undefined>(undefined);
    const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement | undefined>(undefined);
    const [pixelArt, setPixelArt] = useState<string[][] | undefined>(undefined)
    const [pixelArtSize, setPixelArtSize] = useState<{ width: number, height: number } | undefined>(undefined);
    const [skipInputState, setSkipInput] = useState<boolean>(skipInput)
    const maxW = 500
    const maxH = convertTo === 'lamp' ? 100 : 500
    return (
        <>
            <p className="text-white font-bold text-2xl mb-4">Convert image to {convertTo} Blueprint</p>

            {
                pixelArt ? <Result pixelArt={pixelArt} convert_to={convertTo} /> :
                    resultCanvas ? <PixelArtPage resultCanvas={resultCanvas} setPixelArt={setPixelArt} convertTo={convertTo} /> :
                        pixelArtSize ? <PixelArtPage sizex={pixelArtSize.width} sizey={pixelArtSize.height} convertTo={convertTo} setPixelArt={setPixelArt} /> :
                            validatedImage ? <ImageEditor image={validatedImage} setImage={setValidatedImage} setresultCanvas={setResultCanvas} maxW={maxW} maxH={maxH} convertTo={convertTo} minW={5} minH={5} /> :
                                <FileDragAndDrop setImage={setValidatedImage} setSkipInput={setSkipInput} />
            }
            {
                skipInputState && <SizeInput setSkipInput={setSkipInput} setPixelArtSize={setPixelArtSize} maxW={maxW} maxH={maxH} minW={5} minH={5} />
            }
        </>
    );
}

