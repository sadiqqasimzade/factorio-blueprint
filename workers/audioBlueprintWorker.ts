import blueprintEncoder from "../utils/convertors/blueprintEncoder";
import AudioToBlueprintConvertor from "../utils/convertors/audioToBlueprintConvertor";

// Define the message event type
type WorkerMessage = {
    analysis: {
        tempo: number;
        timeSignature: [number, number];
        tracks: Array<{
            trackId: number;
            instrument: string;
            notes: Array<{
                midiNote: number;
                startTime: number;
                duration: number;
                velocity: number;
            }>;
        }>;
    };
};

// Listen for messages from the main thread
self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
    const { analysis } = e.data;
    
    try {
        // Create the blueprint from audio analysis
        const blueprint = AudioToBlueprintConvertor(analysis);
        
        // Encode the blueprint
        const encoded = blueprintEncoder(blueprint);
        
        // Send the result back to the main thread
        self.postMessage(encoded);
    } catch (error) {
        self.postMessage({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
