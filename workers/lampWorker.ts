import blueprintEncoder from "../utils/convertors/blueprintEncoder";
import imgToLampBlueprintConvertor from "../utils/convertors/imgToLampBlueprintConvertor";

// Define the message event type
type WorkerMessage = {
    color_indexes: number[][];
    quality: number;
    blackLampsAllowed: boolean;
    lampBgTile: string | null;
};

// Listen for messages from the main thread
self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
    const { color_indexes, quality, blackLampsAllowed, lampBgTile } = e.data;
    
    // Create the blueprint
    const blueprint = imgToLampBlueprintConvertor({ 
        color_indexes, 
        quality, 
        blackLampsAllowed, 
        lampBgTile: lampBgTile as any 
    });
    
    // Encode the blueprint
    const encoded = blueprintEncoder(blueprint);
    
    // Send the result back to the main thread
    self.postMessage(encoded);
}); 