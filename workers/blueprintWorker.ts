import blueprintEncoder from "../utils/convertors/blueprintEncoder";
import { CreateMemoryBlock } from "../utils/convertors/videoToBlueprintConvertor";

// Define the message event type
type WorkerMessage = {
    images: number[][][];
    quality: number;
    screenUps: number;
    loopWithoutBlankFrame: boolean;
};

// Listen for messages from the main thread
self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
    const { images, quality, screenUps, loopWithoutBlankFrame } = e.data;
    
    // Create the memory block
    const blueprint = CreateMemoryBlock(images, quality, 60 / screenUps, loopWithoutBlankFrame);
    
    // Encode the blueprint
    const encoded = blueprintEncoder(blueprint);
    
    // Send the result back to the main thread
    self.postMessage(encoded);
}); 