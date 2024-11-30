import { useState } from "react";
import FileDragAndDrop from "../components/drag_and_drop/fileDragAndDrop";
import ImageEditor from "../components/image_editor/imageEditor";
import PixelArtPage from "../components/pixel_art/pixelArtPage";
import Result from "../components/result/result";
import SizeInput from "../components/size_input/sizeInput";
import { signal_priority } from "../consts/signalsEnum";


type Props = {
    convertTo: "lamp" | "brick"
    skipInput: boolean
};

export default function ImageConverterPage({ convertTo, skipInput }: Props) {
    const [validatedImage, setValidatedImage] = useState<HTMLImageElement>();
    const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement>();
    const [pixelArt, setPixelArt] = useState<string[][] | number[][] | undefined>()
    const [pixelArtSize, setPixelArtSize] = useState<{ width: number, height: number }>();
    const [isAllowedRefinedTiles, setIsAllowedRefinedTiles] = useState<boolean>(true)
    const [quality, setQuality] = useState<number>(0);

    const [skipInputState, setSkipInput] = useState<boolean>(skipInput)
    const maxW = 500
    const maxH = convertTo === 'lamp' ? signal_priority.length : 500
    return (
        <>
            <p className="text-white font-bold text-2xl mb-4">Convert image to {convertTo} Blueprint</p>

            {
                pixelArt ? <Result pixelArt={pixelArt} convert_to={convertTo} quality={quality} /> :
                    resultCanvas ? <PixelArtPage resultCanvas={resultCanvas} setPixelArt={setPixelArt} isAllowedRefinedTiles={isAllowedRefinedTiles} /> :
                        pixelArtSize ? <PixelArtPage sizex={pixelArtSize.width} sizey={pixelArtSize.height} setPixelArt={setPixelArt} isAllowedRefinedTiles={isAllowedRefinedTiles} /> :
                            validatedImage ? <ImageEditor quality={quality} setQuality={setQuality} image={validatedImage} setImage={setValidatedImage} setResultCanvas={setResultCanvas} setPixelArt={setPixelArt} maxW={maxW} maxH={maxH} convertTo={convertTo} minW={5} minH={5} isAllowedRefinedTiles={isAllowedRefinedTiles} setIsAllowedRefinedTiles={setIsAllowedRefinedTiles} /> :
                                <FileDragAndDrop setImage={setValidatedImage} setSkipInput={setSkipInput} />
            }
            {
                skipInputState && <SizeInput setSkipInput={setSkipInput} setPixelArtSize={setPixelArtSize} maxW={maxW} maxH={maxH} minW={5} minH={5} />
            }
        </>
    );
}

