import blueprintEncoder from "../utils/convertors/blueprintEncoder";
import imgToTileBlueprintConvertor from "../utils/convertors/imgToTileBlueprintConvertor";

// Define the message event type
type WorkerMessage = {
    pixelArt: string[][];
};

// Listen for messages from the main thread
self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
    const { pixelArt } = e.data;
    
    // Create the blueprint
    const blueprint = imgToTileBlueprintConvertor(pixelArt);
    
    // Encode the blueprint
    const encoded = blueprintEncoder(blueprint);
    
    // Send the result back to the main thread
    self.postMessage(encoded);
}); 