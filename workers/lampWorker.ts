import { TileNames } from "@/consts/enums";
import blueprintEncoder from "../utils/convertors/blueprintEncoder";
import imgToLampBlueprintConvertor from "../utils/convertors/imgToLampBlueprintConvertor";

type WorkerMessage = {
    color_indexes: number[][];
    quality: number;
    blackLampsAllowed: boolean;
    lampBgTile: TileNames | null;
};

self.addEventListener("message", (e: MessageEvent<WorkerMessage>) => {
    const { color_indexes, quality, blackLampsAllowed, lampBgTile } = e.data;

    const blueprint = imgToLampBlueprintConvertor({
        color_indexes,
        quality,
        blackLampsAllowed,
        lampBgTile,
    });
    
    // Encode the blueprint
    const encoded = blueprintEncoder(blueprint);
    
    // Send the result back to the main thread
    self.postMessage(encoded);
}); 